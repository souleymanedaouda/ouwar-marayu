import { Heart, Eye, Star, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderPose from "@/assets/founder-pose.jpg";
import notreHistoireImg from "@/assets/notre histoire.jpg";

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const values = [
  { icon: Heart, title: "Compassion", desc: "Chaque action est guidée par l'amour et l'empathie envers les plus vulnérables." },
  { icon: Shield, title: "Dignité", desc: "Nous respectons la dignité de chaque personne que nous accompagnons." },
  { icon: Star, title: "Espoir", desc: "Nous croyons que chaque enfant mérite un avenir meilleur." },
  { icon: Eye, title: "Transparence", desc: "Nous rendons compte de chaque action avec honnêteté et ouverture." },
];

const APropos = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Header */}
      <section className="relative gradient-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.span
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="text-primary-foreground/70 text-sm uppercase tracking-widest mb-4 block font-semibold"
          >
            {t("Qui sommes-nous")}
          </motion.span>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("À propos d'Ouwar Marayu")}
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t("Une organisation humanitaire nigérienne au service des enfants et des familles vulnérables.")}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("Notre raison d'être")}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title !mb-6">{t("Notre Mission")}</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-primary rounded-full mb-8" />
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed mb-4 text-lg">
              {t("Ouwar Marayu est une organisation humanitaire basée à Niamey, Niger, engagée dans l'aide aux orphelins, aux enfants vulnérables, aux veuves et aux familles en situation précaire.")}
            </motion.p>
            <motion.p variants={fadeUp} custom={4} className="text-muted-foreground leading-relaxed mb-4">
              {t("Notre mission est de redonner espoir et dignité à ceux qui en ont le plus besoin, à travers des actions concrètes sur le terrain : distribution de vivres, soutien scolaire, autonomisation économique et accompagnement social.")}
            </motion.p>
            <motion.p variants={fadeUp} custom={5} className="text-muted-foreground leading-relaxed">
              {t("Notre vision est de bâtir un Niger où chaque enfant a accès à l'éducation, à la nourriture et à un environnement protecteur, quel que soit son parcours de vie.")}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={notreHistoireImg}
                alt="Notre Mission"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-accent -z-0" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-primary/15 -z-0" />
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10">
              <img
                src={founderPose}
                alt="Mme Maïmouna Modi Abdoulaye - Fondatrice"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/10 -z-0" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-accent -z-0" />
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("Leadership")}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title !mb-6">{t("La Fondatrice")}</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-primary rounded-full mb-8" />
            <motion.h3 variants={fadeUp} custom={3} className="font-heading text-2xl font-semibold text-primary mb-4">
              {t("Mme Maïmouna Modi Abdoulaye")}
            </motion.h3>
            <motion.p variants={fadeUp} custom={4} className="text-muted-foreground leading-relaxed mb-4">
              {t("Figure engagée et active sur le terrain, Mme Maïmouna Modi Abdoulaye est reconnue pour son dévouement envers les enfants et les familles vulnérables du Niger.")}
            </motion.p>
            <motion.p variants={fadeUp} custom={5} className="text-muted-foreground leading-relaxed mb-4">
              {t("Son parcours est animé par une conviction profonde : chaque enfant orphelin mérite la chance de retrouver l'espoir. C'est cette vision qui l'a poussée à fonder Ouwar Marayu et à consacrer sa vie à cette cause.")}
            </motion.p>
            <motion.p variants={fadeUp} custom={6} className="text-muted-foreground leading-relaxed">
              {t("Présente au quotidien sur le terrain, elle supervise personnellement les distributions, les campagnes de sensibilisation et les programmes de scolarisation mis en place par l'organisation.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("Ce qui nous guide")}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">{t("Nos Valeurs")}</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="group glass-card p-8 text-center bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl glass-icon-bubble flex items-center justify-center mx-auto mb-5 group-hover:border-primary/30 transition-colors">
                  <v.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{t(v.title)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(v.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default APropos;
