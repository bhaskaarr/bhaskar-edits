import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Premiere Pro", level: 95 },
  { name: "After Effects", level: 88 },
  { name: "CapCut", level: 82 },
  { name: "Alight Motion", level: 75 },
  { name: "DaVinci Resolve", level: 68 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            The <span className="gradient-text">Toolkit.</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Industry-standard tools, used to deliver agency-grade work.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto glass-card glow-border rounded-2xl p-8 md:p-12 space-y-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg md:text-xl font-semibold text-foreground">
                  {skill.name}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 + 0.8 }}
                  className="font-mono text-sm text-primary font-bold"
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="relative h-3 w-full rounded-full bg-secondary/40 overflow-hidden backdrop-blur-sm border border-border/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: i * 0.12 + 0.2, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-accent shadow-[0_0_20px_hsl(174_72%_52%/0.6)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
