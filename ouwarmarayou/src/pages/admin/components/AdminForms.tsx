import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, UploadCloud 
} from "lucide-react";
import { 
  type Don, type Evenement, type Activite, type CauseDon, type GaleriePhoto, type Actualite 
} from "@/types";
import { Field, inputCls, selectCls } from "./AdminUI";

import { dataService } from "@/services/dataService";

async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, setUrl: (s: string) => void) {
  const file = e.target.files?.[0];
  if (!file) return;
  
  try {
    const publicUrl = await dataService.uploadFile(file);
    if (publicUrl) {
      setUrl(publicUrl);
    } else {
      alert("Erreur: Impossible d'uploader l'image. Vérifiez que le Bucket 'ouwar-marayu' existe dans Supabase Storage.");
    }
  } catch (err) {
    alert("Une erreur est survenue lors de l'envoi de l'image.");
  }
}

// --- Photo Form ---
export function AddPhotoForm({ onAdd, initialData }: { onAdd: (p: GaleriePhoto) => void, initialData?: GaleriePhoto }) {
  const [url, setUrl] = useState(initialData?.url || "");
  const [alt, setAlt] = useState(initialData?.alt || "");
  const [legende, setLegende] = useState(initialData?.legende || "");
  const [uploading, setUploading] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    await handleImageUpload(e, setUrl);
    setUploading(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) { alert("Veuillez choisir une image."); return; }
    onAdd({ id: initialData?.id || crypto.randomUUID(), url, alt, legende });
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Image de la galerie *">
        <label className="flex items-center justify-center w-full h-24 px-4 transition bg-white border-2 border-dashed border-gray-300 rounded-xl appearance-none cursor-pointer hover:border-primary/50 focus:outline-none">
          <span className="flex items-center space-x-2 text-gray-500">
            {uploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full" /> : <UploadCloud size={24} />}
            <span className="font-medium text-sm">{uploading ? "Chargement..." : "Cliquez pour parcourir ou prendre une photo"}</span>
          </span>
          <input type="file" required accept="image/*" onChange={onFileChange} className="hidden" />
        </label>
      </Field>
      <Field label="Description (alt) *">
        <input required value={alt} onChange={e => setAlt(e.target.value)} placeholder="Ex: Distribution sur le terrain" className={inputCls} />
      </Field>
      <Field label="Légende (optionnelle)">
        <input value={legende} onChange={e => setLegende(e.target.value)} placeholder="Ex: Mars 2026 — Niamey" className={inputCls} />
      </Field>
      {url && <div className="rounded-xl overflow-hidden aspect-video bg-gray-100"><img src={url} alt={alt} className="w-full h-full object-cover" /></div>}
      <button type="submit" disabled={uploading} className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Ajouter à la galerie"}
      </button>
    </form>
  );
}

// --- Actualité Form ---
export function AddActuForm({ onAdd, initialData }: { onAdd: (a: Actualite) => void, initialData?: Actualite }) {
  const [form, setForm] = useState({ 
    titre: initialData?.titre || "", 
    date: initialData?.date || "", 
    extrait: initialData?.extrait || "", 
    imageUrl: initialData?.imageUrl || "" 
  });
  const [uploading, setUploading] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    await handleImageUpload(e, (url) => setForm(p => ({ ...p, imageUrl: url })));
    setUploading(false);
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ id: initialData?.id || crypto.randomUUID(), ...form }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Titre *"><input required value={form.titre} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} placeholder="Titre de l'article" className={inputCls} /></Field>
      <Field label="Date *"><input required value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="Ex: Avril 2026" className={inputCls} /></Field>
      <Field label="Image d'illustration">
        <label className="flex items-center justify-center w-full h-16 px-4 transition bg-white border-2 border-dashed border-gray-300 rounded-xl appearance-none cursor-pointer hover:border-primary/50 focus:outline-none">
          <span className="flex items-center space-x-2 text-gray-500 text-sm">
            {uploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" /> : <UploadCloud size={20} />}
            <span className="font-medium">{uploading ? "Upload..." : "Joindre une image"}</span>
          </span>
          <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        </label>
      </Field>
      {form.imageUrl && <div className="rounded-xl overflow-hidden aspect-video bg-gray-100"><img src={form.imageUrl} className="w-full h-full object-cover" /></div>}
      <Field label="Résumé *"><textarea required value={form.extrait} onChange={e => setForm(p => ({ ...p, extrait: e.target.value }))} placeholder="Décrivez l'actualité en 2-3 phrases..." rows={3} className={`${inputCls} resize-none`} /></Field>
      <button type="submit" disabled={uploading} className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Publier l'article"}
      </button>
    </form>
  );
}

// --- Événement Form ---
export function AddEvtForm({ onAdd, initialData }: { onAdd: (e: Evenement) => void, initialData?: Evenement }) {
  const [form, setForm] = useState({ 
    titre: initialData?.titre || "", 
    date: initialData?.date || "", 
    lieu: initialData?.lieu || "", 
    description: initialData?.description || "", 
    statut: (initialData?.statut || "à venir") as Evenement["statut"] 
  });
  const submit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ id: initialData?.id || crypto.randomUUID(), ...form }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Titre *"><input required value={form.titre} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} placeholder="Titre de l'événement" className={inputCls} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date *"><input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputCls} /></Field>
        <Field label="Lieu *"><input required value={form.lieu} onChange={e => setForm(p => ({ ...p, lieu: e.target.value }))} placeholder="Lieu" className={inputCls} /></Field>
      </div>
      <Field label="Description"><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description..." rows={3} className={`${inputCls} resize-none`} /></Field>
      <Field label="Statut"><select value={form.statut} onChange={e => setForm(p => ({ ...p, statut: e.target.value as Evenement["statut"] }))} className={selectCls}>{(["à venir", "en cours", "terminé"] as const).map(s => <option key={s}>{s}</option>)}</select></Field>
      <button type="submit" className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Enregistrer l'événement"}
      </button>
    </form>
  );
}

// --- Activité Form ---
export function AddActForm({ onAdd, initialData }: { onAdd: (a: Activite) => void, initialData?: Activite }) {
  const [form, setForm] = useState({ 
    titre: initialData?.titre || "", 
    categorie: initialData?.categorie || "Alimentation", 
    description: initialData?.description || "", 
    beneficiaires: initialData?.beneficiaires?.toString() || "", 
    date: initialData?.date || "" 
  });
  const submit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ id: initialData?.id || crypto.randomUUID(), ...form, beneficiaires: Number(form.beneficiaires) }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Titre *"><input required value={form.titre} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} placeholder="Titre de l'activité" className={inputCls} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Catégorie"><select value={form.categorie} onChange={e => setForm(p => ({ ...p, categorie: e.target.value }))} className={selectCls}>{["Alimentation", "Éducation", "Santé", "Secours", "Social"].map(c => <option key={c}>{c}</option>)}</select></Field>
        <Field label="Bénéficiaires *"><input required type="number" min={1} value={form.beneficiaires} onChange={e => setForm(p => ({ ...p, beneficiaires: e.target.value }))} placeholder="Nombre" className={inputCls} /></Field>
      </div>
      <Field label="Période"><input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="Ex: 2026-04" className={inputCls} /></Field>
      <Field label="Description"><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Décrivez l'activité..." rows={3} className={`${inputCls} resize-none`} /></Field>
      <button type="submit" className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Enregistrer l'activité"}
      </button>
    </form>
  );
}

// --- Cause Form ---
export function AddCauseForm({ onAdd, initialData }: { onAdd: (c: CauseDon) => void, initialData?: CauseDon }) {
  const [form, setForm] = useState({ 
    nom: initialData?.nom || "", 
    montant: initialData?.montant?.toString() || "", 
    description: initialData?.description || "", 
    impact: initialData?.impact || "", 
    badge: initialData?.badge || "" 
  });
  const submit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ id: initialData?.id || crypto.randomUUID(), ...form, montant: Number(form.montant) }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Nom de la cause *"><input required value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} placeholder="Ex: Urgence sécheresse" className={inputCls} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Montant (FCFA) *"><input required type="number" min={500} value={form.montant} onChange={e => setForm(p => ({ ...p, montant: e.target.value }))} placeholder="Ex: 20000" className={inputCls} /></Field>
        <Field label="Badge (optionnel)"><input value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} placeholder="Ex: Urgent" className={inputCls} /></Field>
      </div>
      <Field label="Description *"><textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="À quoi sert ce don ?" rows={3} className={`${inputCls} resize-none`} /></Field>
      <Field label="Impact *"><input required value={form.impact} onChange={e => setForm(p => ({ ...p, impact: e.target.value }))} placeholder="Ex: 1 famille aidée pendant 1 mois" className={inputCls} /></Field>
      <button type="submit" className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Ajouter à la page Solidarité"}
      </button>
    </form>
  );
}

// --- Don Form ---
export function AddDonForm({ causes, onAdd, initialData }: { causes: CauseDon[]; onAdd: (d: Don) => void, initialData?: Don }) {
  const [form, setForm] = useState({ 
    donateur: initialData?.donateur || "", 
    montant: initialData?.montant?.toString() || "", 
    cause: initialData?.cause || causes[0]?.nom || "Don libre", 
    mode: initialData?.mode || "Orange Money", 
    statut: (initialData?.statut || "reçu") as Don["statut"] 
  });
  const submit = (e: React.FormEvent) => { e.preventDefault(); onAdd({ id: initialData?.id || crypto.randomUUID(), date: initialData?.date || new Date().toISOString().split("T")[0], ...form, montant: Number(form.montant) }); };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Donateur *"><input required value={form.donateur} onChange={e => setForm(p => ({ ...p, donateur: e.target.value }))} placeholder="Nom" className={inputCls} /></Field>
        <Field label="Montant (FCFA) *"><input required type="number" min={1000} value={form.montant} onChange={e => setForm(p => ({ ...p, montant: e.target.value }))} placeholder="Ex: 15000" className={inputCls} /></Field>
      </div>
      <Field label="Cause">
        <select value={form.cause} onChange={e => setForm(p => ({ ...p, cause: e.target.value }))} className={selectCls}>
          {causes.map(c => <option key={c.id} value={c.nom}>{c.nom}</option>)}
          <option value="Don libre">Don libre</option>
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Mode de paiement"><select value={form.mode} onChange={e => setForm(p => ({ ...p, mode: e.target.value }))} className={selectCls}>{["Orange Money", "Moov Money", "Virement"].map(m => <option key={m}>{m}</option>)}</select></Field>
        <Field label="Statut"><select value={form.statut} onChange={e => setForm(p => ({ ...p, statut: e.target.value as Don["statut"] }))} className={selectCls}>{(["reçu", "en attente", "annulé"] as const).map(s => <option key={s}>{s}</option>)}</select></Field>
      </div>
      <button type="submit" className="w-full btn-vibrant-green py-3 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={16} />{initialData ? "Enregistrer les modifications" : "Enregistrer le don"}
      </button>
    </form>
  );
}
