import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Heart, Calendar, Activity, BarChart3, LogOut,
  Plus, Trash2, X, CheckCircle, Users, TrendingUp, DollarSign,
  Shield, Menu, Bell, ChevronRight, Save, Image, Newspaper,
  Eye, EyeOff, Printer, UploadCloud, Pencil, ArrowLeft, Globe
} from "lucide-react";
import { useData } from "@/hooks/useData";
import { KEYS } from "@/services/dataService";
import {
  type Don, type Evenement, type Activite, type CauseDon, type GaleriePhoto, type Actualite
} from "@/types";
import { Modal, Field, StatCard } from "./components/AdminUI";
import {
  AddPhotoForm, AddActuForm, AddEvtForm, AddActForm, AddCauseForm, AddDonForm
} from "./components/AdminForms";

const CAMPAIGN_BASE_AMOUNT = 0;
const CAMPAIGN_GOAL = 16000000;


// ─── Tabs ──────────────────────────────────────────────────────────────────────
type Tab = "overview" | "galerie" | "actualites" | "evenements" | "activites" | "dons" | "causes" | "mot-de-passe";

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // ── Stores ──
  const {
    dons, setDons,
    evenements, setEvenements,
    activites, setActivites,
    causes, setCauses,
    photos, setPhotos,
    actualites, setActualites
  } = useData();

  // ── Modal toggles ──
  const [showDonForm, setShowDonForm] = useState(false);
  const [showEvtForm, setShowEvtForm] = useState(false);
  const [showActForm, setShowActForm] = useState(false);
  const [showCauseForm, setShowCauseForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showActuForm, setShowActuForm] = useState(false);
  const [editingItem, setEditingItem] = useState<{ type: string, data: any } | null>(null);

  // ── Auth guard ──
  useEffect(() => {
    if (localStorage.getItem("hb_admin_auth") !== "true") navigate("/admin/login");
  }, [navigate]);

  const logout = () => { localStorage.removeItem("hb_admin_auth"); navigate("/admin/login"); };
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // ── Metrics ──
  const totalDons = dons.filter(d => d.statut === "reçu").reduce((s, d) => s + d.montant, 0);
  const evenementsAVenir = evenements.filter(e => e.statut === "à venir").length;
  const totalBenef = activites.reduce((s, a) => s + a.beneficiaires, 0);

  const navItems: { id: Tab; label: string; icon: React.ElementType; group?: string }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard, group: "Dashboard" },
    { id: "galerie", label: "Galerie photos", icon: Image, group: "Contenu du site" },
    { id: "actualites", label: "Actualités", icon: Newspaper, group: "Contenu du site" },
    { id: "evenements", label: "Événements", icon: Calendar, group: "Contenu du site" },
    { id: "activites", label: "Activités", icon: Activity, group: "Contenu du site" },
    { id: "causes", label: "Causes de don", icon: Heart, group: "Contenu du site" },
    { id: "dons", label: "Dons reçus", icon: DollarSign, group: "Rapports" },
    { id: "mot-de-passe", label: "Mot de passe", icon: EyeOff, group: "Paramètres" },
  ];

  // Group nav items
  const groups = [...new Set(navItems.map(n => n.group))];

  return (
    <div className="min-h-screen bg-background flex print:bg-white print:block relative">
      {/* Admin glass background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, hsl(330 70% 35% / 0.5) 0%, transparent 70%)', filter: 'blur(120px)', animation: 'blobFloat1 25s ease-in-out infinite', willChange: 'transform' }} />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, hsl(35 80% 55% / 0.4) 0%, transparent 70%)', filter: 'blur(140px)', animation: 'blobFloat2 30s ease-in-out infinite', willChange: 'transform' }} />
        <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, hsl(330 60% 70% / 0.4) 0%, transparent 70%)', filter: 'blur(120px)', animation: 'blobFloat3 22s ease-in-out infinite', willChange: 'transform' }} />
      </div>
      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 gradient-primary shadow-2xl border-none transform transition-transform duration-300 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 print:hidden text-white`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/30 shadow-inner">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base tracking-tight">Ouwar Marayu</p>
              <p className="text-[10px] text-white/50 uppercase font-black tracking-widest leading-none mt-1">Plateforme Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-5 overflow-y-auto space-y-6">
          {groups.map(group => (
            <div key={group}>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 px-2">{group}</p>
              {navItems.filter(n => n.group === group).map((item) => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all mb-1.5 ${activeTab === item.id 
                    ? "bg-white text-primary shadow-lg shadow-black/10 scale-[1.02]" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? "text-primary" : "text-white/70"} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-white/10 bg-black/5">
          <Link to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors mb-2"
          >
            <Globe size={18} className="text-white/70" />Visiter le site
          </Link>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-white/90 hover:bg-red-500/20 hover:text-red-100 transition-colors"
          >
            <LogOut size={18} className="text-white/70" />Déconnexion
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-72 flex flex-col print:ml-0 print:w-full relative z-10">
        <header className="sticky top-0 z-20 gradient-primary shadow-md px-6 md:px-8 h-16 flex items-center justify-between print:hidden border-none">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Menu size={22} />
            </button>
            <h1 className="font-heading font-bold text-white text-base md:text-xl tracking-tight">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-primary shadow-sm" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-white/50">
              <span className="text-primary font-black text-sm">ADM</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-muted-foreground text-sm mb-6">Bonjour Admin 👋 — Voici ce qui se passe sur le site.</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard icon={Image} label="Photos galerie" value={photos.length} color="bg-violet-500" sub="visibles sur le site" />
                  <StatCard icon={Newspaper} label="Actualités" value={actualites.length} color="bg-blue-500" sub="articles publiés" />
                  <StatCard icon={Calendar} label="Événements" value={evenementsAVenir} color="bg-emerald-500" sub="à venir" />
                  <StatCard icon={DollarSign} label="Dons reçus" value={`${Math.round(totalDons / 1000)}k FCFA`} color="bg-primary" sub={`${dons.filter(d => d.statut === "reçu").length} dons`} />
                </div>

                {/* Quick access cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { tab: "galerie" as Tab, icon: Image, title: "Galerie", desc: `${photos.length} photo(s) — ajouter ou supprimer des images`, color: "bg-violet-50 border-violet-100", iconColor: "text-violet-600" },
                    { tab: "actualites" as Tab, icon: Newspaper, title: "Actualités", desc: `${actualites.length} article(s) — publier, mettre à jour`, color: "bg-blue-50 border-blue-100", iconColor: "text-blue-600" },
                    { tab: "evenements" as Tab, icon: Calendar, title: "Événements", desc: `${evenements.length} événement(s) — gérer les dates`, color: "bg-emerald-50 border-emerald-100", iconColor: "text-emerald-600" },
                    { tab: "activites" as Tab, icon: Activity, title: "Activités", desc: `${activites.length} activité(s) — suivi des projets`, color: "bg-amber-50 border-amber-100", iconColor: "text-amber-600" },
                    { tab: "causes" as Tab, icon: Heart, title: "Causes de don", desc: `${causes.length} cause(s) — page Solidarité`, color: "bg-rose-50 border-rose-100", iconColor: "text-rose-600" },
                    { tab: "dons" as Tab, icon: DollarSign, title: "Dons reçus", desc: `${dons.length} don(s) enregistré(s)`, color: "bg-primary/5 border-primary/10", iconColor: "text-primary" },
                  ].map((card) => (
                    <button key={card.tab} onClick={() => setActiveTab(card.tab)}
                      className={`glass-card p-5 text-left bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all`}
                    >
                      <card.icon className={`${card.iconColor} mb-3`} size={24} />
                      <p className="font-heading font-bold text-foreground mb-1">{card.title}</p>
                      <p className="text-muted-foreground text-xs">{card.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── GALERIE ── */}
            {activeTab === "galerie" && (
              <motion.div key="galerie" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-muted-foreground text-sm">Ces photos s'affichent sur la page <strong>Galerie</strong> du site.</p>
                  <button onClick={() => setShowPhotoForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_rgba(149,27,101,0.5)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} />Ajouter une photo
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {photos.map((photo) => (
                    <motion.div key={photo.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      className="relative group aspect-square rounded-2xl overflow-hidden glass-card !p-0 bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x200/f0e6f0/7d3c7d?text=Photo"; }}
                      />
                      {photo.legende && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2">
                          <p className="text-white text-xs truncate">{photo.legende}</p>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingItem({ type: 'photo', data: photo })}
                          className="w-8 h-8 rounded-full btn-vibrant-orange flex items-center justify-center"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={async () => {
                            const success = await setPhotos(prev => prev.filter(p => p.id !== photo.id));
                            if (success) showToast("Photo supprimée de la galerie");
                            else showToast("❌ Erreur de suppression en base de données");
                          }}
                          className="w-8 h-8 rounded-full btn-vibrant-red flex items-center justify-center"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {photos.length === 0 && (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                      <Image size={40} className="mx-auto mb-3 opacity-30" />
                      <p>Aucune photo. Ajoutez-en une ci-dessus.</p>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showPhotoForm && (
                    <Modal title="Ajouter une photo" onClose={() => setShowPhotoForm(false)}>
                      <AddPhotoForm onAdd={async (p) => {
                        const success = await setPhotos(prev => [...prev, p]);
                        setShowPhotoForm(false);
                        if (success) showToast("Photo ajoutée à la galerie !");
                        else showToast("❌ Erreur de sauvegarde en base de données");
                      }} />
                    </Modal>
                  )}
                  {editingItem?.type === 'photo' && (
                    <Modal title="Modifier la photo" onClose={() => setEditingItem(null)}>
                      <AddPhotoForm
                        initialData={editingItem.data}
                        onAdd={async (p) => {
                          const success = await setPhotos(prev => prev.map(old => old.id === p.id ? p : old));
                          setEditingItem(null);
                          if (success) showToast("Photo mise à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── ACTUALITÉS ── */}
            {activeTab === "actualites" && (
              <motion.div key="actualites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-muted-foreground text-sm">Ces articles s'affichent sur la page <strong>Actualités</strong> du site.</p>
                  <button onClick={() => setShowActuForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-[0_0_15px_rgba(149,27,101,0.2)] hover:shadow-[0_0_25px_rgba(149,27,101,0.4)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Plus size={16} />Ajouter un article
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {actualites.map((actu) => (
                    <motion.div key={actu.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="glass-card overflow-hidden flex flex-col bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img src={actu.imageUrl} alt={actu.titre} className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x225/f0e6f0/7d3c7d?text=Article"; }}
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <p className="text-xs text-muted-foreground mb-1">{actu.date}</p>
                        <h3 className="font-heading font-bold text-foreground mb-2 text-sm">{actu.titre}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{actu.extrait}</p>
                      </div>
                      <div className="px-4 pb-4 flex gap-2">
                        <button onClick={() => setEditingItem({ type: 'actu', data: actu })}
                          className="flex-1 py-2 rounded-xl btn-vibrant-orange text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Pencil size={14} />Modifier
                        </button>
                        <button onClick={async () => {
                            const success = await setActualites(prev => prev.filter(a => a.id !== actu.id));
                            if (success) showToast("Article supprimé");
                            else showToast("❌ Erreur de suppression");
                          }}
                          className="flex-1 py-2 rounded-xl btn-vibrant-red text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Trash2 size={14} />Supprimer
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {actualites.length === 0 && (
                    <div className="col-span-2 text-center py-16 text-muted-foreground">
                      <Newspaper size={40} className="mx-auto mb-3 opacity-30" />
                      <p>Aucun article. Ajoutez-en un ci-dessus.</p>
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {showActuForm && (
                    <Modal title="Ajouter un article" onClose={() => setShowActuForm(false)}>
                      <AddActuForm onAdd={async (a) => {
                        const success = await setActualites(prev => [a, ...prev]);
                        setShowActuForm(false);
                        if (success) showToast("Article publié !");
                        else showToast("❌ Erreur de sauvegarde (données incomplètes ?)");
                      }} />
                    </Modal>
                  )}
                  {editingItem?.type === 'actu' && (
                    <Modal title="Modifier l'article" onClose={() => setEditingItem(null)}>
                      <AddActuForm
                        initialData={editingItem.data}
                        onAdd={async (a) => {
                          const success = await setActualites(prev => prev.map(old => old.id === a.id ? a : old));
                          setEditingItem(null);
                          if (success) showToast("Article mis à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── ÉVÉNEMENTS ── */}
            {activeTab === "evenements" && (
              <motion.div key="evenements" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground text-sm">Événements affichés dans la vue d'ensemble admin et consultables par l'équipe.</p>
                  <button onClick={() => setShowEvtForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-[0_0_15px_rgba(149,27,101,0.2)] hover:shadow-[0_0_25px_rgba(149,27,101,0.4)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Plus size={16} />Ajouter
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {evenements.map((evt) => (
                    <motion.div key={evt.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      className="glass-card p-6 bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-foreground">{evt.titre}</h3>
                          <p className="text-muted-foreground text-xs mt-0.5">{evt.date} · {evt.lieu}</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingItem({ type: 'evt', data: evt })}
                            className="p-2 rounded-lg btn-vibrant-orange"
                          >
                            <Pencil size={15} />
                          </button>
                          <button onClick={async () => {
                              const success = await setEvenements(prev => prev.filter(e => e.id !== evt.id));
                              if (success) showToast("Événement supprimé");
                              else showToast("❌ Erreur de suppression");
                            }}
                            className="p-2 rounded-lg btn-vibrant-red"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{evt.description}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold glass-pill ${evt.statut === "à venir" ? "bg-violet-500/20 text-violet-300 dark:text-violet-300 border-violet-500/30" : evt.statut === "en cours" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-muted text-muted-foreground border-border"}`}>
                        {evt.statut}
                      </span>
                    </motion.div>
                  ))}
                  {evenements.length === 0 && <div className="col-span-2 text-center py-16 text-muted-foreground"><Calendar size={40} className="mx-auto mb-3 opacity-30" /><p>Aucun événement.</p></div>}
                </div>
                <AnimatePresence>
                  {showEvtForm && <Modal title="Ajouter un événement" onClose={() => setShowEvtForm(false)}><AddEvtForm onAdd={async (e) => {
                        const success = await setEvenements(prev => [e, ...prev]);
                        setShowEvtForm(false);
                        if (success) showToast("Événement ajouté !");
                        else showToast("❌ Erreur de sauvegarde");
                      }} /></Modal>}
                  {editingItem?.type === 'evt' && (
                    <Modal title="Modifier l'événement" onClose={() => setEditingItem(null)}>
                      <AddEvtForm
                        initialData={editingItem.data}
                        onAdd={async (e) => {
                          const success = await setEvenements(prev => prev.map(old => old.id === e.id ? e : old));
                          setEditingItem(null);
                          if (success) showToast("Événement mis à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── ACTIVITÉS ── */}
            {activeTab === "activites" && (
              <motion.div key="activites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground text-sm">Projets et actions de terrain de l'association.</p>
                  <button onClick={() => setShowActForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-[0_0_15px_rgba(149,27,101,0.2)] hover:shadow-[0_0_25px_rgba(149,27,101,0.4)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Plus size={16} />Ajouter
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activites.map((act) => (
                    <motion.div key={act.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      className="glass-card p-6 bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{act.categorie}</span>
                          <h3 className="font-heading font-bold text-foreground mt-2">{act.titre}</h3>
                          <p className="text-muted-foreground text-xs">{act.date}</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingItem({ type: 'act', data: act })}
                            className="p-2 rounded-lg btn-vibrant-orange"
                          >
                            <Pencil size={15} />
                          </button>
                          <button onClick={async () => {
                              const success = await setActivites(prev => prev.filter(a => a.id !== act.id));
                              if (success) showToast("Activité supprimée");
                              else showToast("❌ Erreur de suppression");
                            }}
                            className="p-2 rounded-lg btn-vibrant-red"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed my-3">{act.description}</p>
                      <div className="flex items-center gap-2 glass-panel !rounded-xl px-3 py-2">
                        <Users size={14} className="text-emerald-600" />
                        <span className="text-emerald-700 font-semibold text-sm">{act.beneficiaires} bénéficiaires</span>
                      </div>
                    </motion.div>
                  ))}
                  {activites.length === 0 && <div className="col-span-3 text-center py-16 text-muted-foreground"><Activity size={40} className="mx-auto mb-3 opacity-30" /><p>Aucune activité.</p></div>}
                </div>
                <AnimatePresence>
                  {showActForm && <Modal title="Ajouter une activité" onClose={() => setShowActForm(false)}><AddActForm onAdd={async (a) => {
                        const success = await setActivites(prev => [a, ...prev]);
                        setShowActForm(false);
                        if (success) showToast("Activité ajoutée !");
                        else showToast("❌ Erreur de sauvegarde");
                      }} /></Modal>}
                  {editingItem?.type === 'act' && (
                    <Modal title="Modifier l'activité" onClose={() => setEditingItem(null)}>
                      <AddActForm
                        initialData={editingItem.data}
                        onAdd={async (a) => {
                          const success = await setActivites(prev => prev.map(old => old.id === a.id ? a : old));
                          setEditingItem(null);
                          if (success) showToast("Activité mise à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── CAUSES DE DON ── */}
            {activeTab === "causes" && (
              <motion.div key="causes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-muted-foreground text-sm">Ces causes s'affichent sur la page <strong>Solidarité</strong> du site.</p>
                  <button onClick={() => setShowCauseForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-[0_0_15px_rgba(149,27,101,0.2)] hover:shadow-[0_0_25px_rgba(149,27,101,0.4)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Plus size={16} />Ajouter une cause
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {causes.map((cause) => (
                    <motion.div key={cause.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="glass-card p-6 bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading font-bold text-foreground">{cause.nom}</h3>
                            {cause.badge && <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full">{cause.badge}</span>}
                          </div>
                          <p className="font-bold text-primary text-xl">{cause.montant.toLocaleString("fr-FR")} FCFA</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingItem({ type: 'cause', data: cause })}
                            className="p-2 rounded-lg btn-vibrant-orange"
                          >
                            <Pencil size={15} />
                          </button>
                          <button onClick={async () => {
                              const success = await setCauses(prev => prev.filter(c => c.id !== cause.id));
                              if (success) showToast("Cause supprimée de la page Solidarité");
                              else showToast("❌ Erreur de suppression");
                            }}
                            className="p-2 rounded-lg btn-vibrant-red"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-2">{cause.description}</p>
                      <div className="flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-2 text-sm text-primary font-semibold">
                        <Eye size={13} />{cause.impact}
                      </div>
                    </motion.div>
                  ))}
                  {causes.length === 0 && (
                    <div className="col-span-2 text-center py-16 text-gray-400">
                      <Heart size={40} className="mx-auto mb-3 opacity-30" />
                      <p>Aucune cause. La page Solidarité sera vide.</p>
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {showCauseForm && (
                    <Modal title="Ajouter une cause de don" onClose={() => setShowCauseForm(false)}>
                      <AddCauseForm onAdd={async (c) => {
                        const success = await setCauses(prev => [...prev, c]);
                        setShowCauseForm(false);
                        if (success) showToast("Cause ajoutée à la page Solidarité !");
                        else showToast("❌ Erreur de sauvegarde");
                      }} />
                    </Modal>
                  )}
                  {editingItem?.type === 'cause' && (
                    <Modal title="Modifier la cause" onClose={() => setEditingItem(null)}>
                      <AddCauseForm
                        initialData={editingItem.data}
                        onAdd={async (c) => {
                          const success = await setCauses(prev => prev.map(old => old.id === c.id ? c : old));
                          setEditingItem(null);
                          if (success) showToast("Cause mise à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── DONS ── */}
            {activeTab === "dons" && (
              <motion.div key="dons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6 print:hidden">
                  <p className="text-muted-foreground text-sm">Historique des dons enregistrés.</p>
                  <button onClick={() => setShowDonForm(true)}
                    className="gradient-primary border border-white/10 text-white shadow-[0_0_15px_rgba(149,27,101,0.2)] hover:shadow-[0_0_25px_rgba(149,27,101,0.4)] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Plus size={16} />Enregistrer un don
                  </button>
                </div>

                <div className="glass-panel p-6 mb-6 print:border-none print:shadow-none print:p-0">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold mb-1">Collecte Annuelle (Progressive)</p>
                      <p className="font-heading font-bold text-2xl text-primary">{Math.round((CAMPAIGN_BASE_AMOUNT + totalDons) / 1000)}k FCFA <span className="text-sm font-normal text-gray-400">/ {Math.round(CAMPAIGN_GOAL / 1000)}k</span></p>
                    </div>
                    <button onClick={() => window.print()} className="btn-vibrant-blue px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 print:hidden">
                      <Printer size={16} /> Rapport PDF / Imprimer
                    </button>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden mt-4 print:hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, ((CAMPAIGN_BASE_AMOUNT + totalDons) / CAMPAIGN_GOAL) * 100)}%` }} />
                  </div>
                </div>

                <div className="glass-panel overflow-hidden print:border-none print:shadow-none">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="glass-table-head text-left">
                        {["Donateur", "Montant", "Cause", "Mode", "Date", "Statut", ""].map(h => (
                          <th key={h} className="px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody className="divide-y divide-border/20">
                        {dons.map((don) => (
                          <tr key={don.id} className="glass-table-row hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 group cursor-default">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-xs">{don.donateur[0]}</span>
                                </div>
                                <span className="font-medium text-foreground text-sm whitespace-nowrap">{don.donateur}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 font-bold text-primary text-sm whitespace-nowrap">{don.montant.toLocaleString("fr-FR")} FCFA</td>
                            <td className="px-5 py-4 text-muted-foreground text-sm">{don.cause}</td>
                            <td className="px-5 py-4 text-muted-foreground text-sm whitespace-nowrap">{don.mode}</td>
                            <td className="px-5 py-4 text-muted-foreground text-sm whitespace-nowrap">{don.date}</td>
                            <td className="px-5 py-4">
                              <span className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap glass-pill ${don.statut === "reçu" ? "bg-green-500/20 text-green-300 border-green-500/30" : don.statut.includes("attente") ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}`}>
                                {don.statut}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex gap-1 justify-end">
                                <button onClick={() => setEditingItem({ type: 'don', data: don })}
                                  className="p-2 rounded-lg btn-vibrant-orange"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button onClick={async () => {
                                    const success = await setDons(prev => prev.filter(d => d.id !== don.id));
                                    if (success) showToast("Don supprimé");
                                    else showToast("❌ Erreur de suppression");
                                  }}
                                  className="p-2 rounded-lg btn-vibrant-red"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {dons.length === 0 && (
                          <tr><td colSpan={7} className="px-5 py-16 text-center text-muted-foreground">Aucun don enregistré.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <AnimatePresence>
                  {showDonForm && <Modal title="Enregistrer un don" onClose={() => setShowDonForm(false)}><AddDonForm causes={causes} onAdd={async (d) => {
                        const success = await setDons(prev => [d, ...prev]);
                        setShowDonForm(false);
                        if (success) showToast("Don enregistré !");
                        else showToast("❌ Erreur d'enregistrement");
                      }} /></Modal>}
                  {editingItem?.type === 'don' && (
                    <Modal title="Modifier le don" onClose={() => setEditingItem(null)}>
                      <AddDonForm
                        causes={causes}
                        initialData={editingItem.data}
                        onAdd={async (d) => {
                          const success = await setDons(prev => prev.map(old => old.id === d.id ? d : old));
                          setEditingItem(null);
                          if (success) showToast("Don mis à jour !");
                          else showToast("❌ Erreur de sauvegarde");
                        }}
                      />
                    </Modal>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── MOT DE PASSE ── */}
            {activeTab === "mot-de-passe" && (
              <motion.div key="mdp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md">
                <div className="glass-panel p-8">
                  <Shield className="text-primary mb-4" size={32} />
                  <h2 className="font-heading font-bold text-foreground text-xl mb-2">Modifier le mot de passe</h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Pour changer les identifiants de connexion, modifiez les constantes <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ADMIN_USER</code> et <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ADMIN_PASS</code> dans le fichier <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">src/pages/admin/AdminLogin.tsx</code>.
                  </p>
                  <div className="glass-panel !rounded-xl p-4 text-sm font-mono text-foreground space-y-1">
                    <p><span className="text-blue-500">const</span> ADMIN_USER = <span className="text-green-600">"admin"</span>;</p>
                    <p><span className="text-blue-500">const</span> ADMIN_PASS = <span className="text-green-600">"espoir2026"</span>;</p>
                  </div>
                  <div className="mt-4 glass-panel !rounded-xl p-4 text-amber-400 dark:text-amber-300 text-sm border-amber-500/20">
                    ⚠️ N'oubliez pas de relancer le serveur après modification.
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* ── PRINTABLE SECTION (Hidden on screen) ── */}
          <div className="hidden print:block fixed inset-0 bg-white p-10 z-[100] text-black">
            <div className="flex justify-between items-start border-b-4 border-primary pb-8 mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                  <Shield size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="font-heading text-4xl font-bold text-gray-900">OUWAR MARAYU</h1>
                  <p className="text-primary font-bold tracking-widest text-sm uppercase">Ensemble, on bâtit l'espoir</p>
                </div>
              </div>
              <div className="text-right text-gray-500 text-sm">
                <p className="font-bold text-gray-800">Rapport d'activité</p>
                <p>Édité le {new Date().toLocaleDateString("fr-FR")}</p>
                <p>Niamey, Niger</p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                Dons reçus - Campagne 2026
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-y border-gray-200">
                    <th className="px-4 py-3 text-left font-bold text-sm">Donateur</th>
                    <th className="px-4 py-3 text-left font-bold text-sm">Montant</th>
                    <th className="px-4 py-3 text-left font-bold text-sm">Cause / Destination</th>
                    <th className="px-4 py-3 text-left font-bold text-sm">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-sm">Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dons.map(don => (
                    <tr key={don.id}>
                      <td className="px-4 py-3 text-sm font-medium">{don.donateur}</td>
                      <td className="px-4 py-3 text-sm font-bold text-primary">{don.montant.toLocaleString("fr-FR")} FCFA</td>
                      <td className="px-4 py-3 text-sm">{don.cause}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{don.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{don.mode}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold border-t-2 border-primary">
                    <td className="px-4 py-4 text-right" colSpan={1}>TOTAL RÉCOLTÉ :</td>
                    <td className="px-4 py-4 text-primary text-lg" colSpan={4}>{totalDons.toLocaleString("fr-FR")} FCFA</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-20 pt-10 border-t border-dashed border-gray-300 grid grid-cols-2 gap-10">
              <div className="text-sm text-gray-500">
                <p className="font-bold text-gray-800 mb-2 underline">Signature Admin</p>
                <div className="h-20 border border-gray-100 rounded-xl bg-gray-50/50 mt-2" />
              </div>
              <div className="space-y-3 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <p className="font-heading font-bold text-primary mb-1">À propos de Ouwar Marayu</p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Ouwar Marayu est une association à but non lucratif dédiée à l'amélioration des conditions de vie des familles vulnérables de Niamey à travers des actions concrètes de secours alimentaire, de santé et d'éducation.
                </p>
                <div className="pt-2 flex items-center gap-4 text-[10px] text-gray-400 font-bold">
                  <span>WWW.OUWARMARAYU.ORG</span>
                  <span>+227 XX XX XX XX</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-panel px-5 py-4"
          >
            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
            <span className="text-gray-800 font-medium text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default AdminDashboard;
