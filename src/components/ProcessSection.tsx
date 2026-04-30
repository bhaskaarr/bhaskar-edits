import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    text: "A quick 15-min call to understand your brand, goals, and what success looks like.",
  },
  {
    num: "02",
    title: "You Send Footage",
    text: "Drop raw clips, references, and key moments. I handle the rest — no back-and-forth.",
  },
  {
    num: "03",
    title: "First Cut In 48h",
    text: "You get a polished first draft fast — paced for retention, built for your audience.",
  },
  {
    num: "04",
    title: "Refine & Deliver",
    text: "Two free revision rounds, then final delivery in every format you need.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="section-label mb-4">Process / 003</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            FROM BRIEF TO<br />
            <span className="text-primary">FINAL CUT.</span>
          </h2>
          <p className="text-foreground/60 mt-6 text-lg">
            A simple, four-step workflow built for speed, clarity, and zero stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-foreground/[0.08]">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0a0a0a] p-7 group hover:bg-[#0f0f0f] transition-colors relative"
            >
              <div className="font-display text-6xl text-primary/70 group-hover:text-primary transition-colors leading-none">
                {s.num}
              </div>
              <h3 className="font-display text-2xl tracking-wide mt-6">{s.title}</h3>
              <p className="text-foreground/60 mt-3 leading-relaxed text-sm">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
