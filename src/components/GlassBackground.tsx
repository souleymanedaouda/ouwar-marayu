import { ReactNode } from "react";

const GlassBackground = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen bg-background grain-overlay">
    {/* Animated gradient blobs */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 — Primary color */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(330 70% 35% / 0.6) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'blobFloat1 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Blob 2 — Warm/accent color */}
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(35 80% 55% / 0.5) 0%, transparent 70%)',
          filter: 'blur(140px)',
          animation: 'blobFloat2 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      {/* Blob 3 — Lighter primary tint */}
      <div
        className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full opacity-[0.06] dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(330 60% 70% / 0.5) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'blobFloat3 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default GlassBackground;
