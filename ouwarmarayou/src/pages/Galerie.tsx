import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePhotos, useLoading } from "@/hooks/useData";
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

const Galerie = () => {
  const photos = usePhotos();
  const loading = useLoading();
  const [selected, setSelected] = useState<number | null>(null);

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
            En images
          </motion.span>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Galerie
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez en images les actions d'Ouwar Marayu sur le terrain.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-2xl" />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-5xl mb-4">📷</p>
              <p className="text-lg font-medium">Aucune photo pour le moment.</p>
              <p className="text-sm mt-2">L'administrateur peut en ajouter depuis l'interface admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, i) => (
                <motion.button
                  key={photo.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={scaleIn}
                  custom={i}
                  onClick={() => setSelected(i)}
                  className="group overflow-hidden rounded-2xl aspect-square border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x400/f0e6f0/7d3c7d?text=Photo";
                    }}
                  />
                  {photo.legende && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium truncate">{photo.legende}</p>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && photos[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={32} />
            </button>
            {photos[selected].legende && (
              <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
                {photos[selected].legende}
              </p>
            )}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={photos[selected].url}
              alt={photos[selected].alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Galerie;
