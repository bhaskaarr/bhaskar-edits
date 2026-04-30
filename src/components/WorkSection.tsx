import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const getYouTubeId = (embed: string): string | null => {
  const m = embed.match(/youtube\.com\/embed\/([\w-]+)/);
  return m ? m[1] : null;
};

// Cinematic gradient palette per category (mirrors the reference HTML)
const G = {
  showreel: "linear-gradient(135deg,#0a0a0a 0%,#1a0500 40%,#3d0900 70%,rgba(255,60,30,0.13) 100%)",
  podcast:  "linear-gradient(160deg,#060610 0%,#0d0d20 50%,#1a1040 100%)",
  saas:     "linear-gradient(135deg,#050510 0%,#0a0a1f 45%,#0f0f30 100%)",
  saas2:    "linear-gradient(135deg,#040814 0%,#08102a 50%,#10183a 100%)",
  edu:      "linear-gradient(150deg,#060a06 0%,#0a1a08 50%,#122012 100%)",
  edu2:     "linear-gradient(150deg,#080a06 0%,#0f1a0a 50%,#182210 100%)",
  wedding:  "linear-gradient(135deg,#120a0a 0%,#2a1010 50%,#3d1515 100%)",
  anim:     "linear-gradient(135deg,#080614 0%,#120e28 50%,#1e163c 100%)",
  ai:       "linear-gradient(135deg,#040810 0%,#080f1e 50%,#0c152c 100%)",
  info:     "linear-gradient(150deg,#060608 0%,#0e0e14 50%,#141420 100%)",
  mockup:   "linear-gradient(135deg,#060810 0%,#0a0e1c 50%,#0e1428 100%)",
  doc:      "linear-gradient(135deg,#0a0a0a 0%,#15100a 50%,#251a10 100%)",
  tour:     "linear-gradient(135deg,#0a0e14 0%,#0e1622 50%,#142036 100%)",
};

type Project = {
  t: string;
  c: string;
  e: string;
  url: string;
  thumb: string;
  icon: string;
  desc: string;
  feat?: boolean;
  tall?: boolean;
};

const PROJECTS: Project[] = [
  { t: "Show Reel",       c: "Showreel",      e: "https://drive.google.com/file/d/1IvCqyzh2O_9eyp0DvRuPmSQYupJRaS4Q/preview", url: "https://drive.google.com/file/d/1IvCqyzh2O_9eyp0DvRuPmSQYupJRaS4Q/view", thumb: G.showreel, icon: "🎬", desc: "My best work across all formats — a cinematic opener.", feat: true },
  { t: "Podcast Edit",    c: "Podcast",       e: "https://drive.google.com/file/d/1hTpGhH9RP9EuZFgqk5V59Ccgv4EYqfnq/preview", url: "https://drive.google.com/file/d/1hTpGhH9RP9EuZFgqk5V59Ccgv4EYqfnq/view", thumb: G.podcast,  icon: "🎙️", desc: "Long-form audio storytelling, paced to perfection.", tall: true },
  { t: "SAAS Product",    c: "SAAS",          e: "https://drive.google.com/file/d/1IZMqXyT4rH6sIeu0YjZgdPJq-LUMpjPR/preview", url: "https://drive.google.com/file/d/1IZMqXyT4rH6sIeu0YjZgdPJq-LUMpjPR/view", thumb: G.saas,     icon: "⚡",  desc: "Clean product demo with motion graphics overlay." },
  { t: "Documentary",     c: "Documentary",   e: "https://www.youtube.com/embed/37MUtxSc1Lw", url: "https://www.youtube.com/watch?v=37MUtxSc1Lw", thumb: G.doc, icon: "🎥", desc: "Narrated documentary cut with atmospheric color grade." },
  { t: "Website Tour",    c: "Tour",          e: "https://www.youtube.com/embed/LOJvSWsZI8Q", url: "https://www.youtube.com/watch?v=LOJvSWsZI8Q", thumb: G.tour, icon: "🌐", desc: "Smooth walkthrough with dynamic transitions." },
  { t: "Education Edit",  c: "Education",     e: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/preview", url: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/view", thumb: G.edu,      icon: "📚", desc: "Engaging educational content for online courses." },
  { t: "Marriage Promo",  c: "Wedding",       e: "https://drive.google.com/file/d/1MFQiI9XmZDR7nh7XCmlbnkUL5XY6pVn2/preview", url: "https://drive.google.com/file/d/1MFQiI9XmZDR7nh7XCmlbnkUL5XY6pVn2/view", thumb: G.wedding,  icon: "💍", desc: "Cinematic wedding film with emotional storytelling." },
  { t: "2D Animation",    c: "Animation",     e: "https://drive.google.com/file/d/1LYBtS_iU6zg8vb8LRPDt0cAL6A1NQJnU/preview", url: "https://drive.google.com/file/d/1LYBtS_iU6zg8vb8LRPDt0cAL6A1NQJnU/view", thumb: G.anim,     icon: "✨", desc: "Frame-by-frame 2D animation with smooth keyframes." },
  { t: "AI Doc Style",    c: "AI / Docs",     e: "https://drive.google.com/file/d/1R_tNkNba2Mwy19bE_9fahTp5D862FAqz/preview", url: "https://drive.google.com/file/d/1R_tNkNba2Mwy19bE_9fahTp5D862FAqz/view", thumb: G.ai,       icon: "🤖", desc: "AI-enhanced documentary visual style edit." },
  { t: "Education II",    c: "Education",     e: "https://drive.google.com/file/d/13HgmbuKbUTHA_08GESHUtOR8b9q1oRMn/preview", url: "https://drive.google.com/file/d/13HgmbuKbUTHA_08GESHUtOR8b9q1oRMn/view", thumb: G.edu2,     icon: "📖", desc: "Second educational edit with dynamic lower-thirds." },
  { t: "SAAS Video",      c: "SAAS",          e: "https://drive.google.com/file/d/1aej8-acTVCGeA5Kf23j3-ofuctZPI-Qa/preview", url: "https://drive.google.com/file/d/1aej8-acTVCGeA5Kf23j3-ofuctZPI-Qa/view", thumb: G.saas2,    icon: "💻", desc: "SaaS explainer video with branded motion." },
  { t: "Informational",   c: "Informational", e: "https://drive.google.com/file/d/13gzxtE0qxCurBrT6WavicXIb3NOt10DZ/preview", url: "https://drive.google.com/file/d/13gzxtE0qxCurBrT6WavicXIb3NOt10DZ/view", thumb: G.info,     icon: "📊", desc: "Clean informational content with text animations." },
  { t: "Website Mockup",  c: "Mockup",        e: "https://drive.google.com/file/d/1FohRoRiW_LDF1kddkNf9MgOeHClC0ir4/preview", url: "https://drive.google.com/file/d/1FohRoRiW_LDF1kddkNf9MgOeHClC0ir4/view", thumb: G.mockup,   icon: "🖥️", desc: "Screen recording with smooth transition effects." },
];

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ytId = getYouTubeId(project.e);
  const ytThumb = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null;

  // Mouse-tracked glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${mx}%`);
    e.currentTarget.style.setProperty("--my", `${my}%`);
  };

  const span =
    project.feat
      ? "md:col-span-2 md:row-span-2"
      : project.tall
      ? "md:row-span-2"
      : "";

  const minH = project.feat ? "min-h-[520px]" : project.tall ? "min-h-[440px]" : "min-h-[260px]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.05 }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden cursor-pointer bg-[#0d0d0d] border border-foreground/[0.06] ${span} ${minH}`}
    >
      {/* Thumbnail layer */}
      {ytThumb ? (
        <div
          className="absolute inset-0 transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-[0.18] group-hover:saturate-[0.3]"
          style={{
            backgroundImage: `url(${ytThumb}), linear-gradient(135deg,#050508,#12101a)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-[0.25]"
            style={{ background: project.thumb }}
          />
          {/* Drive: emoji + category label centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.22] z-[1]">
            <div
              className="grayscale"
              style={{ fontSize: project.feat ? "5.5rem" : "3.2rem", lineHeight: 1 }}
            >
              {project.icon}
            </div>
            <div
              className="font-display tracking-[0.35em] text-foreground/60 mt-3"
              style={{ fontSize: project.feat ? "1rem" : "0.7rem" }}
            >
              {project.c.toUpperCase()}
            </div>
          </div>
        </>
      )}

      {/* Dark overlay (intensifies on hover) */}
      <div className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-background via-background/40 to-transparent group-hover:from-background group-hover:via-background/70" />

      {/* Top gradient bar (red→gold), animates in on hover */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-[hsl(var(--gold))] scale-x-0 origin-left transition-transform duration-[550ms] group-hover:scale-x-100 z-[6]" />

      {/* Mouse glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(var(--primary) / 0.12) 0%, transparent 55%)",
        }}
      />

      {/* Index number */}
      <div
        className={`absolute top-4 right-5 font-display leading-none text-foreground pointer-events-none z-[1] ${
          project.feat ? "text-[9rem] opacity-[0.035]" : "text-[5rem] opacity-[0.05]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Category tag */}
      <div className="absolute top-4 left-5 z-[3] text-[0.55rem] tracking-[0.32em] uppercase text-foreground/70 border border-foreground/15 px-2.5 py-1 group-hover:text-primary group-hover:border-primary transition-colors duration-300">
        {project.c}
      </div>

      {/* Center play button */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/30 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-all duration-500 group-hover:border-primary group-hover:scale-110 z-[4] ${
          project.feat ? "w-20 h-20" : "w-14 h-14"
        }`}
      >
        <Play
          className={`text-primary ${project.feat ? "w-7 h-7 ml-1" : "w-5 h-5 ml-0.5"}`}
          fill="currentColor"
        />
      </div>

      {/* Bottom content */}
      <div className={`absolute bottom-0 left-0 right-0 z-[3] ${project.feat ? "p-8" : "p-5"}`}>
        <div className="text-[0.55rem] tracking-[0.38em] uppercase text-primary mb-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.c}
        </div>
        <h3
          className={`font-display tracking-wide leading-[1.05] text-foreground transition-transform duration-500 ${
            project.feat ? "text-4xl md:text-5xl" : "text-2xl"
          }`}
        >
          {project.t}
        </h3>
        <p className="text-[0.78rem] text-foreground/55 leading-relaxed mt-1 max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-400">
          {project.desc}
        </p>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-[hsl(var(--gold))] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-[5]" />
    </motion.div>
  );
};

const Modal = ({
  open,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onPrev, onNext]);

  const p = PROJECTS[index];

  return (
    <AnimatePresence>
      {open && p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/20 items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/20 items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black border border-foreground/10 overflow-hidden">
              <iframe
                key={p.e}
                src={p.e}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={p.t}
              />
            </div>
            <div className="flex items-center justify-between gap-4 mt-4 px-1">
              <div>
                <div className="text-[0.6rem] tracking-[0.32em] uppercase text-primary mb-1">{p.c}</div>
                <h4 className="font-display text-2xl md:text-3xl tracking-wide">{p.t}</h4>
              </div>
              <div className="text-[0.65rem] tracking-[0.3em] uppercase text-foreground/50 font-display">
                {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const open = useCallback((i: number) => setOpenIdx(i), []);
  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i - 1 + PROJECTS.length) % PROJECTS.length)),
    []
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i + 1) % PROJECTS.length)),
    []
  );

  return (
    <section id="work" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Selected Work / 002</div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            MY <span className="text-primary">WORK</span>
          </h2>
          <p className="text-foreground/60 mt-6 max-w-md text-base">
            A selection of recent projects — showcasing editing style, pacing, and versatility across every format.
          </p>
        </motion.div>

        {/* Bento grid: 3-col on md+, with feat (2x2) and tall (1x2) cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-[2px] bg-foreground/[0.04]">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.t} project={p} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      <Modal
        open={openIdx !== null}
        index={openIdx ?? 0}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
};

export default WorkSection;
