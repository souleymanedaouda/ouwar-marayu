import { Package, BookOpen, Users, TrendingUp, HandHeart, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    color: "bg-primary/10",
  },
  {
    icon: BookOpen,
    title: "Soutien à la scolarisation des orphelins",
    desc: "Nous finançons les frais de scolarité, les fournitures scolaires et les uniformes pour permettre aux orphelins et enfants vulnérables de poursuivre leur éducation, clé d'un avenir meilleur.",
    color: "bg-warm/10",
  },
  {
    icon: Users,
    title: "Aide aux familles vulnérables",
    desc: "Nous accompagnons les veuves et les familles en difficulté à travers un soutien matériel, moral et administratif. Notre objectif est de renforcer leur résilience face aux épreuves de la vie.",
    color: "bg-accent",
  },
  {
    icon: TrendingUp,
    title: "Autonomisation économique",
    desc: "Nous mettons en place des programmes de formation et de micro-projets pour permettre aux femmes et aux jeunes de générer leurs propres revenus et de gagner en autonomie.",
    color: "bg-primary/10",
  },
  {
    icon: HandHeart,
    title: "Actions communautaires et campagnes solidaires",
    desc: "Nous organisons des campagnes de sensibilisation, des journées solidaires et des événements communautaires pour renforcer le tissu social et mobiliser les bonnes volontés.",
    color: "bg-warm/10",
  },
];

const NosActions = () => (
  <>
    <section className="relative gradient-primary text-primary-foreground py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.span
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="text-primary-foreground/70 text-sm uppercase tracking-widest mb-4 block font-semibold"
        >
          Notre impact
        </motion.span>
        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Nos Actions
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Découvrez les différents axes d'intervention d'Ouwar Marayu au Niger.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background overflow-hidden">
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
              className={`group flex flex-col md:flex-row gap-8 items-start bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-3">{action.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{action.desc}</p>
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
            Vous souhaitez contribuer ?
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">
            Votre soutien permet de financer ces actions et de transformer des vies.
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              to="/solidarite"
              className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300"
            >
              <Heart size={20} />
              Soutenir nos actions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
);

export default NosActions;
