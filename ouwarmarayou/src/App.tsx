import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import APropos from "./pages/APropos";
import NosActions from "./pages/NosActions";

import Solidarite from "./pages/Solidarite";
import NotreEquipe from "./pages/NotreEquipe";
import Galerie from "./pages/Galerie";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";
import AdminIndex from "./pages/admin/index";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { DataProvider } from "./hooks/useData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
