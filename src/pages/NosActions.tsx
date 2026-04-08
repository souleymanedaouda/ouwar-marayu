import { Package, BookOpen, Users, TrendingUp, HandHeart, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import repasImg from "@/assets/1000-repas.jpg.jpg";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

const actions = [
  {
    icon: Package,
    title: "Distribution de vivres et kits alimentaires",
    desc: "Nous distribuons régulièrement des colis alimentaires aux familles les plus démunies, notamment lors du mois de Ramadan et des périodes de soudure. Ces kits comprennent riz, mil, huile, sucre et autres denrées essentielles.",
  },
  {
    icon: BookOpen,
    title: "Soutien à la scolarisation des orphelins",
    desc: "Nous finançons les frais de scolarité, les fournitures scolaires et les uniformes pour permettre aux orphelins et enfants vulnérables de poursuivre leur éducation, clé d'un avenir meilleur.",
  },
  {
    icon: Users,
    title: "Aide aux familles vulnérables",
    desc: "Nous accompagnons les veuves et les familles en difficulté à travers un soutien matériel, moral et administratif. Notre objectif est de renforcer leur résilience face aux épreuves de la vie.",
  },
  {
    icon: TrendingUp,
    title: "Autonomisation économique",
    desc: "Nous mettons en place des programmes de formation et de micro-projets pour permettre aux femmes et aux jeunes de générer leurs propres revenus et de gagner en autonomie.",
  },
  {
    icon: HandHeart,
    title: "Actions communautaires et campagnes solidaires",
    desc: "Nous organisons des campagnes de sensibilisation, des journées solidaires et des événements communautaires pour renforcer le tissu social et mobiliser les bonnes volontés.",
  },
];

const specialProjects = [
  {
    title: "Projet Taimako da Yanci",
    desc: "Un programme majeur d'autonomisation et d'accompagnement visant à offrir aux femmes ainsi qu'aux jeunes les outils nécessaires pour acquérir leur indépendance financière et sociale. À travers cette initiative, Ouwar Marayu déploie des formations ciblées et des accompagnements de proximité pour transformer durablement leur quotidien.",
    image: "https://placehold.co/800x500/951B65/ffffff?text=Taimako+da+Yanci",
    date: "Projet en cours",
  },
  {
    title: "Initiative « 1000 et Un repas aux nécessiteux »",
    desc: "Lancée avec succès pendant le mois béni de Ramadan, cette action de grande envergure a permis de préparer et de distribuer des centaines de repas chauds. Chaque soir, nos équipes se sont mobilisées pour apporter réconfort, joie et dignité aux personnes les plus démunies lors de la rupture du jeûne.",
    image: repasImg,
    date: "Ramadan",
  }
];

const NosActions = () => {
  const { t } = useTranslation();
  return (
  <>
    <section className="relative gradient-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.span
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="text-primary-foreground/70 text-sm uppercase tracking-widest mb-4 block font-semibold"
        >
          {t("Notre impact")}
        </motion.span>
        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {t("Nos Actions")}
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t("Découvrez les différents axes d'intervention d'Ouwar Marayu au Niger.")}
        </motion.p>
      </div>
    </section>

    <section className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <div className="space-y-8">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
              className={`group flex flex-col md:flex-row gap-8 items-start glass-card p-8 md:p-10 bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-16 h-16 rounded-2xl glass-icon-bubble flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <action.icon className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-3 text-foreground">{t(action.title)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(action.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Special Projects / Flagships Section */}
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">{t("Nos Réalisations")}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">{t("Projets Phares & Récents")}</h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto mb-8">
            {t("Découvrez nos initiatives les plus importantes qui marquent notre engagement sur le terrain.")}
          </motion.p>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="space-y-16 lg:space-y-24 max-w-6xl mx-auto">
          {specialProjects.map((project, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
              className={`flex flex-col lg:flex-row gap-10 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group border-[4px] border-white/40 dark:border-white/5">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 glass-panel px-4 py-1.5 !rounded-full bg-white/90 dark:bg-black/80 flex items-center gap-2 text-sm font-bold text-primary shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {t(project.date)}
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  {t(project.title)}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t(project.desc)}
                </p>
                <Link 
                  to="/galerie" 
                  className="inline-flex items-center gap-3 text-primary font-bold text-base uppercase tracking-widest border-b-2 border-primary/30 pb-2 hover:border-primary transition-all mt-4"
                >
                  {t("Voir toutes les photos")}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="relative gradient-primary text-primary-foreground py-24 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-foreground/5 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-foreground/5 rounded-full" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("Vous souhaitez contribuer ?")}
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">
            {t("Votre soutien permet de financer ces actions et de transformer des vies.")}
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              to="/solidarite"
              className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300"
            >
              <Heart size={20} />
              {t("Soutenir nos actions")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
  );
};

export default NosActions;
