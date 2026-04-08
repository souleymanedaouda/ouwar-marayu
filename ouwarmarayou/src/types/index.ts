export interface GaleriePhoto {
  id: string;
  url: string;
  alt: string;
  legende?: string;
  legende_en?: string;
  legende_ar?: string;
}

export interface Actualite {
  id: string;
  titre: string;
  titre_en?: string;
  titre_ar?: string;
  extrait: string;
  extrait_en?: string;
  extrait_ar?: string;
  date: string;
  imageUrl: string;
}

export interface Evenement {
  id: string;
  titre: string;
  titre_en?: string;
  titre_ar?: string;
  date: string;
  lieu: string;
  lieu_en?: string;
  lieu_ar?: string;
  description: string;
  description_en?: string;
  description_ar?: string;
  statut: "à venir" | "en cours" | "terminé";
}

export interface Activite {
  id: string;
  titre: string;
  titre_en?: string;
  titre_ar?: string;
  categorie: string;
  categorie_en?: string;
  categorie_ar?: string;
  description: string;
  description_en?: string;
  description_ar?: string;
  beneficiaires: number;
  date: string;
}

export interface CauseDon {
  id: string;
  nom: string;
  nom_en?: string;
  nom_ar?: string;
  montant: number;
  description: string;
  description_en?: string;
  description_ar?: string;
  impact: string;
  impact_en?: string;
  impact_ar?: string;
  badge?: string;
  badge_en?: string;
  badge_ar?: string;
}

export interface Don {
  id: string;
  donateur: string;
  email: string;
  montant: number;
  cause: string;
  mode: string;
  date: string;
  statut: "reçu" | "en en attente" | "annulé" | "reçu"; // Corrected duplicated reçu for completeness
}
