import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
import { dataService } from "@/services/dataService";
import heroImg from "@/assets/hero-children.jpg";
import logo from "@/assets/logo.jpeg";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await dataService.checkAdminAuth(username, password);
    if (success) {
      localStorage.setItem("hb_admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Image with Dark Glassmorphism Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.8]" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-primary/20 mix-blend-multiply" />
        <div className="absolute inset-0 backdrop-blur-[12px]" />
      </div>

      {/* Decorative colored blooms */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-primary/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12, delay: 2, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-accent/30 rounded-full blur-[120px] pointer-events-none"
      />

      <Link to="/" className="absolute top-8 left-8 z-20 text-white/50 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium text-sm tracking-widest uppercase">Retour au site</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="glass-panel p-10 md:p-14 !rounded-[2.5rem] shadow-2xl border-white/10 dark:border-white/5 bg-black/40 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10"
            >
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </motion.div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-2">
              Espace <span className="text-transparent bg-clip-text gradient-primary">Admin</span>
            </h1>
            <p className="text-white/60 font-medium tracking-wide">Interface de gestion sécurisée</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/80 text-xs font-bold tracking-widest uppercase ml-1">Identifiant</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre identifiant"
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-xs font-bold tracking-widest uppercase ml-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all outline-none pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4 text-red-200 text-sm font-medium"
              >
                <Shield size={18} className="text-red-400 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-white py-4 mt-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(149,27,101,0.3)] hover:shadow-[0_0_60px_rgba(149,27,101,0.5)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 border border-white/10"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Lock size={20} />
                  Accéder au tableau de bord
                </>
              )}
            </motion.button>
          </form>
        </div>
        
        <div className="text-center mt-8 text-white/30 text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-4">
           <span>Ouwar Marayu</span>
           <span className="w-1 h-1 rounded-full bg-white/20" />
           <span>2024</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
