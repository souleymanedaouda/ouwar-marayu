export interface GaleriePhoto {
  id: string;
  url: string;
  alt: string;
  legende?: string;
}

export interface Actualite {
  id: string;
  titre: string;
  date: string;
  extrait: string;
  imageUrl: string;
}

export interface Evenement {
  id: string;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  statut: "à venir" | "en cours" | "terminé";
}

export interface Activite {
  id: string;
  titre: string;
  categorie: string;
  description: string;
  beneficiaires: number;
  date: string;
}

export interface CauseDon {
  id: string;
  nom: string;
  montant: number;
  description: string;
  impact: string;
  badge?: string;
}

export interface Don {
  id: string;
  donateur: string;
  montant: number;
  cause: string;
  mode: string;
  date: string;
  statut: "reçu" | "en attente" | "annulé";
}
