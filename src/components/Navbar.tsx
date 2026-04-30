import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card glow-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-display text-2xl tracking-[0.15em]">
          BHASKAR<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.7rem] font-display tracking-[0.25em] uppercase text-foreground/60 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/919315219956"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-primary text-primary-foreground font-display tracking-[0.2em] text-xs uppercase hover:bg-gold hover:text-background transition-colors duration-300"
          >
            Start Project
          </a>
        </div>
        <a
          href="https://wa.me/919315219956"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden px-4 py-2 bg-primary text-primary-foreground font-display tracking-[0.2em] text-xs uppercase"
        >
          Start Project
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
