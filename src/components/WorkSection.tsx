import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";

// Extract a YouTube ID from an embed URL like https://www.youtube.com/embed/VIDEO_ID
const getYouTubeId = (embed: string): string | null => {
  const m = embed.match(/youtube\.com\/embed\/([\w-]+)/);
  return m ? m[1] : null;
};

// Extract a Google Drive file ID from a preview URL
const getDriveId = (embed: string): string | null => {
  const m = embed.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  return m ? m[1] : null;
};

const projects = [
  {
    title: "Podcast Edit",
    category: "Podcast",
    url: "https://drive.google.com/file/d/1hTpGhH9RP9EuZFgqk5V59Ccgv4EYqfnq/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1hTpGhH9RP9EuZFgqk5V59Ccgv4EYqfnq/preview",
  },
  {
    title: "Website Tour",
    category: "Tour",
    url: "https://www.youtube.com/watch?v=LOJvSWsZI8Q",
    embed: "https://www.youtube.com/embed/LOJvSWsZI8Q",
  },
  {
    title: "Documentary Edit",
    category: "Documentary",
    url: "https://www.youtube.com/watch?v=37MUtxSc1Lw",
    embed: "https://www.youtube.com/embed/37MUtxSc1Lw",
  },
  {
    title: "Educational Edit II",
    category: "Education",
    url: "https://drive.google.com/file/d/13HgmbuKbUTHA_08GESHUtOR8b9q1oRMn/view?usp=sharing",
    embed: "https://drive.google.com/file/d/13HgmbuKbUTHA_08GESHUtOR8b9q1oRMn/preview",
  },
  {
    title: "Educational Edit",
    category: "Education",
    url: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/view",
    embed: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/preview",
  },
  {
    title: "Marriage Promo",
    category: "Wedding",
    url: "https://drive.google.com/file/d/1MFQiI9XmZDR7nh7XCmlbnkUL5XY6pVn2/view?usp=drive_link",
    embed: "https://drive.google.com/file/d/1MFQiI9XmZDR7nh7XCmlbnkUL5XY6pVn2/preview",
  },
  {
    title: "SAAS Product Edit",
    category: "SAAS",
    url: "https://drive.google.com/file/d/1IZMqXyT4rH6sIeu0YjZgdPJq-LUMpjPR/view?usp=drive_link",
    embed: "https://drive.google.com/file/d/1IZMqXyT4rH6sIeu0YjZgdPJq-LUMpjPR/preview",
  },
  {
    title: "AI Document Style",
    category: "AI / Docs",
    url: "https://drive.google.com/file/d/1R_tNkNba2Mwy19bE_9fahTp5D862FAqz/view?usp=drive_link",
    embed: "https://drive.google.com/file/d/1R_tNkNba2Mwy19bE_9fahTp5D862FAqz/preview",
  },
  {
    title: "SAAS Video",
    category: "SAAS",
    url: "https://drive.google.com/file/d/1aej8-acTVCGeA5Kf23j3-ofuctZPI-Qa/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1aej8-acTVCGeA5Kf23j3-ofuctZPI-Qa/preview",
  },
  {
    title: "Show Reel",
    category: "Showreel",
    url: "https://drive.google.com/file/d/1IvCqyzh2O_9eyp0DvRuPmSQYupJRaS4Q/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1IvCqyzh2O_9eyp0DvRuPmSQYupJRaS4Q/preview",
  },
  {
    title: "2D Animation",
    category: "Animation",
    url: "https://drive.google.com/file/d/1LYBtS_iU6zg8vb8LRPDt0cAL6A1NQJnU/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1LYBtS_iU6zg8vb8LRPDt0cAL6A1NQJnU/preview",
  },
  {
    title: "Informational",
    category: "Informational",
    url: "https://drive.google.com/file/d/13gzxtE0qxCurBrT6WavicXIb3NOt10DZ/view?usp=sharing",
    embed: "https://drive.google.com/file/d/13gzxtE0qxCurBrT6WavicXIb3NOt10DZ/preview",
  },
  {
    title: "Website Mockup",
    category: "Mockup",
    url: "https://drive.google.com/file/d/1FohRoRiW_LDF1kddkNf9MgOeHClC0ir4/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1FohRoRiW_LDF1kddkNf9MgOeHClC0ir4/preview",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Only mount the iframe when card is near the viewport AND user activates it
  const [shouldMount, setShouldMount] = useState(false);
  const [activated, setActivated] = useState(false);

  // Mount iframe when card enters viewport (slight delay so we don't slam mobile bandwidth)
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShouldMount(true), 150);
    return () => clearTimeout(t);
  }, [isInView]);

  const ytId = project.embed ? getYouTubeId(project.embed) : null;
  const driveId = project.embed ? getDriveId(project.embed) : null;
  const thumb = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null;

  // For YouTube, defer iframe until click (saves a lot on mobile).
  // For Drive (no thumbnail API), mount lazily after entering viewport.
  const showIframe = ytId ? activated : shouldMount;

  const handleClick = (e: React.MouseEvent) => {
    if (ytId && !activated) {
      e.preventDefault();
      setActivated(true);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative block cursor-pointer overflow-hidden border border-foreground/[0.08] bg-[#0a0a0a]"
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {showIframe && project.embed ? (
          <iframe
            src={project.embed}
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            title={project.title}
          />
        ) : thumb ? (
          <img
            src={thumb}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Play className="w-12 h-12 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute top-4 right-4 font-display text-5xl text-foreground/10 leading-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>
        {!showIframe && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 pointer-events-none">
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        )}
      </div>
      <div className="p-5 border-t border-foreground/[0.06]">
        <span className="text-[0.65rem] font-medium text-primary uppercase tracking-[0.3em]">
          {project.category}
        </span>
        <h3 className="font-display text-2xl mt-2 text-foreground group-hover:text-primary transition-colors duration-300 tracking-wide">
          {project.title}
        </h3>
      </div>
      {/* underline */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </motion.a>
  );
};

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            A selection of recent projects showcasing editing style, pacing, and versatility across formats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-foreground/[0.08]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
