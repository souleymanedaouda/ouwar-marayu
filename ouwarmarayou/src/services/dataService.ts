import { supabase } from "@/integrations/supabase/client";

// Noms RÉELS des tables dans Supabase (confirmés par diagnostic réseau)
export const KEYS = {
  photos: "hb_photos",       // colonnes: id, url, alt, legende
  actualites: "hb_actualites", // colonnes: id, titre, date, extrait, image_url
  evenements: "hb_evenements", // ✅ fonctionne (1 événement trouvé)
  activites: "hb_activites",
  causes: "hb_causes",         // ✅ fonctionne
  dons: "hb_dons",
};

const tableMap: Record<string, string> = {};

// Mapper Supabase -> UI (les colonnes hb_* sont déjà en français, quasiment rien à faire)
function mapRowToModel(table: string, row: any): any {
  if (!row) return row;
  const model = { ...row };

  // hb_actualites: image_url (DB) -> imageUrl (UI, utilisé dans Actualites.tsx)
  if (table === KEYS.actualites) {
    if (row.image_url && !model.imageUrl) model.imageUrl = row.image_url;
  }

  // hb_dons: normalisation des montants et statuts
  if (table === KEYS.dons) {
    return {
      ...model,
      donateur: row.donateur || row.donor_name || 'Anonyme',
      montant: Number(row.montant || row.amount || 0),
      statut: row.statut || 'reçu',
      date: row.date || (row.created_at ? new Date(row.created_at).toLocaleDateString("fr-FR") : ''),
    };
  }

  return model;
}

// Mapper UI -> Supabase (envoyer UNIQUEMENT les colonnes qui existent dans hb_*)
function mapModelToRow(table: string, item: any): any {
  if (!item) return item;

  if (table === KEYS.photos) {
    // hb_photos: colonnes confirmées = id, url, alt, legende
    // On N'envoie PAS legende_en/legende_ar car ces colonnes peuvent ne pas exister → rejet silencieux
    const row: any = {};
    if (item.id) row.id = item.id;
    row.url = item.url || item.imageUrl || item.image_url || '';
    row.alt = item.alt || item.legende || 'Photo';
    if (item.legende) row.legende = item.legende;
    return row;
  }

  if (table === KEYS.actualites) {
    // hb_actualites: colonnes confirmées = id, titre, date, extrait, imageUrl (ou image_url selon création Supabase)
    const row: any = {};
    if (item.id) row.id = item.id;
    row.titre = item.titre || item.title || '';
    row.date = item.date || new Date().toISOString().split('T')[0];
    row.extrait = item.extrait || item.excerpt || '';
    // On n'envoie que image_url (snake_case) car imageUrl (camelCase) n'existe pas dans la table
    row.image_url = item.imageUrl || item.image_url || item.url || '';
    return row;
  }

  if (table === KEYS.evenements) {
    // hb_evenements: titre, date, lieu, description, statut
    const row: any = {};
    if (item.id) row.id = item.id;
    row.titre = item.titre || item.title || '';
    row.date = item.date || '';
    row.lieu = item.lieu || '';
    row.description = item.description || '';
    row.statut = item.statut || 'à venir';
    return row;
  }

  if (table === KEYS.activites) {
    // hb_activites: titre, categorie, description, beneficiaires, date
    const row: any = {};
    if (item.id) row.id = item.id;
    row.titre = item.titre || item.title || '';
    row.categorie = item.categorie || item.category || '';
    row.description = item.description || '';
    row.beneficiaires = Number(item.beneficiaires || 0);
    row.date = item.date || '';
    return row;
  }

  if (table === KEYS.causes) {
    // hb_causes: nom, montant, description, impact, badge
    const row: any = {};
    if (item.id) row.id = item.id;
    row.nom = item.nom || item.name || '';
    row.montant = Number(item.montant || item.amount || 0);
    row.description = item.description || '';
    row.impact = item.impact || '';
    if (item.badge) row.badge = item.badge;
    return row;
  }

  if (table === KEYS.dons) {
    // hb_dons: donateur, email, montant, cause, mode, statut, date
    const row: any = {};
    if (item.id) row.id = item.id;
    row.donateur = item.donateur || item.donor_name || 'Anonyme';
    row.email = item.email || '';
    row.montant = Number(item.montant || item.amount || 0);
    row.cause = item.cause || '';
    row.mode = item.mode || 'Orange Money';
    row.statut = item.statut || 'reçu';
    row.date = item.date || new Date().toISOString().split('T')[0];
    return row;
  }

  // Fallback passe-tout
  return { ...item };
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
        console.error(`[Supabase] Erreur lecture ${table}:`, error.message);
        return [];
      }
      return data.map((d: any) => mapRowToModel(table, d)) as T[];
    } catch (e) {
      console.error(`[Supabase] Exception lecture ${table}:`, e);
      return [];
    }
  },

  async insertItem<T>(table: string, item: T): Promise<boolean> {
    return this.insertItems(table, [item]);
  },

  async insertItems<T>(table: string, items: T[]): Promise<boolean> {
    try {
      const realTable = tableMap[table] || table;
      const rows = items.map(item => mapModelToRow(table, item));
      
      const { error } = await (supabase as any).from(realTable).insert(rows);
      
      if (error) {
        console.error(`[Supabase] Erreur insertion multiple ${table}:`, error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error(`[Supabase] Exception insertion multiple ${table}:`, e);
      return false;
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
