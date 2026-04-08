import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Package, TrendingUp, HandHeart, ArrowRight, Shield, Eye, Sparkles, Quote, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useData } from "@/hooks/useData";
import heroImg from "@/assets/hero-children.jpg";
import founderField from "@/assets/founder-field.jpg";
import teamDistribution from "@/assets/team-distribution.jpg";

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

const actions = [
  { icon: Package, title: "Distribution de vivres", desc: "Kits alimentaires pour les familles les plus vulnérables du Niger." },
  { icon: BookOpen, title: "Scolarisation", desc: "Soutien à l'éducation des orphelins et enfants démunis." },
  { icon: Users, title: "Aide aux familles", desc: "Accompagnement des veuves et familles en situation précaire." },
  { icon: TrendingUp, title: "Autonomisation", desc: "Appui à l'autonomisation économique des communautés." },
  { icon: HandHeart, title: "Actions solidaires", desc: "Campagnes communautaires et initiatives de solidarité." },
  { icon: Stethoscope, title: "Santé & Soins", desc: "Prise en charge médicale et distribution de kits de premiers soins pour les plus démunis." },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "Agir avec empathie envers chaque personne." },
  { icon: Eye, title: "Transparence", desc: "Rendre compte de chaque action et don reçu." },
  { icon: Shield, title: "Dignité", desc: "Respecter la dignité de chaque bénéficiaire." },
  { icon: Sparkles, title: "Espoir", desc: "Offrir un avenir meilleur aux plus vulnérables." },
];

const Index = () => {
  const { t } = useTranslation();
  const { activites, dons } = useData();

  const totalBeneficiaires = activites.reduce((s, a) => s + a.beneficiaires, 0);
  const liveDonsCount = dons.filter(d => d.statut === "reçu").length;

  const stats = [
    { value: `+${500 + totalBeneficiaires}`, label: t("Bénéficiaires aidés"), icon: Users },
    { value: `+${200 + liveDonsCount}`, label: t("Dons enregistrés"), icon: Heart },
    { value: `+${50 + activites.length}`, label: t("Actions réalisées"), icon: Sparkles },
    { value: "+5", label: t("Années d'engagement"), icon: Shield },
  ];

  return (
    <div className="relative">
      {/* Hero Section - Restored to Balanced Version */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover grayscale-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-[-5vh] overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/20 rounded-full px-5 py-2 mb-8 shadow-xl"
          >
            <Heart size={18} className="text-primary-foreground" />
            <span className="text-primary-foreground/90 text-base md:text-lg font-medium tracking-wide">{t("Organisation humanitaire · Niamey, Niger")}</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-heading text-[8vw] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg flex flex-col items-center"
          >
            <span className="whitespace-nowrap">{t("Parce que chaque enfant")}</span>
            <span className="italic font-medium opacity-90 text-primary-foreground/90">{t("mérite espoir et dignité")}</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-white/85 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 font-body leading-relaxed font-light drop-shadow-md"
          >
            {t("Ouwar Marayu œuvre au Niger pour redonner le sourire aux orphelins, aux veuves et aux familles vulnérables.")}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-12"
          >
            <Link
              to="/solidarite"
              className="group glass-btn px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-bold rounded-xl flex items-center justify-center gap-2 md:gap-3 shadow-2xl whitespace-nowrap whitespace-normal-sm"
            >
              <Heart size={20} className="fill-current shrink-0" />
              <span className="whitespace-nowrap">{t("nav.donate")}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
            <Link
              to="/a-propos"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              {t("notre mission")}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-white/60 rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </section>

      {/* Impact Stats - Kept Modern but Integrated */}
      <section className="relative py-20 z-20">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={i}
                className="text-center group flex flex-col items-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/10 shadow-lg shrink-0">
                  <stat.icon size={22} className="text-white md:size-24" />
                </div>
                <div className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 tracking-tight text-white leading-none">{stat.value}</div>
                <div className="text-white/70 text-[10px] md:text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section - Kept Asymmetrical Editorial Layout (User liked this!) */}
      <section className="py-24 md:py-32 overflow-hidden bg-background/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative lg:w-1/2"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                   src={founderField} 
                  alt="Founder" 
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10" />
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass-card p-6 md:p-8 rounded-3xl shadow-2xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <Heart size={28} />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black text-foreground">+5 ans</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-bold tracking-widest uppercase">Engagement</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text Side */}
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left relative z-10 w-full">
              <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">Notre Histoire</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
                  Une Mission <br /> <span className="text-gradient">Portée par le Cœur</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full mt-6 mx-auto lg:mx-0" />
              </motion.div>

              <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t("Fondée par Mme Maïmouna Modi Abdoulaye, Ouwar Marayu est une organisation humanitaire nigérienne dédiée à l'accompagnement des orphelins, des veuves et des familles vulnérables.")}
                </p>
                <p>
                  {t("Chaque jour, notre équipe se mobilise sur le terrain pour apporter aide, dignité et espoir à ceux qui en ont le plus besoin. Notre action s'étend à travers tout le Niger.")}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Link 
                  to="/a-propos" 
                  className="group inline-flex items-center gap-3 text-foreground font-bold text-base uppercase tracking-widest border-b-2 border-primary/30 pb-2 hover:border-primary transition-all"
                >
                  {t("En savoir plus")}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-primary" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-32 bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">{t("Nos Valeurs")}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">{t("Ce qui nous guide")}</h2>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group glass-card p-10 text-center bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <v.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{t(v.title)}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-medium">{t(v.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">{t("nav.actions")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">{t("Nous agissons sur plusieurs fronts pour transformer la vie des plus vulnérables.")}</p>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto mt-8" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative glass-card p-10 overflow-hidden bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="relative z-10 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-primary mb-8 mx-auto sm:mx-0 group-hover:scale-110 transition-transform">
                    <action.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{t(action.title)}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-sm">{t(action.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/nos-actions" 
              className="glass-btn px-10 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto max-w-fit shadow-xl hover:scale-105 transition-all"
            >
              {t("Voir toutes nos actions")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Quote Style */}
      <section className="py-24 md:py-32 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">{t("Témoignages")}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">{t("Ils témoignent")}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Grâce à Ouwar Marayu, mes enfants ont pu reprendre le chemin de l'école. Je ne pourrai jamais assez les remercier.", author: "Fatima", role: "Mère de 4 orphelins" },
              { text: "L'aide alimentaire reçue pendant le Ramadan a été un vrai soulagement pour toute notre famille.", author: "Amadou", role: "Bénéficiaire" },
              { text: "L'engagement de Mme Maïmouna est exemplaire. Elle est présente sur le terrain, au plus près des familles.", author: "Ibrahim", role: "Partenaire humanitaire" },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative glass-card p-10 pt-14 text-center md:text-left"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-xl">
                  <Quote size={20} className="text-white" />
                </div>
                <p className="text-muted-foreground italic leading-relaxed mb-8">
                  « {t(testimonial.text)} »
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-6 border-t border-border/30">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t(testimonial.author)}</p>
                    <p className="text-muted-foreground text-xs">{t(testimonial.role)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold but Clean */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col items-center gap-6"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              {t("Chaque geste compte. Ensemble, redonnons espoir.")}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-body max-w-2xl mx-auto font-light leading-relaxed">
              {t("Rejoignez Ouwar Marayu dans sa mission. Votre soutien peut changer des vies au Niger.")}
            </p>
            <div className="mt-2">
              <Link 
                to="/solidarite" 
                className="group bg-white text-primary px-12 py-5 rounded-2xl text-xl font-black hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-4 mx-auto max-w-fit"
              >
                <Heart size={24} className="fill-primary" />
                {t("Soutenir Ouwar Marayu")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
