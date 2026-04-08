import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderTerrain from "@/assets/founder-terrain.jpg";
import teamDistribution from "@/assets/team-distribution.jpg";
import coordinateurImg from "@/assets/coordinateur.jpg";

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

const teamMembers = [
  {
    name: "Mme Maïmouna Modi Abdoulaye",
    role: "Fondatrice & Directrice Générale",
    image: founderPortrait,
    bio: "Figure engagée et active sur le terrain, reconnue pour son dévouement envers les enfants et les familles vulnérables du Niger.",
  },
  {
    name: "Coordinateur Terrain",
    role: "Responsable des opérations",
    image: coordinateurImg,
    bio: "Assure la coordination des distributions et des interventions d'urgence sur le terrain à travers Niamey et ses environs.",
  },
  {
    name: "Équipe de Distribution",
    role: "Volontaires et agents de terrain",
    image: teamDistribution,
    bio: "Une équipe dévouée qui travaille quotidiennement pour acheminer l'aide aux familles les plus vulnérables.",
  },
];

const NotreEquipe = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative gradient-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="container relative z-10 text-center">
          <motion.span
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="text-primary-foreground/70 text-sm uppercase tracking-widest mb-4 block font-semibold"
          >
            {t("Les visages de l'engagement")}
          </motion.span>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("Notre Équipe")}
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t("Des femmes et des hommes engagés au quotidien pour servir les plus vulnérables.")}
          </motion.p>
        </div>
      </section>

      <section className="section-padding overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                custom={i}
                className="group glass-card overflow-hidden bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{t(member.name)}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{t(member.role)}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(member.bio)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("Rejoignez-nous")}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">{t("Rejoignez notre équipe")}</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground mb-10 text-lg">
              {t("Vous souhaitez vous engager comme bénévole ou collaborer avec Ouwar Marayu ? Contactez-nous pour faire partie de cette belle aventure humaine.")}
            </motion.p>
            <motion.div variants={fadeUp} custom={4}>
              <a
                href="mailto:ouwarmarayou@gmail.com"
                className="group glass-btn px-10 py-4 font-semibold text-lg inline-block"
              >
                {t("Nous contacter")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotreEquipe;
