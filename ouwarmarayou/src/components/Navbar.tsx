import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/nos-actions", label: "Nos Actions" },
  { to: "/solidarite", label: "Solidarité" },
  { to: "/notre-equipe", label: "Notre Équipe" },
  { to: "/galerie", label: "Galerie" },
  { to: "/actualites", label: "Actualités" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Ouwar Marayu" className="h-10 md:h-14 w-auto rounded" />
          <span className="font-heading text-lg md:text-xl font-bold text-primary hidden sm:inline">
            Ouwar Marayu
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/solidarite"
            className="ml-3 gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            💝 Faire un don
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/solidarite"
              onClick={() => setOpen(false)}
              className="mt-2 gradient-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold text-center"
            >
              💝 Faire un don
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
