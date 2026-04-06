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

// Import assets for defaults
import founderField from "@/assets/founder-field.jpg";
import teamDistribution from "@/assets/team-distribution.jpg";

// --- Defaults ---
const defaultPhotos: GaleriePhoto[] = [
  { id: "e6a0d4b8-f8de-4f51-a9f4-18c9ecf8b5f1", url: founderField, alt: "Distribution sur le terrain", legende: "Distribution sur le terrain" },
  { id: "42db5ec4-2a6c-48be-88be-db971c26b532", url: teamDistribution, alt: "Équipe de distribution", legende: "Équipe de distribution" },
];

const defaultActualites: Actualite[] = [
  { id: "08e0ab85-1815-46f9-86f7-1dc00dbb1265", titre: "Grande distribution de kits", date: "Février 2026", extrait: "Ouwar Marayu a distribué plus de 200 kits alimentaires...", imageUrl: teamDistribution },
];

const defaultEvenements: Evenement[] = [
  { id: "3f33dfb1-d30d-440a-ac0f-5b1287c703b0", titre: "Distribution alimentaire", date: "2026-04-10", lieu: "Quartier Gamkallé", description: "Pour 50 familles.", statut: "à venir" },
];

const defaultActivites: Activite[] = [
  { id: "6f5eb1e3-c283-4a69-8260-84a1aaff5ee6", titre: "Programme nutrition enfants", categorie: "Alimentation", description: "Suivi nutritionnel mensuel.", beneficiaires: 45, date: "2026-03" },
];

const defaultCauses: CauseDon[] = [
  { id: "ea00a12e-13c2-4a00-983f-8463c2242133", nom: "Secours Alimentaire", montant: 15000, description: "Riz, mil, huile pour 2 semaines.", impact: "1 famille nourrie", badge: "Urgent" },
];

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
  setPhotos: (v: GaleriePhoto[] | ((p: GaleriePhoto[]) => GaleriePhoto[])) => void;
  setActualites: (v: Actualite[] | ((p: Actualite[]) => Actualite[])) => void;
  setEvenements: (v: Evenement[] | ((p: Evenement[]) => Evenement[])) => void;
  setActivites: (v: Activite[] | ((p: Activite[]) => Activite[])) => void;
  setCauses: (v: CauseDon[] | ((p: CauseDon[]) => CauseDon[])) => void;
  setDons: (v: Don[] | ((p: Don[]) => Don[])) => void;
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

  const fetchData = async () => {
    setLoading(true);
    const [remoteDons, remoteEvts, remoteActs, remoteCauses, remotePhotos, remoteActus] = await Promise.all([
      dataService.getItems<Don>(KEYS.dons),
      dataService.getItems<Evenement>(KEYS.evenements),
      dataService.getItems<Activite>(KEYS.activites),
      dataService.getItems<CauseDon>(KEYS.causes),
      dataService.getItems<GaleriePhoto>(KEYS.photos),
      dataService.getItems<Actualite>(KEYS.actualites),
    ]);

    setDonsRaw(remoteDons);
    setEvenementsRaw(remoteEvts);
    setActivitesRaw(remoteActs);
    setCausesRaw(remoteCauses);
    setPhotosRaw(remotePhotos);
    setActualitesRaw(remoteActus);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const subs = Object.values(KEYS).map(table => dataService.subscribe(table, fetchData));
    return () => { subs.forEach(s => s.unsubscribe()); };
  }, []);

  const createSetter = <T extends {id?: string}>(table: string, setRaw: any) => (v: T[] | ((p: T[]) => T[])) => {
    setRaw((prev: T[]) => {
      const next = typeof v === "function" ? (v as (p: T[]) => T[])(prev) : v;
      if (next.length > prev.length) {
        // Ajout
        const added = next.find(n => !prev.some(p => p.id === n.id));
        if (added) dataService.insertItem(table, added);
      } else if (next.length < prev.length) {
        // Suppression
        const removed = prev.find(p => !next.some(n => n.id === p.id));
        if (removed && removed.id) dataService.deleteItem(table, removed.id);
      } else {
        // Mise à jour potentielle
        const updated = next.find(n => {
          const p = prev.find(old => old.id === n.id);
          return p && JSON.stringify(p) !== JSON.stringify(n);
        });
        if (updated && updated.id) {
          dataService.updateItem(table, updated.id, updated);
        }
      }
      return next;
    });
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
