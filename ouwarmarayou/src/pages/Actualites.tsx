import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useActualites, useLoading } from "@/hooks/useData";
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

const Actualites = () => {
  const articles = useActualites();
  const loading = useLoading();

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
            Nos dernières nouvelles
          </motion.span>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Actualités
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Suivez nos dernières interventions et actions sur le terrain.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border h-[400px]">
                   <div className="h-48 bg-muted w-full" />
                   <div className="p-8 space-y-4">
                     <div className="h-4 bg-muted w-1/4 rounded" />
                     <div className="h-6 bg-muted w-3/4 rounded" />
                     <div className="h-4 bg-muted w-full rounded" />
                     <div className="h-4 bg-muted w-5/6 rounded" />
                   </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-lg font-medium">Aucune actualité pour le moment.</p>
              <p className="text-sm mt-2">L'administrateur peut en ajouter depuis l'interface admin.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={scaleIn}
                  custom={i}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={article.imageUrl}
                      alt={article.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x340/f0e6f0/7d3c7d?text=Actualité";
                      }}
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3">{article.titre}</h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{article.extrait}</p>
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      Lire la suite <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Facebook */}
      <section className="section-padding bg-surface overflow-hidden">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Restez connectés
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">Suivez-nous sur Facebook</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="decorative-line" />
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground mb-10 text-lg">
              Retrouvez toutes nos actualités et publications en temps réel sur notre page Facebook.
            </motion.p>
            <motion.div variants={fadeUp} custom={4}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group gradient-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 inline-block text-lg"
              >
                Visiter notre page Facebook
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Actualites;
