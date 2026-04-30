import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, Mail, Calendar } from "lucide-react";

const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 93152 19956",
    href: "https://wa.me/919315219956",
    cta: "Chat now",
  },
  {
    icon: Calendar,
    label: "Book a Call",
    value: "Free 15-min discovery",
    href: "https://wa.me/919315219956?text=Hi%20Bhaskar%2C%20I%27d%20like%20to%20book%20a%20free%20call.",
    cta: "Schedule →",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@kidett",
    href: "https://instagram.com/kidett",
    cta: "Follow",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bhaskarpandey200608@gmail.com",
    href: "mailto:bhaskarpandey200608@gmail.com",
    cta: "Send email",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="section-label justify-center mb-4">Contact / 009</div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            BUILD SOMETHING <span className="text-primary">UNFORGETTABLE.</span>
          </h2>
          <p className="text-foreground/60 mt-6 text-lg">
            Only 3 client slots open this month. Pick a channel — I usually reply within an hour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-foreground/[0.08] max-w-6xl mx-auto">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-[#0a0a0a] p-7 group relative overflow-hidden hover:bg-[#0f0f0f] transition-colors"
            >
              <contact.icon className="w-7 h-7 text-primary group-hover:text-gold transition-colors mb-5" />
              <div className="text-[0.6rem] tracking-[0.25em] uppercase text-foreground/50 font-display">
                {contact.label}
              </div>
              <div className="font-display text-xl mt-1 break-words">{contact.value}</div>
              <div className="mt-5 text-xs text-primary group-hover:text-gold transition-colors tracking-wide">
                {contact.cta} →
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 text-muted-foreground text-xs tracking-[0.2em] uppercase"
        >
          © {new Date().getFullYear()} Bhaskar Edits. Built to convert.
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
