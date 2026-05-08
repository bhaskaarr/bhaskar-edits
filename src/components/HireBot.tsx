import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=919315219956&text&type=phone_number&app_absent=0";

const CHIPS = ["Reels", "Ads", "Podcast Clips", "Product Promo", "YouTube Shorts", "Motion Graphics"];

/* ---------------- 3D Robot ---------------- */

const Robot = ({ mouse, hovered }: { mouse: React.MutableRefObject<{ x: number; y: number }>; hovered: boolean }) => {
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const blinkRef = useRef({ next: 2, t: 0 });

  useFrame((state, delta) => {
    if (!head.current || !body.current) return;
    const targetY = mouse.current.x * 0.6;
    const targetX = -mouse.current.y * 0.4;

    head.current.rotation.y += (targetY - head.current.rotation.y) * 0.08;
    head.current.rotation.x += (targetX - head.current.rotation.x) * 0.08;

    body.current.rotation.y += (targetY * 0.3 - body.current.rotation.y) * 0.05;

    // Blink
    blinkRef.current.t += delta;
    if (blinkRef.current.t > blinkRef.current.next) {
      blinkRef.current.t = 0;
      blinkRef.current.next = 2 + Math.random() * 3;
    }
    const blink = blinkRef.current.t < 0.12 ? 0.05 : 1;
    if (eyeL.current) eyeL.current.scale.y = blink;
    if (eyeR.current) eyeR.current.scale.y = blink;
  });

  const eyeColor = hovered ? "#ffd700" : "#ff5a2e";

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group position={[0, -0.3, 0]}>
        {/* Soft shadow */}
        <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial color="#000" transparent opacity={0.35} />
        </mesh>

        {/* Body / chest */}
        <group ref={body} position={[0, -0.7, 0]}>
          <mesh>
            <cylinderGeometry args={[0.42, 0.55, 0.7, 32]} />
            <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Glowing seam */}
          <mesh position={[0, 0.05, 0.42]}>
            <boxGeometry args={[0.28, 0.04, 0.02]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
          {/* Side panels (arms) */}
          <mesh position={[-0.55, 0, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.3]} />
            <meshStandardMaterial color="#222226" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0.55, 0, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.3]} />
            <meshStandardMaterial color="#222226" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.18, 16]} />
          <meshStandardMaterial color="#0e0e12" metalness={0.9} roughness={0.4} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 0.25, 0]}>
          {/* Skull */}
          <mesh>
            <sphereGeometry args={[0.55, 48, 48]} />
            <meshStandardMaterial color="#e8e8ec" metalness={0.95} roughness={0.18} envMapIntensity={1} />
          </mesh>
          {/* Glass visor */}
          <mesh position={[0, 0.02, 0.15]}>
            <sphereGeometry args={[0.46, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
            <meshPhysicalMaterial
              color="#0a0a12"
              metalness={0.5}
              roughness={0.05}
              transmission={0.4}
              thickness={0.5}
              clearcoat={1}
            />
          </mesh>
          {/* Eyes */}
          <mesh ref={eyeL} position={[-0.16, 0.05, 0.45]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
          <mesh ref={eyeR} position={[0.16, 0.05, 0.45]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
          {/* Eye glow halos */}
          <pointLight position={[-0.16, 0.05, 0.5]} color={eyeColor} intensity={0.6} distance={1.5} />
          <pointLight position={[0.16, 0.05, 0.5]} color={eyeColor} intensity={0.6} distance={1.5} />
          {/* Antenna */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.18, 8]} />
            <meshStandardMaterial color="#999" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const RobotScene = ({
  mouse,
  hovered,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  hovered: boolean;
}) => (
  <Canvas
    className="!absolute inset-0"
    camera={{ position: [0, 0, 3.2], fov: 40 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.5} />
    <pointLight position={[3, 2, 2]} intensity={1.2} color="#ff6a3d" />
    <pointLight position={[-3, 1, 2]} intensity={0.8} color="#ffd700" />
    <pointLight position={[0, -2, 2]} intensity={0.5} color="#3a8fff" />
    <Suspense fallback={null}>
      <Robot mouse={mouse} hovered={hovered} />
    </Suspense>
  </Canvas>
);

/* ---------------- Wrapper with popup ---------------- */

const HireBot = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const set = () => setIsMobile(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      mouse.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  const handleEnter = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setHovered(true);
    setOpen(true);
  };
  const handleLeave = () => {
    setHovered(false);
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  /* ---------- Mobile fallback ---------- */
  if (isMobile) {
    return (
      <div className="mt-8 flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <RobotScene mouse={mouse} hovered={true} />
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-display tracking-[0.18em] text-xs uppercase rounded-md"
        >
          Hire Me on WhatsApp →
        </a>
      </div>
    );
  }

  /* ---------- Desktop ---------- */
  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block"
      style={{ width: 280, height: 360 }}
    >
      {/* Floating mini editing elements */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-6 px-2 py-1 text-[0.55rem] tracking-[0.25em] uppercase border border-primary/40 bg-background/60 backdrop-blur-sm text-primary"
      >
        ▶ Play
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 top-16 px-2 py-1 text-[0.55rem] tracking-[0.2em] font-display text-gold border border-gold/40 bg-background/60 backdrop-blur-sm"
      >
        00:24:18
      </motion.div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 bottom-16 flex items-end gap-px h-6"
      >
        {[3, 6, 4, 8, 5, 9, 4, 7, 5, 3].map((h, i) => (
          <span key={i} className="w-0.5 bg-primary/70" style={{ height: `${h * 3}px` }} />
        ))}
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-20 px-2 py-1 text-[0.55rem] tracking-wider bg-background/60 backdrop-blur-sm border border-foreground/15"
      >
        SUBTITLE.SRT
      </motion.div>

      {/* Glow ring */}
      <div
        className="absolute inset-8 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Robot canvas */}
      <div className="relative w-full h-full">
        <RobotScene mouse={mouse} hovered={hovered} />
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.55rem] tracking-[0.3em] uppercase text-foreground/60">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        AI Hire Assistant
      </div>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute right-full mr-6 top-1/2 -translate-y-1/2 w-[320px] p-5 rounded-2xl"
            style={{
              background: "hsl(var(--background) / 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid hsl(var(--primary) / 0.45)",
              boxShadow:
                "0 20px 60px -10px hsl(var(--primary) / 0.35), 0 0 30px -5px hsl(var(--gold) / 0.2), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
            }}
          >
            {/* Tail */}
            <div
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
              style={{
                background: "hsl(var(--background) / 0.9)",
                borderRight: "1px solid hsl(var(--primary) / 0.45)",
                borderTop: "1px solid hsl(var(--primary) / 0.45)",
              }}
            />

            <div className="text-[0.55rem] tracking-[0.3em] uppercase text-primary mb-2">
              ● Online · Replies in 1h
            </div>
            <h3 className="font-display text-xl text-foreground leading-tight">
              Ready to hire <span className="text-gold">Bhaskar?</span>
            </h3>
            <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
              Tell me what you need edited and I'll reply with the next steps.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  className="text-[0.65rem] px-2.5 py-1 rounded-full border border-foreground/15 text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow group mt-5 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-display tracking-[0.2em] text-xs uppercase rounded-lg hover:bg-gold hover:text-background transition-colors"
            >
              Hire Me on WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HireBot;
