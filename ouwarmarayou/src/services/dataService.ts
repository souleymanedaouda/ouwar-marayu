import { supabase } from "@/integrations/supabase/client";

export const KEYS = {
  photos: "hb_photos",
  actualites: "hb_actualites",
  evenements: "hb_evenements",
  activites: "hb_activites",
  causes: "hb_causes",
  dons: "hb_dons",
};

const tableMap: Record<string, string> = {
  // Plus de mapping complexe nécessaire, on utilise les noms hb_* directement
};

// Mapper Supabase -> UI
function mapRowToModel(table: string, row: any): any {
  if (!row) return row;
  
  // Correction automatique des champs image_url -> imageUrl pour toutes les tables
  const model = { ...row };
  if (row.image_url && !row.imageUrl) {
    model.imageUrl = row.image_url;
  }
  
  // Mappings spécifiques si nécessaire
  if (table === KEYS.dons) {
    return {
      ...model,
      id: row.id,
      donateur: row.donateur || row.donor_name || 'Anonyme',
      montant: Number(row.montant || row.amount || 0),
      statut: row.statut || 'reçu',
      date: row.date || (row.created_at ? new Date(row.created_at).toLocaleDateString("fr-FR") : 'Date inconnue')
    };
  }

  return model;
}

// Mapper UI -> Supabase
function mapModelToRow(table: string, item: any): any {
  if (!item) return item;

  const row = { ...item };
  
  // Correction pour Supabase (image_url est standard en DB)
  if (row.imageUrl) {
    row.image_url = row.imageUrl;
    delete row.imageUrl;
  }
  
  // Pour hb_dons, on garde les noms de colonnes envoyés par le formulaire
  // s'ils correspondent à la table hb_dons.
  return row;
}

/**
 * Service pour la persistance des données via Supabase.
 */
export const dataService = {
  async getItems<T>(table: string): Promise<T[]> {
    try {
      const realTable = tableMap[table] || table;
      const { data, error } = await (supabase as any).from(realTable).select('*').order('created_at', { ascending: false });
      if (error) {
        console.error(`[Supabase] Erreur lecture ${table} (${realTable}):`, error.message);
        return [];
      }
      return data.map((d: any) => mapRowToModel(table, d)) as T[];
    } catch (e) {
      console.error(`[Supabase] Exception lecture ${table}:`, e);
      return [];
    }
  },

  async insertItem<T>(table: string, item: T): Promise<void> {
    try {
      const realTable = tableMap[table] || table;

      const row = mapModelToRow(table, item);
      const { error } = await (supabase as any).from(realTable).insert(row);
      if (error) console.error(`[Supabase] Erreur insertion ${table}:`, error.message);
    } catch (e) {
      console.error(`[Supabase] Exception insertion ${table}:`, e);
    }
  },

  async updateItem<T extends { id?: string }>(table: string, id: string, item: T): Promise<void> {
    try {
      const realTable = tableMap[table] || table;
      const row = mapModelToRow(table, item);
      
      // On retire l'id du row pour ne pas tenter de le modifier (certains Supabase l'interdisent)
      const { id: _, ...updatableFields } = row;

      const { error } = await (supabase as any).from(realTable).update(updatableFields).eq('id', id);
      if (error) console.error(`[Supabase] Erreur mise à jour ${table} (ID: ${id}):`, error.message);
    } catch (e) {
      console.error(`[Supabase] Exception mise à jour ${table}:`, e);
    }
  },

  async deleteItem(table: string, id: string): Promise<void> {
    try {
      const realTable = tableMap[table] || table;

      const { error } = await (supabase as any).from(realTable).delete().eq('id', id);
      if (error) console.error(`[Supabase] Erreur suppression ${table}:`, error.message);
    } catch (e) {
      console.error(`[Supabase] Exception suppression ${table}:`, e);
    }
  },

  async uploadFile(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await (supabase as any).storage
        .from('ouwar-marayu')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error(`[Supabase] Erreur upload:`, uploadError);
        return null;
      }

      const { data } = (supabase as any).storage
        .from('ouwar-marayu')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (e) {
      console.error(`[Supabase] Exception upload:`, e);
      return null;
    }
  },

  async checkAdminAuth(user: string, pass: string): Promise<boolean> {
    try {
      const { data, error } = await (supabase as any)
        .from('hb_admin_config')
        .select('*')
        .eq('username', user)
        .eq('password', pass)
        .single();
      
      if (error || !data) return false;
      return true;
    } catch (e) {
      return false;
    }
  },

  subscribe(table: string, callback: () => void) {
    const realTable = tableMap[table] || table;

    return (supabase as any)
      .channel(`${realTable}-changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table: realTable }, callback)
      .subscribe();
  }
};
