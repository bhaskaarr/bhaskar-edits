import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "Edits Engineered For Growth",
  "High-Retention Video Editing",
  "Built To Convert Viewers",
];

const HeroSection = () => {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const target = phrases[phraseIdx];
    let i = 0;
    setText("");
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => setPhraseIdx((p) => (p + 1) % phrases.length), 2400);
      }
    }, 55);
    return () => clearInterval(id);
  }, [phraseIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-16 pb-20 pt-32"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1a0800] to-background" />
      <div className="grain" />
      <div className="scanlines" />
      <div className="absolute inset-0 hero-gradient" />

      {/* Vertical guide lines */}
      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-foreground/[0.05]" />
        ))}
      </div>

      {/* Horizontal scanline */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.6), transparent)",
          animation: "scanlineDrop 5s ease-in-out infinite",
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-24 left-6 md:left-16 w-10 h-10 border-t border-l pointer-events-none"
        style={{ borderColor: "hsl(var(--primary))", animation: "cornerPulse 3s ease-in-out infinite" }}
      />
      <div
        className="absolute top-24 right-6 md:right-16 w-10 h-10 border-t border-r pointer-events-none"
        style={{ borderColor: "hsl(var(--primary))", animation: "cornerPulse 3s 0.5s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 left-6 md:left-16 w-10 h-10 border-b border-l pointer-events-none"
        style={{ borderColor: "hsl(var(--primary))", animation: "cornerPulse 3s 1s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-6 md:right-16 w-10 h-10 border-b border-r pointer-events-none"
        style={{ borderColor: "hsl(var(--primary))", animation: "cornerPulse 3s 1.5s ease-in-out infinite" }}
      />

      <div className="absolute top-24 right-6 md:right-16 font-display text-sm tracking-[0.2em] opacity-30 z-10 hidden md:block">
        © 2026
      </div>

      {/* Availability pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-28 left-6 md:left-16 z-10 inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 bg-primary/10 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-display text-foreground/90">
          Currently accepting new clients
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl">
        <p className="text-[0.75rem] tracking-[0.35em] uppercase text-primary mb-6 min-h-[1em]">
          {text}
          <span className="animate-pulse">|</span>
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display leading-[0.88] text-[clamp(4.5rem,13vw,14rem)]"
        >
          BHASKAR<br />
          <span className="text-primary">EDITS.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-2xl text-lg md:text-xl leading-relaxed mt-8 text-foreground/80"
        >
          Scroll-stopping edits for <span className="text-gold">creators, founders & brands</span> —
          designed to hold attention, drive watch-time, and turn viewers into customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 mt-8"
        >
          <a
            href="https://wa.me/919315219956?text=Hi%20Bhaskar%2C%20I%27d%20like%20to%20book%20a%20free%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-display tracking-[0.2em] text-sm uppercase hover:bg-gold hover:text-background transition-colors duration-300"
          >
            Start Your Project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-foreground/30 text-foreground font-display tracking-[0.2em] text-sm uppercase hover:border-primary hover:text-primary transition-colors duration-300"
          >
            See The Work
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-xs md:text-sm text-foreground/50 mt-5 tracking-wide"
        >
          Trusted by 35+ creators & brands · Reply within 1 hour · 24–48h delivery
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap gap-8 md:gap-14 mt-12 pt-8 border-t border-foreground/10"
        >
          {[
            { num: "50+", label: "Videos Delivered" },
            { num: "35+", label: "Brands Served" },
            { num: "24h", label: "Avg. Turnaround" },
            { num: "200K+", label: "Views Generated" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl text-gold leading-none">{s.num}</div>
              <div className="text-[0.6rem] tracking-[0.15em] uppercase opacity-50 mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase opacity-40">
        <div
          className="w-px h-14 bg-foreground"
          style={{ animation: "scrollPulse 2s infinite" }}
        />
        Scroll
      </div>
    </section>
  );
};

export default HeroSection;
