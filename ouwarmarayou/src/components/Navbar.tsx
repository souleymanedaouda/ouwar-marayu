import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslation } from "react-i18next";

const getNavLinks = (t: any) => [
  { to: "/", label: t("nav.home") },
  { to: "/a-propos", label: t("nav.about") },
  { to: "/nos-actions", label: t("nav.actions") },
  { to: "/solidarite", label: t("nav.solidarity") },
  { to: "/notre-equipe", label: t("nav.team") },
  { to: "/galerie", label: t("nav.gallery") },
  { to: "/actualites", label: t("nav.news") },
];

const Navbar = () => {
  const { t } = useTranslation();
  const navLinks = getNavLinks(t);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-6 h-16 md:h-20 px-4">
        {/* Left — Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Ouwar Marayu" className="h-10 md:h-14 w-auto rounded-lg shadow-md" />
          <span className="font-heading text-lg md:text-xl font-bold text-foreground hidden sm:inline">
            Ouwar Marayu
          </span>
        </Link>

        {/* Center — Desktop nav + Language Switcher */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary glass-nav-active !rounded-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Right — Theme Toggle + CTA */}
        <div className="hidden xl:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/solidarite"
            className="glass-btn px-5 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {t("nav.donate")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden glass-panel !rounded-none !border-x-0 !border-b border-t border-border/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Drawer header: lang + theme */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/10">
                <LanguageSwitcher compact />
                <ThemeToggle />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "text-primary glass-nav-active"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/solidarite"
                onClick={() => setOpen(false)}
                className="mt-2 glass-btn px-4 py-3 text-sm font-semibold text-center whitespace-nowrap"
              >
                {t("nav.donate")}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
