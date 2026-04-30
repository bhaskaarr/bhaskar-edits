import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How fast can you deliver an edit?",
    a: "Short-form in 24–48 hours. Long-form YouTube and brand edits in 3–5 days. Rush options available.",
  },
  {
    q: "What do you need to start?",
    a: "Just raw footage, a few reference videos, and any key notes. I'll handle direction, pacing, music, and graphics.",
  },
  {
    q: "How many revisions are included?",
    a: "Every project includes two free revision rounds. Most clients only need one — the first cut usually nails it.",
  },
  {
    q: "Do you work with creators outside India?",
    a: "Yes. I work with clients across the US, UK, UAE, and Europe. Payments via UPI, PayPal, or wire transfer.",
  },
  {
    q: "Can I hire you on a monthly retainer?",
    a: "Absolutely. Retainers are the best fit for creators publishing weekly content — better pricing and priority slots.",
  },
];

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label mb-4">FAQ / 008</div>
          <h2 className="font-display text-5xl md:text-6xl leading-[0.9]">
            QUESTIONS,<br />
            <span className="text-primary">ANSWERED.</span>
          </h2>
          <p className="text-foreground/60 mt-6 text-base max-w-md">
            Still unsure? Message me on WhatsApp — I usually reply within an hour.
          </p>
        </motion.div>

        <div className="space-y-[2px] bg-foreground/[0.08]">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#0a0a0a]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-6 flex items-center justify-between gap-6 hover:bg-[#0f0f0f] transition-colors"
              >
                <span className="font-display text-lg md:text-xl tracking-wide">{f.q}</span>
                <Plus
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-400 ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-foreground/70 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
