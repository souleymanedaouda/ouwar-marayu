import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Package, TrendingUp, HandHeart, ArrowRight, Shield, Eye, Sparkles, Quote, Stethoscope, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "@/hooks/useData";
import heroImg from "@/assets/hero-children.jpg";
import founderField from "@/assets/founder-field.jpg";
import teamDistribution from "@/assets/team-distribution.jpg";
import ramadanCollecte from "@/assets/ramadan-collecte.jpg";

import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};


const actions = [
  { icon: Package, title: "Distribution de vivres", desc: "Kits alimentaires pour les familles les plus vulnérables du Niger.", color: "bg-primary/10" },
  { icon: BookOpen, title: "Scolarisation", desc: "Soutien à l'éducation des orphelins et enfants démunis.", color: "bg-warm/10" },
  { icon: Users, title: "Aide aux familles", desc: "Accompagnement des veuves et familles en situation précaire.", color: "bg-accent" },
  { icon: TrendingUp, title: "Autonomisation", desc: "Appui à l'autonomisation économique des communautés.", color: "bg-primary/10" },
  { icon: HandHeart, title: "Actions solidaires", desc: "Campagnes communautaires et initiatives de solidarité.", color: "bg-warm/10" },
  { icon: Stethoscope, title: "Santé & Soins", desc: "Prise en charge médicale et distribution de kits de premiers soins pour les plus démunis.", color: "bg-accent/80" },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "Agir avec empathie envers chaque personne." },
  { icon: Eye, title: "Transparence", desc: "Rendre compte de chaque action et don reçu." },
  { icon: Shield, title: "Dignité", desc: "Respecter la dignité de chaque bénéficiaire." },
  { icon: Sparkles, title: "Espoir", desc: "Offrir un avenir meilleur aux plus vulnérables." },
];

const testimonials = [
  { text: "Grâce à Ouwar Marayu, mes enfants ont pu reprendre le chemin de l'école. Je ne pourrai jamais assez les remercier.", author: "Fatima", role: "Mère de 4 orphelins" },
  { text: "L'aide alimentaire reçue pendant le Ramadan a été un vrai soulagement pour toute notre famille.", author: "Amadou", role: "Bénéficiaire" },
  { text: "L'engagement de Mme Maïmouna est exemplaire. Elle est présente sur le terrain, au plus près des familles.", author: "Ibrahim", role: "Partenaire humanitaire" },
];

const Index = () => {
  const { activites, dons } = useData();
  const totalBeneficiaires = activites.reduce((s, a) => s + a.beneficiaires, 0);
  const liveDonsCount = dons.filter(d => d.statut === "reçu").length;

  const stats = [
    { value: `${500 + totalBeneficiaires}+`, label: "Bénéficiaires aidés", icon: Users },
    { value: `${200 + liveDonsCount}+`, label: "Dons enregistrés", icon: Heart },
    { value: `${50 + activites.length}+`, label: "Actions réalisées", icon: Sparkles },
    { value: "5", label: "Années d'engagement", icon: Shield },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Enfants du Niger" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
          <div className="absolute inset-0 hero-overlay opacity-60" />
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-warm/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-8"
          >
            <Heart size={14} className="text-primary-foreground" />
            <span className="text-primary-foreground/90 text-sm font-medium">Organisation humanitaire · Niamey, Niger</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground mb-8 leading-[1.1] tracking-tight"
          >
            Parce que chaque enfant
            <br />
            <span className="italic font-medium opacity-90">mérite espoir et dignité</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-primary-foreground/85 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-body leading-relaxed font-light"
          >
            Ouwar Marayu œuvre au Niger pour redonner le sourire aux orphelins, aux veuves et aux familles vulnérables à travers des actions concrètes et durables.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/solidarite"
              className="group gradient-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 inline-flex items-center gap-3"
            >
              <Heart size={20} />
              Faire un don
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/a-propos"
              className="border-2 border-primary-foreground/30 text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all duration-300 backdrop-blur-sm"
            >
              Découvrir notre mission
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">Défiler</span>
          <div className="w-5 h-8 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-primary-foreground/60 rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="relative bg-primary text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-foreground/5 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <stat.icon size={24} className="text-primary-foreground/80" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 tracking-tight">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm md:text-base font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="relative section-padding bg-background overflow-hidden overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
                Notre histoire
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="section-title !mb-6">
                Une mission portée<br />par le cœur
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-primary rounded-full mb-8" />
              <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Fondée par <strong className="text-foreground">Mme Maïmouna Modi Abdoulaye</strong>, Ouwar Marayu est une organisation humanitaire nigérienne
                dédiée à l'accompagnement des orphelins, des veuves et des familles vulnérables.
              </motion.p>
              <motion.p variants={fadeUp} custom={4} className="text-muted-foreground leading-relaxed mb-8">
                Chaque jour, notre équipe se mobilise sur le terrain pour apporter aide, dignité et espoir
                à ceux qui en ont le plus besoin. Notre action s'étend à travers tout le Niger.
              </motion.p>
              <motion.div variants={fadeUp} custom={5}>
                <Link
                  to="/a-propos"
                  className="group inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  En savoir plus
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src={founderField}
                  alt="Mme Maïmouna Modi Abdoulaye sur le terrain"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-accent -z-0" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-primary/15 -z-0" />
              <div className="absolute top-1/2 -left-10 bg-card rounded-xl shadow-xl p-4 z-20 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Heart size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">5 ans</div>
                    <div className="text-muted-foreground text-xs">d'engagement</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 bg-gradient-to-br from-surface via-background to-primary/5 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Ce qui nous guide
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">Nos Valeurs</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="group bg-card rounded-2xl p-8 text-center border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <v.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Preview */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Sur le terrain
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">Nos Actions</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
            <motion.p variants={fadeUp} custom={3} className="section-subtitle mt-4">
              Nous agissons sur plusieurs fronts pour transformer la vie des plus vulnérables.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="group bg-card rounded-2xl p-8 shadow-sm border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{action.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{action.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <Link
              to="/nos-actions"
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
            >
              Voir toutes nos actions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Photo Banner */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <img src={teamDistribution} alt="Distribution sur le terrain" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="container mx-auto px-4"
          >
            <p className="text-primary-foreground/80 text-sm uppercase tracking-widest mb-3">Ensemble sur le terrain</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground max-w-2xl leading-tight">
              Chaque action compte, chaque sourire est une victoire.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Ils témoignent
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">Témoignages</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="relative bg-card rounded-2xl p-8 pt-10 border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -top-5 left-8 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <Quote size={18} className="text-primary-foreground" />
                </div>
                <p className="text-muted-foreground italic leading-relaxed mb-6 text-[15px]">
                  « {t.text} »
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="gradient-primary py-24 md:py-32">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Chaque geste compte.
              <br />
              <span className="italic font-medium opacity-90">Ensemble, redonnons espoir.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Rejoignez Ouwar Marayu dans sa mission. Votre soutien peut changer des vies au Niger.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/solidarite"
                className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300"
              >
                <Heart size={22} />
                Soutenir Ouwar Marayu
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
