import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Ouwar Marayu" className="h-12 w-auto rounded" />
            <span className="font-heading text-xl font-bold">Ouwar Marayu</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Parce que chaque enfant orphelin mérite la chance de retrouver l'espoir. Organisation humanitaire basée à Niamey, Niger.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/a-propos", label: "À propos" },
              { to: "/nos-actions", label: "Nos Actions" },
              { to: "/solidarite", label: "Solidarité Permanente" },
              { to: "/notre-equipe", label: "Notre Équipe" },
              { to: "/galerie", label: "Galerie" },
              { to: "/actualites", label: "Actualités" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Niamey, Niger</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <span>+227 XX XX XX XX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <span>contact@ouwarmarayu.org</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Soutenez-nous</h4>
          <p className="text-primary-foreground/70 text-sm mb-4">
            Chaque geste compte. Ensemble, redonnons espoir aux enfants du Niger.
          </p>
          <Link
            to="/solidarite"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Heart size={16} />
            Faire un don
          </Link>
          <div className="flex items-center gap-3 mt-6">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        <p>© {new Date().getFullYear()} Ouwar Marayu. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
