import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlassBackground from "./GlassBackground";

const Layout = ({ children }: { children: ReactNode }) => (
  <GlassBackground>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  </GlassBackground>
);

export default Layout;
