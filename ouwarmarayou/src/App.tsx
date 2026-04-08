import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import APropos from "./pages/APropos";
import NosActions from "./pages/NosActions";

import Solidarite from "./pages/Solidarite";
import NotreEquipe from "./pages/NotreEquipe";
import Galerie from "./pages/Galerie";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";

import { DataProvider } from "./hooks/useData";

// Code Splitting (Lazy Loading) pour le Dashboard Admin
// Cela évite aux visiteurs normaux de télécharger le lourd code de l'administration
const AdminIndex = React.lazy(() => import("./pages/admin/index"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

// Composant de chargement pendant la récupération des gros fichiers
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <ThemeProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Admin routes — outside public Layout (no navbar/footer) */}
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Public routes — inside Layout */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/a-propos" element={<APropos />} />
                    <Route path="/nos-actions" element={<NosActions />} />

                    <Route path="/solidarite" element={<Solidarite />} />
                    <Route path="/notre-equipe" element={<NotreEquipe />} />
                    <Route path="/galerie" element={<Galerie />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Suspense>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
