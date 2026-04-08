import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpeg";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden">
      {/* Solid Black background for footer */}
      <div className="absolute inset-0 bg-black" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Ouwar Marayu" className="h-12 w-auto rounded-lg shadow-md" />
              <span className="font-heading text-xl font-bold text-white">Ouwar Marayu</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-white">{t("footer.nav_title")}</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/a-propos", label: t("nav.about") },
                { to: "/nos-actions", label: t("nav.actions") },
                { to: "/solidarite", label: t("nav.solidarity") },
                { to: "/notre-equipe", label: t("nav.team") },
                { to: "/galerie", label: t("nav.gallery") },
                { to: "/actualites", label: t("nav.news") },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-white">{t("footer.contact_title")}</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{t("footer.address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>+227 84 82 81 79</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>ouwarmarayou@gmail.com</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-white">{t("footer.support_title")}</h4>
            <p className="text-white/70 text-sm mb-4">
              {t("footer.support_text")}
            </p>
            <Link
              to="/solidarite"
              className="inline-flex items-center gap-2 glass-btn px-5 py-2.5 text-sm font-semibold"
            >
              <Heart size={16} />
              {t("nav.donate")}
            </Link>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ouwar Marayu. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
