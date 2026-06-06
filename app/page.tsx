"use client";

import { useEffect, useRef, useState } from "react";

const REELS = [
  {
    id: "h3Vuti6l1ZQ",
    title: "Ratnam Parkview — Interior Tour",
    type: "Interior Walkthrough",
    location: "Bhayli, Vadodara",
    url: "https://www.youtube.com/watch?v=h3Vuti6l1ZQ",
    thumb: "https://img.youtube.com/vi/h3Vuti6l1ZQ/maxresdefault.jpg",
  },
  {
    id: "MW4mKin0i0k",
    title: "Empty Plot to Building — Transformation",
    type: "Project Transformation",
    location: "Bhayli, Vadodara",
    url: "https://www.youtube.com/watch?v=MW4mKin0i0k",
    thumb: "https://img.youtube.com/vi/MW4mKin0i0k/maxresdefault.jpg",
  },
  {
    id: "ykh3nF0G7dI",
    title: "Ratnam Group — Track Record Film",
    type: "Brand Film",
    location: "Makarpura, Vadodara",
    url: "https://www.youtube.com/watch?v=ykh3nF0G7dI",
    thumb: "https://img.youtube.com/vi/ykh3nF0G7dI/maxresdefault.jpg",
  },
  {
    id: "D7MuRdtNJ_4",
    title: "Designed for Effortless Living",
    type: "Lifestyle Reel",
    location: "Bhayli, Vadodara",
    url: "https://www.youtube.com/watch?v=D7MuRdtNJ_4",
    thumb: "https://img.youtube.com/vi/D7MuRdtNJ_4/maxresdefault.jpg",
  },
  {
    id: "2ITzNPUVo-E",
    title: "Space Built for Life",
    type: "Property Highlight",
    location: "Bhayli, Vadodara",
    url: "https://www.youtube.com/watch?v=2ITzNPUVo-E",
    thumb: "https://img.youtube.com/vi/2ITzNPUVo-E/maxresdefault.jpg",
  },
  {
    id: "sX04UHKuA9w",
    title: "Sapno ka Aangan — Emotional Film",
    type: "Cinematic Film",
    location: "Makarpura, Vadodara",
    url: "https://www.youtube.com/watch?v=sX04UHKuA9w",
    thumb: "https://img.youtube.com/vi/sX04UHKuA9w/maxresdefault.jpg",
  },
];

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ pkg, onClose }: { pkg: string; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [form, setForm] = useState({ name: "", phone: "", email: "", availability: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setStep("thanks");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {step === "form" ? (
          <>
            <div className="modal-eyebrow">You selected</div>
            <div className="modal-pkg-name">{pkg}</div>
            <p className="modal-intro">Fill in your details and I&apos;ll get back to you within 24 hours to confirm.</p>
            <form onSubmit={submit} className="modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" placeholder="Your full name" value={form.name} onChange={handle} required />
              </div>
              <div className="form-group">
                <label>Contact Number *</label>
                <input name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handle} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
              </div>
              <div className="form-group">
                <label>Your availability to meet</label>
                <textarea name="availability" placeholder="E.g. Weekdays after 5pm, or Saturday morning..." value={form.availability} onChange={handle} rows={3} />
              </div>
              <button type="submit" className="modal-submit">Confirm Interest →</button>
            </form>
          </>
        ) : (
          <div className="modal-thanks">
            <div className="thanks-icon">✓</div>
            <h3>Thank you, {form.name}!</h3>
            <p>I&apos;ve received your interest in the <strong>{pkg}</strong> package. I&apos;ll reach out to you on <strong>{form.phone}</strong> within 24 hours to schedule a meeting.</p>
            <p className="thanks-sub">In the meantime, feel free to WhatsApp me directly at +91 95862 39648.</p>
            <button className="modal-submit" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Carousel Component ───────────────────────────────────────────────────────
function ReelsCarousel({ reels }: { reels: typeof REELS }) {
  const [current, setCurrent] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [outerW, setOuterW] = useState(900);

  useEffect(() => {
    const update = () => {
      if (outerRef.current) setOuterW(outerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = outerW < 600;
  const cW = isMobile ? 220 : 340;
  const sW = isMobile ? 140 : 220;
  const fW = isMobile ? 90 : 160;
  const gap = 16;
  const cH = isMobile ? 320 : 440;
  const sH = isMobile ? 220 : 310;
  const fH = isMobile ? 160 : 240;

  const getLeft = (i: number) => {
    const off = i - current;
    const mid = outerW / 2;
    if (off === 0)  return mid - cW / 2;
    if (off === -1) return mid - cW / 2 - sW - gap;
    if (off === 1)  return mid + cW / 2 + gap;
    if (off === -2) return mid - cW / 2 - sW - gap - fW - gap;
    if (off === 2)  return mid + cW / 2 + gap + sW + gap;
    return off < 0 ? -500 : outerW + 300;
  };

  const getSize = (i: number) => {
    const d = Math.abs(i - current);
    if (d === 0) return { w: cW, h: cH, opacity: 1 };
    if (d === 1) return { w: sW, h: sH, opacity: 0.55 };
    return { w: fW, h: fH, opacity: 0.28 };
  };

  const go = (dir: number) => {
    const next = current + dir;
    if (next < 0 || next >= reels.length) return;
    setCurrent(next);
    setPlayingIdx(null);
  };

  return (
    <>
      <div className="carousel-outer" ref={outerRef}>
        <div className="carousel-track" style={{ height: cH }}>
          {reels.map((reel, i) => {
            const { w, h, opacity } = getSize(i);
            const left = getLeft(i);
            const top = (cH - h) / 2;
            const isCtr = i === current;
            const isPlaying = playingIdx === i;

            return (
              <div
                key={i}
                className="reel-card"
                style={{ left, top, width: w, height: h, opacity }}
                onClick={() => {
                  if (isCtr) setPlayingIdx(i);
                  else { setCurrent(i); setPlayingIdx(null); }
                }}
              >
                {isPlaying ? (
                  <>
                    <div className="reel-iframe-wrap">
                      <iframe
                        src={`https://www.youtube.com/embed/${reel.id}?autoplay=1&rel=0`}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    </div>
                    <button
                      className="reel-stop-btn"
                      onClick={(e) => { e.stopPropagation(); setPlayingIdx(null); }}
                    >
                      ✕ Stop
                    </button>
                  </>
                ) : (
                  <>
                    {reel.thumb
                      ? <img className="reel-thumb" src={reel.thumb} alt={reel.title} />
                      : <div className="reel-placeholder" />
                    }
                    <div className="reel-overlay" />
                    <div className="reel-play-btn">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginLeft: 3 }}>
                        <path d="M5 3L17 10L5 17V3Z" fill="white" />
                      </svg>
                    </div>
                    {Math.abs(i - current) < 2 && (
                      <div className="reel-info" onClick={(e) => e.stopPropagation()}>
                        <div className="reel-type-tag">{reel.type}</div>
                        <a
                          className="reel-title"
                          href={reel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {reel.title} ↗
                        </a>
                        <div className="reel-location">{reel.location}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-nav">
        <button className="carousel-arrow" onClick={() => go(-1)} disabled={current === 0} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="carousel-dots">
          {reels.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? " active" : ""}`}
              onClick={() => { setCurrent(i); setPlayingIdx(null); }}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>
        <button className="carousel-arrow" onClick={() => go(1)} disabled={current === reels.length - 1} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [orderPkg, setOrderPkg] = useState<string | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.left = e.clientX + "px";
          ringRef.current.style.top = e.clientY + "px";
        }
      }, 80);
    };
    document.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", onScroll);

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    const items = document.querySelectorAll<HTMLElement>(".hero-content");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${0.2 + i * 0.12}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${0.2 + i * 0.12}s`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 80);
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>
        /* ── WORD CYCLE ANIMATION ── */
.cycle-strip { padding: 48px; background: var(--black); display: flex; align-items: center; justify-content: center; overflow: hidden; border-bottom: 1px solid var(--gray); }
.cycle-text { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 5vw, 4rem); letter-spacing: 0.08em; color: rgba(255,255,255,0.75); display: flex; align-items: center; gap: 24px; }
.cycle-word-wrap { position: relative; height: 1.1em; overflow: hidden; min-width: 320px; display: flex; align-items: center; justify-content: center; }
.cycle-word { position: absolute; color: var(--orange); opacity: 0; transform: translateY(40px); animation: wordCycle 6s ease-in-out infinite; }
.cycle-word:nth-child(2) { animation-delay: 2s; }
.cycle-word:nth-child(3) { animation-delay: 4s; }
@keyframes wordCycle {
  0%   { opacity: 0; transform: translateY(40px); }
  8%   { opacity: 1; transform: translateY(0); }
  28%  { opacity: 1; transform: translateY(0); }
  36%  { opacity: 0; transform: translateY(-40px); }
  100% { opacity: 0; transform: translateY(-40px); }
}        
         `}</style>
        {`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --orange: #F4500A; --orange-light: #FF6B2B;
          --black: #0A0A0A; --dark: #111111; --dark-2: #181818;
          --gray: #2A2A2A; --text-muted: #888; --text-dim: #555;
          --white: #FFFFFF; --off-white: #F0EDE8;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none; }
        .cursor { width: 12px; height: 12px; background: var(--orange); border-radius: 50%; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; transition: transform 0.15s ease; transform: translate(-50%,-50%); }
        .cursor-ring { width: 36px; height: 36px; border: 1.5px solid rgba(244,80,10,0.5); border-radius: 50%; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }

        /* ── NAV ── */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 22px 48px; background: linear-gradient(to bottom, rgba(10,10,10,0.95), transparent); transition: background 0.3s; }
        nav.scrolled { background: rgba(10,10,10,0.97); backdrop-filter: blur(12px); }
        .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 0.06em; color: var(--white); text-decoration: none; }
        .nav-logo span { color: var(--orange); }
        .nav-links { display: flex; align-items: center; gap: 36px; }
        .nav-links a { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 0.85rem; font-weight: 400; letter-spacing: 0.03em; transition: color 0.2s; }
        .nav-links a:hover { color: var(--white); }
        .btn-cta { display: flex; align-items: center; gap: 10px; background: var(--orange); color: var(--white); border: none; border-radius: 100px; padding: 10px 22px; font-size: 0.85rem; font-weight: 500; cursor: none; text-decoration: none; transition: background 0.25s; }
        .btn-cta:hover { background: var(--orange-light); }
        .btn-cta .arrow-dot { width: 28px; height: 28px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        /* ── HERO ── */
        .hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 48px 60px; overflow: hidden; border-radius: 0 0 32px 32px; }
        .hero-bg { position: absolute; inset: 0; background: #0a0a0a; z-index: 0; }
        .hero-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 55%; z-index: 1; background: radial-gradient(ellipse at 50% 100%, rgba(244,80,10,0.75) 0%, rgba(180,40,0,0.45) 35%, rgba(80,10,0,0.2) 65%, transparent 100%); filter: blur(32px); pointer-events: none; }
        .hero-video-frame { position: absolute; inset: 0; z-index: 3; background: linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,5,0,0.3) 45%, rgba(0,0,0,0.15) 100%); }
        .hero-noise { position: absolute; inset: 0; z-index: 4; opacity: 0.035; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 180px; pointer-events: none; }
        .hero-content { position: relative; z-index: 5; }
        .hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 10vw, 9rem); line-height: 0.92; letter-spacing: 0.01em; color: var(--white); margin-bottom: 18px; }
        .hero-title em { color: var(--orange); font-style: normal; }
        .hero-subline { font-size: 1.05rem; color: rgba(255,255,255,0.6); font-weight: 300; max-width: 520px; line-height: 1.6; }

        /* ── ABOUT ── */
        .about-section { padding: 100px 48px; background: var(--black); display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .section-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
        .about-left h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1.0; letter-spacing: 0.02em; color: var(--white); }
        .about-right p { font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 20px; }
        .about-right strong { color: var(--white); font-weight: 500; }
        .cta-row { display: flex; align-items: center; gap: 20px; margin-top: 32px; }
        .btn-primary { display: flex; align-items: center; gap: 10px; background: var(--orange); color: var(--white); border-radius: 100px; padding: 12px 24px; font-size: 0.85rem; font-weight: 500; text-decoration: none; cursor: none; transition: background 0.25s; }
        .btn-primary:hover { background: var(--orange-light); }
        .btn-primary .arrow-dot { width: 26px; height: 26px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .cta-subtext { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; }

        /* ── WHY REALTORS STYLE STRIP ── */
        .why-strip { padding: 56px 48px; background: var(--dark); border-top: 1px solid var(--gray); border-bottom: 1px solid var(--gray); display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .why-strip-left h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem); color: var(--white); line-height: 1.05; margin-bottom: 12px; }
        .why-strip-left h3 em { color: var(--orange); font-style: normal; }
        .why-strip-left p { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.7; }
        .why-strip-right { display: flex; flex-direction: column; gap: 20px; }
        .why-item { display: flex; gap: 16px; align-items: flex-start; }
        .why-num { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--orange); letter-spacing: 0.1em; flex-shrink: 0; margin-top: 2px; }
        .why-text strong { display: block; font-size: 0.9rem; color: var(--white); font-weight: 500; margin-bottom: 3px; }
        .why-text span { font-size: 0.8rem; color: rgba(255,255,255,0.45); line-height: 1.5; }

        /* ── PACKAGES ── */
        .packages-section { padding: 80px 48px 100px; background: var(--dark); }
        .packages-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
        .packages-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; line-height: 1; }
        .packages-header p { max-width: 280px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; text-align: right; }
        .packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--gray); border-radius: 24px; overflow: hidden; }
        .package-card { background: var(--dark-2); padding: 40px 36px; transition: background 0.3s; display: flex; flex-direction: column; }
        .package-card:hover { background: #1e1e1e; }
        .package-card.featured { background: var(--orange); }
        .package-card.featured:hover { background: var(--orange-light); }
        .pkg-num { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; margin-bottom: 24px; }
        .package-card.featured .pkg-num { color: rgba(255,255,255,0.6); }
        .pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.03em; color: var(--white); margin-bottom: 8px; }
        .pkg-tagline { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 28px; line-height: 1.5; }
        .package-card.featured .pkg-tagline { color: rgba(255,255,255,0.7); }
        .pkg-features { list-style: none; margin-bottom: 24px; flex: 1; }
        .pkg-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.8rem; color: rgba(255,255,255,0.6); padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); line-height: 1.4; }
        .package-card.featured .pkg-features li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.15); }
        .pkg-features li::before { content: '—'; color: var(--orange); font-size: 0.7rem; flex-shrink: 0; margin-top: 2px; }
        .package-card.featured .pkg-features li::before { color: rgba(255,255,255,0.8); }
        .pkg-best-for { font-size: 0.72rem; color: rgba(255,255,255,0.35); font-style: italic; margin-bottom: 20px; line-height: 1.5; }
        .package-card.featured .pkg-best-for { color: rgba(255,255,255,0.55); }
        .pkg-price { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: var(--white); line-height: 1; margin-bottom: 6px; }
        .pkg-price span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 300; color: rgba(255,255,255,0.45); }
        .package-card.featured .pkg-price span { color: rgba(255,255,255,0.6); }
        .pkg-cta { margin-top: 20px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); color: var(--white); border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; padding: 10px 20px; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: background 0.25s, border-color 0.25s; font-family: 'DM Sans', sans-serif; width: 100%; }
        .pkg-cta:hover { background: rgba(255,255,255,0.2); }
        .package-card.featured .pkg-cta { background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.3); }
        .package-card.featured .pkg-cta:hover { background: rgba(0,0,0,0.35); }

        /* ── TESTIMONIAL ── */
        .testi-strip { padding: 60px 48px; background: var(--black); display: flex; align-items: center; gap: 48px; border-bottom: 1px solid var(--gray); }
        .testi-quote { font-size: 3rem; color: var(--orange); font-family: 'Bebas Neue', sans-serif; flex-shrink: 0; line-height: 1; }
        .testi-text { font-size: 1.1rem; color: rgba(255,255,255,0.75); line-height: 1.7; font-weight: 300; font-style: italic; }
        .testi-credit { margin-top: 12px; font-size: 0.75rem; color: var(--orange); font-family: 'Space Mono', monospace; letter-spacing: 0.08em; }

        /* ── REELS CAROUSEL ── */
        .work-section { padding: 80px 48px 100px; background: var(--black); }
        .work-header { margin-bottom: 48px; }
        .work-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; }
        .carousel-outer { position: relative; overflow: hidden; }
        .carousel-track { position: relative; width: 100%; }
        .reel-card { position: absolute; border-radius: 20px; overflow: hidden; background: #1a1a1a; cursor: pointer; transition: left 0.5s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s cubic-bezier(0.25,0.46,0.45,0.94), width 0.5s cubic-bezier(0.25,0.46,0.45,0.94), height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease; }
        .reel-placeholder { position: absolute; inset: 0; background: linear-gradient(160deg, #252525 0%, #141414 100%); }
        .reel-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.25) 45%, transparent 72%); }
        .reel-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.85); transition: filter 0.4s ease; }
        .reel-card:hover .reel-thumb { filter: grayscale(0) brightness(1); }
        .reel-play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 2; width: 58px; height: 58px; border-radius: 50%; background: rgba(244,80,10,0.9); display: flex; align-items: center; justify-content: center; transition: transform 0.3s, background 0.3s; animation: reel-pulse 2.8s ease-in-out infinite; }
        @keyframes reel-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(244,80,10,0.4); } 50% { box-shadow: 0 0 0 14px rgba(244,80,10,0); } }
        .reel-card:hover .reel-play-btn { transform: translate(-50%,-50%) scale(1.1); background: var(--orange-light); }
        .reel-info { position: absolute; bottom: 20px; left: 20px; right: 20px; z-index: 2; }
        .reel-type-tag { font-family: 'Space Mono', monospace; font-size: 0.55rem; color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 5px; background: rgba(244,80,10,0.15); display: inline-block; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(244,80,10,0.3); }
        .reel-title { display: block; font-size: 0.92rem; font-weight: 600; color: var(--white); margin-bottom: 5px; line-height: 1.3; text-decoration: none; transition: color 0.2s; }
        .reel-title:hover { color: var(--orange); }
        .reel-location { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; text-transform: uppercase; }
        .reel-iframe-wrap { position: absolute; inset: 0; z-index: 3; background: #000; }
        .reel-iframe-wrap iframe { width: 100%; height: 100%; border: none; }
        .reel-stop-btn { position: absolute; top: 10px; right: 10px; z-index: 4; background: rgba(0,0,0,0.75); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 100px; padding: 5px 14px; font-size: 0.72rem; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
        .reel-stop-btn:hover { background: rgba(244,80,10,0.85); }
        .carousel-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 32px; }
        .carousel-arrow { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; flex-shrink: 0; }
        .carousel-arrow:hover:not(:disabled) { background: var(--orange); border-color: var(--orange); }
        .carousel-arrow:disabled { opacity: 0.2; cursor: default; }
        .carousel-dots { display: flex; gap: 8px; align-items: center; }
        .carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; padding: 0; cursor: pointer; transition: background 0.25s, transform 0.25s; }
        .carousel-dot.active { background: var(--orange); transform: scale(1.5); }

        /* ── CTA URGENCY STRIP ── */
        .urgency-strip { padding: 48px; background: var(--dark); border-top: 1px solid var(--gray); display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .urgency-text h3 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--white); margin-bottom: 6px; }
        .urgency-text h3 em { color: var(--orange); font-style: normal; }
        .urgency-text p { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        .urgency-btn { display: flex; align-items: center; gap: 10px; background: var(--orange); color: var(--white); border-radius: 100px; padding: 14px 28px; font-size: 0.9rem; font-weight: 500; text-decoration: none; white-space: nowrap; transition: background 0.25s; cursor: none; }
        .urgency-btn:hover { background: var(--orange-light); }

        /* ── MODAL ── */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(8px); }
        .modal-box { background: #141414; border: 1px solid #2a2a2a; border-radius: 24px; padding: 44px; width: 100%; max-width: 500px; position: relative; max-height: 90vh; overflow-y: auto; }
        .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; color: rgba(255,255,255,0.4); font-size: 1.1rem; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: var(--white); }
        .modal-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .modal-pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--white); margin-bottom: 12px; }
        .modal-intro { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 28px; line-height: 1.6; }
        .modal-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.75rem; color: rgba(255,255,255,0.5); font-family: 'Space Mono', monospace; letter-spacing: 0.06em; }
        .form-group input, .form-group textarea { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 10px; padding: 12px 16px; color: var(--white); font-size: 0.88rem; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; resize: none; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--orange); }
        .modal-submit { margin-top: 8px; background: var(--orange); color: var(--white); border: none; border-radius: 100px; padding: 14px 28px; font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: background 0.25s; font-family: 'DM Sans', sans-serif; }
        .modal-submit:hover { background: var(--orange-light); }
        .modal-thanks { text-align: center; padding: 20px 0; }
        .thanks-icon { width: 64px; height: 64px; background: rgba(244,80,10,0.15); border: 2px solid var(--orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--orange); margin: 0 auto 24px; }
        .modal-thanks h3 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--white); margin-bottom: 16px; }
        .modal-thanks p { font-size: 0.88rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 12px; }
        .thanks-sub { font-size: 0.8rem; color: rgba(255,255,255,0.35); }

        /* ── FOOTER ── */
        footer { padding: 60px 48px 40px; background: var(--black); border-top: 1px solid var(--gray); }
        .footer-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; }
        .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; letter-spacing: 0.06em; color: var(--white); text-decoration: none; }
        .footer-logo span { color: var(--orange); }
        .footer-tagline { font-size: 0.8rem; color: var(--text-muted); margin-top: 8px; max-width: 200px; line-height: 1.6; }
        .footer-links { display: flex; gap: 60px; }
        .footer-col h4 { font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
        .footer-col a { display: block; font-size: 0.85rem; color: rgba(255,255,255,0.55); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
        .footer-col a:hover { color: var(--white); }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 28px; border-top: 1px solid var(--gray); }
        .footer-copy { font-size: 0.72rem; color: var(--text-dim); }
        .footer-socials { display: flex; gap: 16px; }
        .social-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--gray); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.75rem; transition: border-color 0.2s, color 0.2s; }
        .social-btn:hover { border-color: var(--orange); color: var(--orange); }

        /* ── SCROLL REVEAL ── */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          nav { padding: 18px 24px; } .nav-links { display: none; }
          .hero { padding: 0 24px 48px; }
          .about-section { grid-template-columns: 1fr; padding: 60px 24px; gap: 36px; }
          .why-strip { grid-template-columns: 1fr; padding: 48px 24px; gap: 36px; }
          .packages-section { padding: 60px 24px; } .packages-grid { grid-template-columns: 1fr; }
          .work-section { padding: 60px 24px; }
          .testi-strip { flex-direction: column; padding: 48px 24px; gap: 20px; }
          .urgency-strip { flex-direction: column; padding: 40px 24px; text-align: center; }
          footer { padding: 48px 24px 32px; } .footer-top { flex-direction: column; gap: 36px; } .footer-links { gap: 36px; }
          .modal-box { padding: 32px 24px; }
        }
      `}</style>

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Page title */}
      <title>Lumiq Production</title>

      {/* Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Order Modal */}
      {orderPkg && <OrderModal pkg={orderPkg} onClose={() => setOrderPkg(null)} />}

      {/* ── NAV ── */}
      <nav ref={navRef}>
        <a href="#" className="nav-logo">
  <img src="/logo.png" alt="Vijay Vaghela" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#packages">Packages</a>
          <a href="#work">Work</a>
          <a href="#contact" className="btn-cta">
            Contact Now
            <span className="arrow-dot">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-glow" />
        <div className="hero-video-frame" />
        <div className="hero-noise" />
        <div className="hero-content">
          <div className="hero-eyebrow">AI-Powered Real Estate Video — Vadodara, Gujarat</div>
          <h1 className="hero-title"><br/><em>Lumiq Productions</em><br/>BRINGING YOUR VISION TO LIFE</h1>
          <p className="hero-subline">Gujarat's First AI-Powered Cinematic Property Films.</p>
        </div>
      </section>

      {/* ── WORD CYCLE ── */}
<div className="cycle-strip">
  <div className="cycle-text">
    <span>YOUR</span>
    <div className="cycle-word-wrap">
      <span className="cycle-word">CINEMATIC</span>
      <span className="cycle-word">CREATIVE</span>
      <span className="cycle-word">TRUSTED</span>
    </div>
    <span>PARTNER</span>
  </div>
</div>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="about-left reveal">
          <div className="section-eyebrow">Who I am</div>
          <h2>Gujarat&apos;s First AI-Powered Real Estate Video Specialist</h2>
        </div>
        <div className="about-right reveal reveal-d2">
          <p>I&apos;Welcome to Lumiq Productions, the place where eye-catching images come to life. Our committed team of videographers, based in Karjan, Gujarat, India, specializes in producing captivating and inspiring images. We bring passion and enthusiasm to every project with a warm and approachable behavior, making it an unforgettable experience for everyone. Our passion is creating eye-catching images that have a lasting impact on your brand, professional goals, or personal journey. Together, let's use the power of AI-enhanced editing and outstanding videography to bring your vision to life..</p>
          <p>Using AI-enhanced editing, professional colour grading, and real estate-specific storytelling, I help buyers <strong>feel</strong> the project before they ever visit the site. The result: faster inquiries, stronger first impressions, and properties that sell at the value they deserve.</p>
          <div className="cta-row">
            <a href="#work" className="btn-primary">
              Explore My Work
              <span className="arrow-dot">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 6.5H11.5M11.5 6.5L7 2M11.5 6.5L7 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <div className="cta-subtext">Based in Vadodara.<br/>Serving Gujarat&apos;s top developers.</div>
          </div>
        </div>
      </section>

      {/* ── WHY REALTORS-STYLE STRIP ── */}
      <div className="why-strip reveal">
        <div className="why-strip-left">
          <h3>Why <em>AI-Powered Cinematic</em><br/>films for Gujarat?</h3>
          <p>The AI-powered cinematic film trend — storytelling blended with lifestyle visuals — is transforming property marketing globally. Gujarat&apos;s real estate market is ready for it.</p>
        </div>
        <div className="why-strip-right">
          {[
            ["01", "Buyers decide emotionally first", "Logic comes later. A cinematic film creates desire before the site visit."],
            ["02", "Gujarat developers are underserved", "Most local content is basic. A premium film makes you stand apart instantly."],
            ["03", "AI makes it affordable", "What used to cost ₹5L+ in production is now achievable at a fraction of the cost."],
          ].map(([num, title, desc]) => (
            <div className="why-item" key={num}>
              <div className="why-num">{num}</div>
              <div className="why-text">
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <section className="packages-section" id="packages">
        <div className="packages-header reveal">
          <div>
            <div className="section-eyebrow">What&apos;s Included</div>
            <h2>Choose Your Package</h2>
          </div>
        </div>
        <div className="packages-grid">

          {/* #01 Spotlight */}
          <div className="package-card reveal">
            <div className="pkg-num">#01</div>
            <div className="pkg-name">Spotlight</div>
            <div className="pkg-tagline">Get seen. Get remembered.</div>
            <ul className="pkg-features">
              <li><a href="https://www.instagram.com/reel/DXEiuCDD_qT/?hl=en" target="_blank" rel="noopener noreferrer" style={{color:"inherit", borderBottom:"1px dashed rgba(255,255,255,0.25)", textDecoration:"none"}}>Property introduction video</a></li>
              <li><a href="https://www.instagram.com/p/DJ8kbOVoZ2B/?hl=en" target="_blank" rel="noopener noreferrer" style={{color:"inherit", borderBottom:"1px dashed rgba(255,255,255,0.25)", textDecoration:"none"}}>property walkthrough reel</a></li>
              <li><a href="https://www.instagram.com/p/DP3zzcggF9G/?hl=en" target="_blank" rel="noopener noreferrer" style={{color:"inherit", borderBottom:"1px dashed rgba(255,255,255,0.25)", textDecoration:"none"}}>Location benefits reel</a></li>
              <li>2 Instagram premium story designs</li>
              <li>2 Strategic and purpose-driven scripting</li>
            </ul>
            <div className="pkg-best-for">Best for: Small builders, single-project developers, first-time clients — 4 deliverables</div>
            <div className="pkg-price">₹55,000 <span>/ 5 deliverables</span></div>
            <button className="pkg-cta" onClick={() => setOrderPkg("Spotlight — ₹55,000")}>Choose Spotlight →</button>
          </div>

          {/* #02 Signature */}
          <div className="package-card featured reveal reveal-d1">
            <div className="pkg-num">#02</div>
            <div className="pkg-name">Signature</div>
            <div className="pkg-tagline">Convert attention into trust.</div>
            <ul className="pkg-features">
              <li>Everything in Spotlight</li>
              <li>1 Premium carousel post design (3–5 slides)</li>
              <li><a href="https://www.instagram.com/reel/DXHArrTkVBs/" target="_blank" rel="noopener noreferrer" style={{color:"inherit", borderBottom:"1px dashed rgba(255,255,255,0.25)", textDecoration:"none"}}>90-sec cinematic engaging reel</a></li>
              <li>Up to 10 Clean edited photos</li>
            </ul>
            <div className="pkg-best-for">Best for: Mid-size developers, active projects, retainer potential — 7 deliverables</div>
            <div className="pkg-price">₹95,000 <span>/ 8 deliverables</span></div>
            <button className="pkg-cta" onClick={() => setOrderPkg("Signature — ₹95,000")}>Choose Signature →</button>
          </div>

          {/* #03 Prestige */}
          <div className="package-card reveal reveal-d2">
            <div className="pkg-num">#03</div>
            <div className="pkg-name">Prestige</div>
            <div className="pkg-tagline">The film that defines the project.</div>
            <ul className="pkg-features">
              <li>Everything in Signature</li>
              <li><a href="https://www.youtube.com/watch?v=FRDX4qrSdr4" target="_blank" rel="noopener noreferrer" style={{color:"inherit", borderBottom:"1px dashed rgba(255,255,255,0.25)", textDecoration:"none"}}>Up to 3-min cinematic property film</a></li>
              <li>1 Additional carousel or story set</li>
              <li>Up to 25 Clean edited photos</li>
              <li>Free raw photos</li>
            </ul>
            <div className="pkg-best-for">Best for: Premium developers, luxury projects, established brands — 11 deliverables</div>
            <div className="pkg-price">₹1,50,000 <span>/ 12 deliverables</span></div>
            <button className="pkg-cta" onClick={() => setOrderPkg("Prestige — ₹1,50,000")}>Choose Prestige →</button>
          </div>

        </div>
      </section>

      {/* ── REELS CAROUSEL ── */}
      <section className="work-section" id="work">
        <div className="work-header reveal">
          <div className="section-eyebrow">Selected Work</div>
          <h2>Recent Reels</h2>
        </div>
        <ReelsCarousel reels={REELS} />
      </section>

      {/* ── URGENCY CTA ── */}
      <div className="urgency-strip reveal">
        <div className="urgency-text">
          <h3>Currently accepting <em>2 projects</em> for July.</h3>
          <p>Limited slots available — reach out now to secure your project&apos;s spot.</p>
        </div>
        <a href="#contact" className="urgency-btn">Start a Conversation →</a>
      </div>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <div className="footer-top">
          <div>
            <a href="#" className="footer-logo">Vijay<span>Vaghela</span></a>
            <div className="footer-tagline">Cinematic real estate video for people who don&apos;t settle.</div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:vaghelavijay178@mail.com">vaghelavijay178@mail.com</a>
              <a href="https://wa.me/919586239648">+91 95862 39648</a>
              <a href="#">Vadodara, Gujarat</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 VijayVaghela. All rights reserved.</div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/vijaycreates/" target="_blank" rel="noopener noreferrer" className="social-btn">IG</a>
            <a href="https://www.linkedin.com/in/vijayvaghelain/" target="_blank" rel="noopener noreferrer" className="social-btn">LD</a>
            <a href="https://wa.me/919586239648" target="_blank" rel="noopener noreferrer" className="social-btn">WA</a>
          </div>
        </div>
      </footer>
    </>
  );
}
