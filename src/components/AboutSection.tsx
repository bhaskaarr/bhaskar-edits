import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    num: "01",
    title: "Growth First",
    text: "Every cut is engineered for retention, watch-time, and conversion — not just polish.",
  },
  {
    num: "02",
    title: "Fast & Reliable",
    text: "First drafts in 24–72 hours. Clear updates. No ghosting, no missed deadlines.",
  },
  {
    num: "03",
    title: "Premium Craft",
    text: "Cinematic color, clean sound, sharp pacing. Edits that look and feel high-end.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label mb-4">About / 005</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            A QUIET EDGE<br />
            <span className="text-primary">IN A LOUD FEED.</span>
          </h2>
          <p className="text-foreground/70 mt-8 text-lg leading-relaxed max-w-lg">
            I'm <span className="text-gold">Bhaskar</span> — a video editor for creators, founders, and
            brands who care about how their content actually performs. Not just how it looks.
          </p>
          <p className="text-foreground/60 mt-5 leading-relaxed max-w-lg">
            From short-form hooks to long-form YouTube and brand films — every frame is crafted to
            hold attention, build trust, and turn viewers into customers.
          </p>

          <a
            href="https://wa.me/919315219956"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 px-7 py-4 bg-primary text-primary-foreground font-display tracking-[0.2em] text-sm uppercase hover:bg-gold hover:text-background transition-colors"
          >
            Start Your Project →
          </a>
        </motion.div>

        <div className="space-y-[2px] bg-foreground/[0.08]">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-[#0a0a0a] p-7 flex gap-6 group hover:bg-[#0f0f0f] transition-colors"
            >
              <span className="font-display text-5xl text-primary/60 group-hover:text-primary transition-colors leading-none">
                {p.num}
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-wide">{p.title}</h3>
                <p className="text-foreground/60 mt-2 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
