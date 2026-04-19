import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CtaVideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Are You Looking For A <span className="gradient-text">Video Editor?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Watch this — and let my edits speak for themselves.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto glass-card glow-border overflow-hidden"
        >
          <div className="relative aspect-video bg-secondary">
            <iframe
              src="https://drive.google.com/file/d/1SGux9eaPnNaV2amORyZoDcyg7GAo5ZV4/preview?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Showreel"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://wa.me/919315219956"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_35px_hsl(174_72%_52%/0.5)] hover:scale-105 transition-all duration-300"
          >
            Hire Me on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaVideoSection;
