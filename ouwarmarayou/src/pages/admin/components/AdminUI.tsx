import { motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

export const inputCls = "w-full px-3 py-2.5 rounded-xl glass-input text-sm";
export const selectCls = `${inputCls}`;

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 glass-modal-overlay overflow-y-auto"
    >
      <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
        className="glass-modal w-full max-w-lg overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
          <h3 className="font-heading font-bold text-foreground text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full glass-icon-bubble flex items-center justify-center hover:border-primary/30 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5 text-foreground/80">{label}</label>
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, color, sub }: { icon: React.ElementType; label: string; value: string | number; color: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 relative overflow-hidden group bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Lueur d'arrière-plan colorée */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 z-0`} />
      <div className={`absolute -left-10 -bottom-10 w-24 h-24 rounded-full ${color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500 z-0`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <motion.div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}
            whileHover={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <Icon size={26} className="text-white" />
          </motion.div>
          <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase mb-1">{label}</p>
        <p className="font-heading text-3xl font-extrabold text-foreground tracking-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground/80 mt-2 font-medium">{sub}</p>}
      </div>
    </motion.div>
  );
}
