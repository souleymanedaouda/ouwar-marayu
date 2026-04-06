import { useState, useEffect, useRef } from "react";
import {
  Heart, Package, Users, Star, X, CheckCircle, ChevronRight,
  Sparkles, TrendingUp, Gift, BookOpen, Stethoscope, AlertTriangle, Globe,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useCauses, useDons, useLoading, useData } from "@/hooks/useData";
import { type CauseDon, type Don } from "@/types";

const CAMPAIGN_BASE_AMOUNT = 0;
const CAMPAIGN_BASE_DONORS = 0;
const CAMPAIGN_GOAL = 15000000;
import type { Easing } from "framer-motion";

// icon mapping for causes
const causeIcons: Record<string, React.ElementType> = {
  "Secours Alimentaire": Package,
  "Soutien Éducatif": BookOpen,
  "Accès aux Soins": Stethoscope,
  "Kit Solidarité Complète": Star,
};
const causeColors: Record<string, { bg: string; icon: string }> = {
  "Secours Alimentaire": { bg: "from-amber-500/20 to-orange-500/10", icon: "text-amber-600" },
  "Soutien Éducatif": { bg: "from-blue-500/20 to-indigo-500/10", icon: "text-blue-600" },
  "Accès aux Soins": { bg: "from-primary/20 to-primary/10", icon: "text-primary" },
  "Kit Solidarité Complète": { bg: "from-violet-500/20 to-purple-500/10", icon: "text-violet-600" },
};
function getCauseIcon(nom: string) { return causeIcons[nom] ?? Heart; }
function getCauseColor(nom: string) { return causeColors[nom] ?? { bg: "from-primary/20 to-primary/10", icon: "text-primary" }; }

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};



// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

function CollecteProgress() {
  const dons = useDons();
  const liveDonations = dons.filter(d => d.statut === "reçu").reduce((s, d) => s + d.montant, 0);
  const liveDonorsCount = dons.filter(d => d.statut === "reçu").length;

  const collected = CAMPAIGN_BASE_AMOUNT + liveDonations;
  const totalDonors = CAMPAIGN_BASE_DONORS + liveDonorsCount;
  const goal = CAMPAIGN_GOAL;
  
  const percent = Math.min(100, Math.round((collected / goal) * 100));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { count: countCollected, ref: refCollected } = useCounter(collected);
  const { count: countDonors } = useCounter(totalDonors);

  return (
    <div ref={ref} className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-1">Collecte annuelle 2026</p>
          <p className="font-heading text-2xl font-bold text-foreground">
            <span ref={refCollected}>{countCollected.toLocaleString("fr-FR")}</span> FCFA
          </p>
          <p className="text-muted-foreground text-sm mt-1">sur 15 000 000 FCFA d'objectif</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-heading font-bold text-primary">{percent}%</div>
          <div className="text-muted-foreground text-sm">{countDonors} donateurs</div>
        </div>
      </div>
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(330 70% 35%), hsl(330 55% 55%))" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, delay: 1.8 }}
          className="absolute top-0 bottom-0 w-8 blur-sm rounded-full"
          style={{ left: `${percent - 5}%`, background: "linear-gradient(90deg, transparent, white, transparent)" }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>🌍 Mission permanente</span>
        <span>Objectif : 15 000 000 FCFA</span>
      </div>
    </div>
  );
}

function RecentDonors() {
  const dons = useDons();
  const [visible, setVisible] = useState(0);
  
  // Filtrer les dons reçus et prendre les 6 plus récents pour pouvoir faire du 3 par 3
  const allRecent = dons
    .filter(d => d.statut === "reçu")
    .map(d => ({
      name: d.donateur,
      cause: d.cause,
      time: "récent",
      amount: `${d.montant.toLocaleString("fr-FR")} FCFA`
    }));

  const displayDonors = allRecent.slice(visible * 3, (visible * 3) + 3);

  useEffect(() => {
    if (allRecent.length <= 3) return;
    const maxPages = Math.ceil(allRecent.length / 3);
    const timer = setInterval(() => setVisible((v) => (v + 1) % maxPages), 4500);
    return () => clearInterval(timer);
  }, [allRecent.length]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <h3 className="font-semibold text-sm text-foreground">Dons récents</h3>
      </div>
      <div className="space-y-3 relative overflow-hidden" style={{ minHeight: "240px" }}>
        <AnimatePresence mode="wait">
          {allRecent.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-muted-foreground text-sm"
            >
              En attente des premiers dons... ❤️
            </motion.div>
          ) : (
            <motion.div
              key={visible}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              {displayDonors.map((donor, i) => (
                <div
                  key={`${donor.name}-${i}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 transition-colors hover:bg-muted"
                >
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{donor.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{donor.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{donor.cause} · {donor.time}</p>
                  </div>
                  <span className="text-primary font-bold text-sm flex-shrink-0">{donor.amount}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DonationModal({
  cause,
  customAmount,
  onClose,
  onConfirm,
}: {
  cause: CauseDon | null;
  customAmount: number;
  onClose: () => void;
  onConfirm: (donData: { name: string; phone: string; method: string; amount: number }) => void;
}) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"orange" | "moov" | "virement">("orange");
  const amount = cause ? cause.montant : customAmount;
  const amountLabel = cause ? `${cause.montant.toLocaleString("fr-FR")} FCFA` : `${customAmount.toLocaleString("fr-FR")} FCFA`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setStep("success");
    setTimeout(() => onConfirm({ name, phone, method, amount }), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border overflow-hidden"
      >
        {step === "form" ? (
          <>
            <div className="relative gradient-primary p-6 text-primary-foreground">
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Globe size={22} />
                <span className="font-semibold text-sm opacity-90">Solidarité Permanente</span>
              </div>
              <h3 className="font-heading text-2xl font-bold">{cause ? cause.nom : "Don libre"}</h3>
              <p className="text-primary-foreground/80 text-sm mt-1">{cause ? cause.impact : "Votre contribution compte"}</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
                <Heart size={16} />
                <span className="font-bold text-xl">{amountLabel}</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Votre nom complet *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Moussa Abdoulaye"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Numéro de téléphone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+227 XX XX XX XX"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Mode de paiement</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["orange", "moov", "virement"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        method === m
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {m === "orange" ? "🟠 Orange" : m === "moov" ? "🔵 Moov" : "🏦 Virement"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-muted/60 rounded-xl p-4 text-sm text-muted-foreground">
                {method === "orange" && (
                  <p>📱 Envoyez <strong className="text-foreground">{amountLabel}</strong> au <strong className="text-foreground">+227 96 XX XX XX</strong> via Orange Money, motif : <em>«Solidarité Ouwar Marayu»</em></p>
                )}
                {method === "moov" && (
                  <p>📱 Envoyez <strong className="text-foreground">{amountLabel}</strong> au <strong className="text-foreground">+227 97 XX XX XX</strong> via Moov Money, motif : <em>«Solidarité Ouwar Marayu»</em></p>
                )}
                {method === "virement" && (
                  <p>🏦 Virement bancaire à <strong className="text-foreground">Ouwar Marayu IBAN: NE XX XXXX XXXX XXXX</strong>, référence : <em>«Solidarité 2026»</em></p>
                )}
              </div>
              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart size={20} />
                Confirmer mon don
              </button>
              <p className="text-center text-xs text-muted-foreground">
                🔒 Vos informations sont traitées de manière sécurisée et confidentielle.
              </p>
            </form>
          </>
        ) : (
          <div className="p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle className="text-green-500" size={40} />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold mb-3">Merci pour votre générosité ! 🌍</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Merci <strong className="text-foreground">{name}</strong>, votre intention de don a bien été enregistrée.
            </p>
            <p className="text-sm text-muted-foreground">
              Notre équipe vous contactera pour finaliser le transfert. Ensemble on bâtit l'espoir ! ✨
            </p>
            <div className="mt-6 p-4 bg-muted/60 rounded-xl text-sm">
              <p>❤️ {cause ? cause.nom : "Don libre"}</p>
              <p className="font-bold text-primary mt-1">{amountLabel}</p>
              <p>via {method === "orange" ? "Orange Money" : method === "moov" ? "Moov Money" : "Virement bancaire"}</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ImpactStats() {
  const stats = [
    { icon: Users, label: "Familles soutenues", value: 312, suffix: "+" },
    { icon: Package, label: "Kits distribués", value: 890, suffix: "+" },
    { icon: BookOpen, label: "Enfants scolarisés", value: 145, suffix: "" },
    { icon: TrendingUp, label: "Collecté en 2025", value: 11, suffix: "M FCFA" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const { count, ref } = useCounter(s.value, 1800);
        return (
          <motion.div
            key={i}
            variants={scaleIn}
            custom={i}
            className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <s.icon className="text-primary" size={22} />
            </div>
            <div className="font-heading font-bold text-2xl text-foreground">
              <span ref={ref}>{count.toLocaleString("fr-FR")}</span>{s.suffix}
            </div>
            <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

const Solidarite = () => {
  const causes = useCauses();
  const loading = useLoading();
  const { setDons } = useData();
  const [selectedCause, setSelectedCause] = useState<CauseDon | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDonate = (cause: CauseDon) => {
    setSelectedCause(cause);
    setModalOpen(true);
  };

  const handleCustomDonate = () => {
    if (!customAmount || customAmount < 1000) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant minimum de 1 000 FCFA.",
        variant: "destructive",
      });
      return;
    }
    setSelectedCause(null);
    setModalOpen(true);
  };

  const handleConfirm = (donData: { name: string; phone: string; method: string; amount: number }) => {
    setModalOpen(false);
    
    // On l'enregistre comme reçu pour faire monter la barre immédiatement,
    // ou "en attente" dans un système réel avec validation manuelle.
    // L'utilisateur veut voir sa progression, donc on met "reçu".
    const newDon: Don = {
      id: crypto.randomUUID(),
      donateur: donData.name,
      email: donData.phone, // On met le téléphone dans email si pas de champ tel en DB
      montant: donData.amount,
      cause: selectedCause ? selectedCause.nom : "Don libre",
      mode: donData.method === "orange" ? "Orange Money" : donData.method === "moov" ? "Moov Money" : "Virement",
      statut: "reçu",
      date: new Date().toISOString().split("T")[0]
    };
    
    setDons(prev => [newDon, ...prev]);

    toast({
      title: "Don enregistré ! 🌍",
      description: "Merci pour votre solidarité. Ensemble on bâtit l'espoir !",
    });
  };

  return (
    <>
      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <DonationModal
            cause={selectedCause}
            customAmount={customAmount}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, hsl(330 70% 18%), hsl(330 55% 28%), hsl(280 60% 25%))",
            }}
          />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated blobs */}
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 8, delay: 2 }} className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />

        {/* Floating icons */}
        {["❤️", "🌍", "✨", "🤝", "💫"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
          >
            {emoji}
          </motion.div>
        ))}

        <div className="relative z-10 container mx-auto px-4 py-32 text-left">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Globe size={16} className="text-white" />
            <span className="text-white/90 text-sm font-semibold">Solidarité Permanente · Ouwar Marayu</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
          >
            Ensemble, on bâtit
            <br />
            <span className="italic font-medium opacity-90">l'espoir</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Au-delà des saisons, la solidarité ne s'arrête jamais. Soutenez nos actions pour
            l'alimentation, l'éducation, la santé et le secours d'urgence des familles vulnérables de Niamey.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-start"
          >
            <button
              onClick={() => document.getElementById("causes-section")?.scrollIntoView({ behavior: "smooth" })}
              className="group gradient-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <Heart size={20} />
              Faire un don maintenant
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("progress-section")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm inline-flex items-center gap-2"
            >
              <TrendingUp size={18} />
              Voir notre impact
            </button>
          </motion.div>
        </div>
      </section>

      {/* PROGRESS + STATS */}
      <section id="progress-section" className="section-padding bg-surface overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} custom={0} className="text-center mb-8">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block">Progression annuelle</span>
              <h2 className="section-title">Collecte 2026 en cours</h2>
              <div className="decorative-line" />
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <CollecteProgress />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block">Notre impact en chiffres</span>
              <h2 className="section-title">Ce que vos dons ont permis</h2>
              <div className="decorative-line" />
            </motion.div>
            <ImpactStats />
          </motion.div>
        </div>
      </section>

      {/* CAUSES DE DON */}
      <section id="causes-section" className="section-padding bg-surface overflow-hidden">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block text-center">
              Votre contribution
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title text-center">Comment participer ?</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
            <motion.p variants={fadeUp} custom={3} className="section-subtitle text-center mt-4 mb-12">
              Choisissez une cause ou contribuez librement. Chaque don est un acte de solidarité qui change des vies.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Causes grid */}
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-5">
                {loading ? (
                  [1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-card rounded-2xl p-7 shadow-sm border border-border flex flex-col h-80 animate-pulse">
                      <div className="w-14 h-14 rounded-2xl bg-muted mb-4"></div>
                      <div className="h-6 w-32 bg-muted rounded mb-2"></div>
                      <div className="h-8 w-24 bg-muted rounded mb-4"></div>
                      <div className="w-full flex-1 bg-muted rounded mb-4"></div>
                      <div className="h-12 w-full bg-muted rounded-xl mt-auto"></div>
                    </div>
                  ))
                ) : causes.length === 0 ? (
                  <div className="col-span-2 text-center py-16 text-muted-foreground">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="text-lg font-medium">Aucune cause de don pour le moment.</p>
                  </div>
                ) : causes.map((cause, i) => {
                  const Icon = getCauseIcon(cause.nom);
                  const { bg, icon: iconCls } = getCauseColor(cause.nom);
                  return (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}

                    key={cause.id}
                    variants={scaleIn}
                    custom={i}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`group relative bg-gradient-to-br ${bg} bg-card rounded-2xl p-7 shadow-sm border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer`}
                    onClick={() => handleDonate(cause)}
                  >
                    {cause.badge && (
                      <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                        {cause.badge}
                      </span>
                    )}
                    <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className={iconCls} size={26} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-1">{cause.nom}</h3>
                    <p className="text-primary font-bold text-2xl mb-2">{cause.montant.toLocaleString("fr-FR")} FCFA</p>
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed mb-4">{cause.description}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary/80 bg-primary/10 rounded-lg px-3 py-2 mb-4">
                      <Sparkles size={13} />
                      <span>{cause.impact}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="mt-auto gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Heart size={16} />
                      Soutenir cette cause
                    </motion.button>
                  </motion.div>
                  );
                })}
              </div>

              {/* Custom amount */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-6 bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Gift className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg">Montant libre</h3>
                    <p className="text-muted-foreground text-sm">Donnez le montant de votre choix</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      value={customAmount || ""}
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      placeholder="Ex: 10 000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none bg-background text-foreground placeholder:text-muted-foreground transition-all pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">FCFA</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCustomDonate}
                    className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
                  >
                    <Heart size={16} />
                    Donner
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[5000, 10000, 20000, 30000, 75000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCustomAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                        customAmount === amt
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {amt.toLocaleString("fr-FR")}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <RecentDonors />
              </motion.div>

              {/* Quote */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
              >
                <Heart className="text-primary mb-3" size={24} />
                <p className="text-muted-foreground italic leading-relaxed text-sm mb-4">
                  « L'aide reçue a changé le destin de mes enfants. Ils peuvent maintenant aller à l'école et manger à leur faim. »
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">H</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Halima</p>
                    <p className="text-muted-foreground text-xs">Bénéficiaire, Niamey</p>
                  </div>
                </div>
              </motion.div>

              {/* Emergency alert */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-amber-600" size={20} />
                  <span className="font-semibold text-amber-800 text-sm">Appel d'urgence</span>
                </div>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Des familles déplacées ont besoin d'aide immédiate. Votre don d'urgence est vital.
                </p>
                <button
                  onClick={() => {
                    if (causes.length > 0) { setSelectedCause(causes[0]); setModalOpen(true); }
                  }}
                  className="mt-4 w-full bg-amber-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-amber-700 transition-colors"
                >
                  Aider maintenant
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DONATE */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Nos valeurs
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">Pourquoi donner avec nous ?</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
            <motion.div variants={fadeUp} custom={3} className="grid md:grid-cols-3 gap-6 mt-10 text-left">
              {[
                { icon: "🎯", title: "100% sur le terrain", desc: "Chaque franc est directement investi dans nos actions. Zéro gaspillage administratif." },
                { icon: "📊", title: "Transparence totale", desc: "Rapports financiers disponibles. Vous pouvez suivre l'impact de votre don en temps réel." },
                { icon: "🤝", title: "Ancrage local", desc: "Nos équipes sont des membres de la communauté de Niamey. Ils connaissent les besoins réels." },
              ].map((v, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative gradient-warm text-primary-foreground py-24 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ repeat: Infinity, duration: 8 }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground rounded-full"
        />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ repeat: Infinity, duration: 10, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-foreground rounded-full"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0}>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">
                <Globe className="mx-auto mb-6 opacity-90" size={52} />
              </motion.div>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Chaque don compte.<br />Chaque vie compte.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/85 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Rejoignez les {134}+ donateurs qui font confiance à Ouwar Marayu pour transformer des vies au quotidien.
            </motion.p>
            <motion.button
              variants={fadeUp}
              custom={3}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("causes-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300"
            >
              <Heart size={20} />
              Faire un don maintenant
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Solidarite;
