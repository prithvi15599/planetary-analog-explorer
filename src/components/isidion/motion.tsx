import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fixed full-screen canvas: twinkling, parallaxing stars + shooting stars. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const palette = [css.getPropertyValue("--foreground"), css.getPropertyValue("--moon"), css.getPropertyValue("--mars"), css.getPropertyValue("--earth")].map((c) => c.trim());
    const col = (i: number) => palette[i] ?? palette[0] ?? "";
    let w = 0, h = 0, raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    type Star = { x: number; y: number; z: number; r: number; p: number; c: string };
    let stars: Star[] = [];
    let shooters: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 4200);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.2, p: Math.random() * Math.PI * 2,
        c: col(Math.random() < 0.82 ? 0 : 1 + Math.floor(Math.random() * 3)),
      }));
    };
    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / w - 0.5; mouse.ty = e.clientY / h - 0.5; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    const still = reduced();
    let t = 0;
    const draw = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const x = (s.x - mouse.x * 40 * s.z + w) % w;
        const y = (((s.y - mouse.y * 40 * s.z - scroll * 0.15 * s.z) % h) + h) % h;
        ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.6 + s.z) + s.p));
        ctx.fillStyle = s.c;
        ctx.beginPath(); ctx.arc(x, y, s.r * (0.6 + s.z), 0, Math.PI * 2); ctx.fill();
      }
      if (!still && Math.random() < 0.012) {
        shooters.push({ x: Math.random() * w, y: Math.random() * h * 0.5, vx: 9 + Math.random() * 6, vy: 3 + Math.random() * 3, life: 1 });
      }
      shooters = shooters.filter((s) => s.life > 0);
      for (const s of shooters) {
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 10, s.y - s.vy * 10);
        g.addColorStop(0, col(1)); g.addColorStop(1, "transparent");
        ctx.globalAlpha = s.life; ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
      }
      ctx.globalAlpha = 1;
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-80" />;
}

/** Soft glowing aura that trails the cursor. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = -500, y = -500, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[500px] rounded-full opacity-40 blur-3xl md:block"
      style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--mars) 35%, transparent), color-mix(in oklab, var(--moon) 10%, transparent) 45%, transparent 70%)" }}
    />
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-mars via-moon to-earth"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/** Fades, lifts and de-blurs children when scrolled into view. */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} data-reveal="" className={className} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ΔΣΩ";
/** Text that decodes itself from random glyphs. SSR renders the final text. */
export function ScrambleText({ text, className, duration = 1100 }: { text: string; className?: string; duration?: number }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * text.length);
      setOut(text.split("").map((ch, i) => (i < reveal || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);
  return <span className={className} aria-label={text}>{out}</span>;
}

/** Counts up to `value` when visible. */
export function CountUp({ value, decimals = 0, suffix = "", className }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1600);
        setN(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className={className}>{n.toFixed(decimals)}{suffix}</span>;
}

/** 3D tilt + cursor spotlight card. */
export function TiltCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("spotlight transition-transform duration-200 ease-out will-change-transform", className)}>
      {children}
    </div>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-border bg-card/40 py-3 backdrop-blur", className)}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="size-1 rounded-full bg-mars" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

/** Earth with orbiting Moon and Mars, rings and pulses. Purely decorative. */
export function OrbitSystem({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square w-full max-w-[460px]", className)}>
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-moon/20" />
      <div className="absolute inset-[14%] rounded-full border border-border" />
      <div className="absolute inset-[30%] rounded-full border border-earth/20" />
      {/* Mars orbit */}
      <div className="absolute inset-0 animate-orbit-slow">
        <div className="planet-mars absolute left-1/2 top-0 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      {/* Moon orbit */}
      <div className="absolute inset-[14%] animate-orbit">
        <div className="planet-moon absolute left-1/2 top-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      {/* satellite */}
      <div className="absolute inset-[30%] animate-orbit-rev">
        <div className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-earth shadow-[0_0_10px_var(--earth)]" />
      </div>
      <div className="absolute inset-[38%] animate-float">
        <div className="absolute inset-0 animate-pulse-ring rounded-full border border-earth/50" />
        <div className="planet-earth absolute inset-0 rounded-full" />
      </div>
      {/* crosshair */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
    </div>
  );
}
