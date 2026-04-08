import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dataService, KEYS } from "@/services/dataService";
import { 
  type Don, 
  type Evenement, 
  type Activite, 
  type CauseDon, 
  type GaleriePhoto, 
  type Actualite 
} from "@/types";

// --- Context ---

interface DataState {
  photos: GaleriePhoto[];
  actualites: Actualite[];
  evenements: Evenement[];
  activites: Activite[];
  causes: CauseDon[];
  dons: Don[];
  loading: boolean;
}

interface DataContextType extends DataState {
  setPhotos: (v: GaleriePhoto[] | ((p: GaleriePhoto[]) => GaleriePhoto[])) => Promise<boolean>;
  setActualites: (v: Actualite[] | ((p: Actualite[]) => Actualite[])) => Promise<boolean>;
  setEvenements: (v: Evenement[] | ((p: Evenement[]) => Evenement[])) => Promise<boolean>;
  setActivites: (v: Activite[] | ((p: Activite[]) => Activite[])) => Promise<boolean>;
  setCauses: (v: CauseDon[] | ((p: CauseDon[]) => CauseDon[])) => Promise<boolean>;
  setDons: (v: Don[] | ((p: Don[]) => Don[])) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotosRaw] = useState<GaleriePhoto[]>([]);
  const [actualites, setActualitesRaw] = useState<Actualite[]>([]);
  const [evenements, setEvenementsRaw] = useState<Evenement[]>([]);
  const [activites, setActivitesRaw] = useState<Activite[]>([]);
  const [causes, setCausesRaw] = useState<CauseDon[]>([]);
  const [dons, setDonsRaw] = useState<Don[]>([]);
  const [loading, setLoading] = useState(true);

  const safeFetch = async <T,>(key: string): Promise<T[]> => {
    try {
      return await dataService.getItems<T>(key);
    } catch (e) {
      console.warn(`[fetchData] Table "${key}" inaccessible (peut-être absente dans Supabase):`, e);
      return [];
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Chaque table est récupérée indépendamment : une erreur sur l'une ne bloque pas les autres
      const [remotePhotos, remoteActus, remoteDons, remoteActs, remoteEvts, remoteCauses] = await Promise.all([
        safeFetch<GaleriePhoto>(KEYS.photos),
        safeFetch<Actualite>(KEYS.actualites),
        safeFetch<Don>(KEYS.dons),
        safeFetch<Activite>(KEYS.activites),
        safeFetch<Evenement>(KEYS.evenements),
        safeFetch<CauseDon>(KEYS.causes),
      ]);

      setPhotosRaw(remotePhotos);
      setActualitesRaw(remoteActus);
      setDonsRaw(remoteDons);
      setActivitesRaw(remoteActs);
      setEvenementsRaw(remoteEvts);
      setCausesRaw(remoteCauses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const init = async () => {
      await fetchData();
      if (!mounted) return;
      
      const subs = Object.values(KEYS).map(table => 
        dataService.subscribe(table, () => {
          if (mounted) fetchData();
        })
      );

      return () => {
        mounted = false;
        subs.forEach(s => s.unsubscribe());
      };
    };

    const cleanupPromise = init();
    return () => {
      mounted = false;
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, []);

  const createSetter = <T extends {id?: string}>(table: string, setRaw: React.Dispatch<React.SetStateAction<T[]>>) =>
    (v: T[] | ((p: T[]) => T[])): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setRaw((prev: T[]) => {
          const next = typeof v === "function" ? (v as (p: T[]) => T[])(prev) : v;

          // Déclenche l'action DB en dehors du cycle de rendu React
          handleDatabaseAction(table, prev, next).then(resolve);

          return next;
        });
      });
    };

  const handleDatabaseAction = async (table: string, prev: any[], next: any[]): Promise<boolean> => {
    try {
      if (next.length > prev.length) {
        // Ajout - On identifie TOUS les nouveaux items
        const addedItems = next.filter(n => !prev.some(p => p.id === n.id));
        if (addedItems.length > 0) {
          const success = await dataService.insertItems(table, addedItems);
          if (!success) {
            console.error(`[useData] Échec de l'insertion groupée dans ${table}`);
            return false;
          }
        }
        return true;
      } else if (next.length < prev.length) {
        // Suppression - On identifie TOUS les items supprimés
        const removedItems = prev.filter(p => !next.some(n => n.id === p.id));
        for (const removed of removedItems) {
          if (removed.id) await dataService.deleteItem(table, removed.id);
        }
        return true;
      } else {
        // Mise à jour potentielle
        const updated = next.find(n => {
          const p = prev.find(old => old.id === n.id);
          return p && JSON.stringify(p) !== JSON.stringify(n);
        });
        if (updated && updated.id) {
          await dataService.updateItem(table, updated.id, updated);
        }
        return true;
      }
    } catch (e) {
      console.error(`[useData] Exception DB pour ${table}:`, e);
      return false;
    }
  };

  const value = {
    photos, actualites, evenements, activites, causes, dons, loading,
    setPhotos: createSetter<GaleriePhoto>(KEYS.photos, setPhotosRaw),
    setActualites: createSetter<Actualite>(KEYS.actualites, setActualitesRaw),
    setEvenements: createSetter<Evenement>(KEYS.evenements, setEvenementsRaw),
    setActivites: createSetter<Activite>(KEYS.activites, setActivitesRaw),
    setCauses: createSetter<CauseDon>(KEYS.causes, setCausesRaw),
    setDons: createSetter<Don>(KEYS.dons, setDonsRaw),
    refresh: fetchData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}

// Retro-compatibility legacy hooks
export const usePhotos = () => useData().photos;
export const useActualites = () => useData().actualites;
export const useCauses = () => useData().causes;
export const useDons = () => useData().dons;
export const useEvenements = () => useData().evenements;
export const useActivites = () => useData().activites;
export const useLoading = () => useData().loading;
