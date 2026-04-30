import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Youtube, Smartphone, Sparkles, Check } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Short-Form Edits",
    subtitle: "Reels • Shorts • TikTok",
    price: "₹999",
    unit: "/ video",
    features: [
      "Scroll-stopping 3-sec hooks",
      "Punchy captions & sound design",
      "Optimized for the algorithm",
      "24–48h turnaround",
    ],
    accent: false,
  },
  {
    icon: Youtube,
    title: "YouTube Long-Form",
    subtitle: "Vlogs • Podcasts • Tutorials",
    price: "₹4,999",
    unit: "/ video",
    features: [
      "Retention-engineered pacing",
      "B-roll, motion & sound design",
      "Cinematic color + clean audio mix",
      "Click-worthy thumbnail concepts",
    ],
    accent: true,
    badge: "Most Popular",
  },
  {
    icon: Film,
    title: "Brand & Ad Edits",
    subtitle: "SaaS • Promo • Commercial",
    price: "Custom",
    unit: "quote",
    features: [
      "Story-led script collaboration",
      "Cinematic color & sound design",
      "Logo & motion-graphic system",
      "Multi-platform delivery",
    ],
    accent: false,
  },
  {
    icon: Sparkles,
    title: "Motion & AI Content",
    subtitle: "Captions • MoGraph • AI",
    price: "₹1,999",
    unit: "/ project",
    features: [
      "Animated captions & lower-thirds",
      "AI voice & avatar workflows",
      "Custom 2D motion graphics",
      "Signature transitions & FX",
    ],
    accent: false,
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="section-label mb-4">Services / 001</div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
              EDITS BUILT FOR <span className="text-primary">GROWTH</span>
            </h2>
          </div>
          <p className="text-foreground/60 max-w-md text-base">
            Four focused offers. Transparent pricing. Zero fluff. Pick a package or message me for a custom quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-foreground/[0.08]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative p-7 bg-[#0a0a0a] flex flex-col group hover:bg-[#0f0f0f] transition-colors ${
                  s.accent ? "lg:-translate-y-3" : ""
                }`}
              >
                {s.badge && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[0.6rem] tracking-[0.2em] uppercase font-display px-3 py-1">
                    {s.badge}
                  </span>
                )}
                <Icon className={`w-8 h-8 mb-5 ${s.accent ? "text-primary" : "text-gold"}`} />
                <h3 className="font-display text-2xl tracking-wide">{s.title}</h3>
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/40 mt-1">
                  {s.subtitle}
                </p>

                <div className="my-6 pb-6 border-b border-foreground/10">
                  <span className="text-[0.6rem] tracking-[0.2em] uppercase text-foreground/40 block">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-4xl text-foreground">{s.price}</span>
                    <span className="text-xs text-foreground/50">{s.unit}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/70">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/919315219956?text=Hi%20Bhaskar%2C%20I%27m%20interested%20in%20${encodeURIComponent(
                    s.title,
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 font-display tracking-[0.2em] text-xs uppercase transition-colors ${
                    s.accent
                      ? "bg-primary text-primary-foreground hover:bg-gold hover:text-background"
                      : "border border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  Get Started →
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-foreground/50">
            Need a content engine or monthly retainer?{" "}
            <a
              href="https://wa.me/919315219956"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-gold transition-colors underline underline-offset-4"
            >
              Get a custom quote →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
