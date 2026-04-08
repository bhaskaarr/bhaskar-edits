import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

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
    title: "AI Edit",
    category: "AI / Tech",
    url: "https://drive.google.com/file/d/1JrZZ8kUG5Lh2Kipj7r7cOeLaV3DR5NvU/view",
    embed: "https://drive.google.com/file/d/1JrZZ8kUG5Lh2Kipj7r7cOeLaV3DR5NvU/preview",
  },
  {
    title: "Educational Edit",
    category: "Education",
    url: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/view",
    embed: "https://drive.google.com/file/d/1hyLI7lOhSRTIs_E7qsaKQic5QcTJDH0H/preview",
  },
  {
    title: "Promotional Reel",
    category: "Reel",
    url: "https://www.instagram.com/reel/DUvT_7REjy4/",
    embed: null,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group glass-card glow-border overflow-hidden block cursor-pointer"
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {project.embed ? (
          <iframe
            src={project.embed}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            title={project.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Play className="w-12 h-12 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-5">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display text-lg font-semibold mt-1 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </motion.a>
  );
};

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            A selection of recent projects showcasing my editing style and versatility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
