"use client";

import { useEffect, useRef, useState } from "react";

const REELS = [
  {
    id: "h3Vuti6l1ZQ",
    title: "What inside ratnam parkview",
    location: "Bhayli, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/h3Vuti6l1ZQ/maxresdefault.jpg",
  },
  {
    id: "MW4mKin0i0k",
    title: "Empty plot to building",
    location: "Bhayli, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/MW4mKin0i0k/maxresdefault.jpg",
  },
  {
    id: "ykh3nF0G7dI",
    title: "Ratnam Group ka Track Record",
    location: "Makarpura, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/ykh3nF0G7dI/maxresdefault.jpg",
  },
  {
    id: "D7MuRdtNJ_4",
    title: "Designed for effortless living",
    location: "Bhayli, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/D7MuRdtNJ_4/maxresdefault.jpg",
  },
  {
    id: "2ITzNPUVo-E",
    title: "Space built for life",
    location: "Bhayli, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/2ITzNPUVo-E/maxresdefault.jpg",
  },
  {
    id: "sX04UHKuA9w",
    title: "Sapno ka aangan",
    location: "Makarpura, Vadodara, Gujarat",
    thumb: "https://img.youtube.com/vi/sX04UHKuA9w/maxresdefault.jpg",
  },
];

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
    if (d === 0) return { w: cW, h: cH, opacity: 1, scale: 1 };
    if (d === 1) return { w: sW, h: sH, opacity: 0.55, scale: 0.94 };
    return { w: fW, h: fH, opacity: 0.28, scale: 0.86 };
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
                      <div className="reel-info">
                        <div className="reel-title">{reel.title}</div>
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

      {/* Nav: arrows + dots */}
      <div className="carousel-nav">
        <button
          className="carousel-arrow"
          onClick={() => go(-1)}
          disabled={current === 0}
          aria-label="Previous"
        >
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

        <button
          className="carousel-arrow"
          onClick={() => go(1)}
          disabled={current === reels.length - 1}
          aria-label="Next"
        >
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

    const items = document.querySelectorAll<HTMLElement>(
      ".hero-content, .hero-tagline, .hero-services, .hero-property-tag, .play-badge"
    );
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
      <style>{`
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
        .hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 48px 60px; overflow: hidden; border-radius: 0 0 32px 32px; }
        .hero-bg { position: absolute; inset: 0; background: #0a0a0a; z-index: 0; }
        .hero-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 55%; z-index: 1; background: radial-gradient(ellipse at 50% 100%, rgba(244,80,10,0.75) 0%, rgba(180,40,0,0.45) 35%, rgba(80,10,0,0.2) 65%, transparent 100%); filter: blur(32px); pointer-events: none; }
        .hero-video-bg { position: absolute; inset: 0; z-index: 2; overflow: hidden; }
        .hero-video-bg iframe { position: absolute; top: 50%; left: 50%; width: 177.78vh; min-width: 100%; height: 56.25vw; min-height: 100%; transform: translate(-50%, -50%); pointer-events: none; border: none; }
        @media (max-width: 768px) {
          .hero-video-bg iframe { width: 300vw; min-width: 300vw; height: 169vw; min-height: 56.25vw; }
        }
        .hero-video-frame { position: absolute; inset: 0; z-index: 3; background: linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,5,0,0.3) 45%, rgba(0,0,0,0.15) 100%); }
        .hero-noise { position: absolute; inset: 0; z-index: 4; opacity: 0.035; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 180px; pointer-events: none; }
        .hero-property-tag { position: absolute; top: 52%; right: 72px; z-index: 5; background: rgba(10,10,10,0.65); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px 22px; min-width: 220px; animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .property-tag-label { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .property-tag-title { font-size: 0.95rem; font-weight: 500; color: var(--white); margin-bottom: 10px; }
        .property-tag-stats { display: flex; gap: 14px; }
        .stat-item { text-align: center; }
        .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: var(--white); line-height: 1; }
        .stat-label { font-size: 0.62rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .play-badge { position: absolute; top: 38%; left: 50%; transform: translate(-50%,-50%); z-index: 5; width: 72px; height: 72px; border-radius: 50%; background: rgba(244,80,10,0.15); border: 1.5px solid rgba(244,80,10,0.5); display: flex; align-items: center; justify-content: center; cursor: none; transition: background 0.3s, transform 0.3s; animation: pulse-ring 2.5s ease-in-out infinite; text-decoration: none; }
        .play-badge:hover { background: rgba(244,80,10,0.35); transform: translate(-50%,-50%) scale(1.1); }
        @keyframes pulse-ring { 0%,100%{ box-shadow: 0 0 0 0 rgba(244,80,10,0.3); } 50%{ box-shadow: 0 0 0 18px rgba(244,80,10,0); } }
        .hero-content { position: relative; z-index: 5; }
        .hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(5rem, 11vw, 10rem); line-height: 0.92; letter-spacing: 0.01em; color: var(--white); margin-bottom: 24px; }
        .hero-title em { color: var(--orange); font-style: normal; }
        .hero-tagline { position: absolute; right: 0; bottom: 0; max-width: 280px; text-align: right; z-index: 5; }
        .hero-tagline h3 { font-size: 1.15rem; font-weight: 500; line-height: 1.35; color: var(--white); margin-bottom: 8px; }
        .hero-services { display: flex; gap: 40px; margin-top: 40px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.12); position: relative; z-index: 5; }
        .hero-service-item { display: flex; flex-direction: column; gap: 4px; }
        .service-num { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--orange); letter-spacing: 0.1em; }
        .service-name { font-size: 0.78rem; color: rgba(255,255,255,0.65); font-weight: 300; }
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
        .packages-section { padding: 80px 48px 100px; background: var(--dark); }
        .packages-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
        .packages-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; line-height: 1; }
        .packages-header p { max-width: 280px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; text-align: right; }
        .packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--gray); border-radius: 24px; overflow: hidden; }
        .package-card { background: var(--dark-2); padding: 40px 36px; transition: background 0.3s; }
        .package-card:hover { background: #1e1e1e; }
        .package-card.featured { background: var(--orange); }
        .package-card.featured:hover { background: var(--orange-light); }
        .pkg-num { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; margin-bottom: 24px; }
        .package-card.featured .pkg-num { color: rgba(255,255,255,0.6); }
        .pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.03em; color: var(--white); margin-bottom: 8px; }
        .pkg-tagline { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 28px; line-height: 1.5; }
        .package-card.featured .pkg-tagline { color: rgba(255,255,255,0.7); }
        .pkg-features { list-style: none; margin-bottom: 32px; }
        .pkg-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.8rem; color: rgba(255,255,255,0.6); padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); line-height: 1.4; }
        .package-card.featured .pkg-features li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.15); }
        .pkg-features li::before { content: '—'; color: var(--orange); font-size: 0.7rem; flex-shrink: 0; margin-top: 2px; }
        .package-card.featured .pkg-features li::before { color: rgba(255,255,255,0.8); }
        .pkg-features li a { color: inherit; text-decoration: none; border-bottom: 1px dashed rgba(255,255,255,0.25); transition: border-color 0.2s, color 0.2s; }
        .pkg-features li a:hover { color: var(--white); border-bottom-color: var(--orange); }
        .package-card.featured .pkg-features li a:hover { border-bottom-color: rgba(255,255,255,0.8); }
        .pkg-price { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: var(--white); line-height: 1; }
        .pkg-price span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 300; color: rgba(255,255,255,0.45); }
        .package-card.featured .pkg-price span { color: rgba(255,255,255,0.6); }

        /* ═══════════════════════════════════════
           REELS CAROUSEL
        ═══════════════════════════════════════ */
        .work-section { padding: 80px 48px 100px; background: var(--black); }
        .work-header { margin-bottom: 48px; }
        .work-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; }

        .carousel-outer { position: relative; overflow: hidden; }
        .carousel-track { position: relative; width: 100%; }

        .reel-card {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1a1a;
          cursor: pointer;
          transition: left 0.5s cubic-bezier(0.25,0.46,0.45,0.94),
                      top 0.5s cubic-bezier(0.25,0.46,0.45,0.94),
                      width 0.5s cubic-bezier(0.25,0.46,0.45,0.94),
                      height 0.5s cubic-bezier(0.25,0.46,0.45,0.94),
                      opacity 0.5s ease;
        }

        .reel-placeholder { position: absolute; inset: 0; background: linear-gradient(160deg, #252525 0%, #141414 100%); }
        .reel-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.25) 45%, transparent 72%); }

        .reel-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.85); transition: filter 0.4s ease; }
        .reel-card:hover .reel-thumb { filter: grayscale(0) brightness(1); }
        .reel-play-btn {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          z-index: 2; width: 58px; height: 58px; border-radius: 50%;
          background: rgba(244,80,10,0.9);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s, background 0.3s;
          animation: reel-pulse 2.8s ease-in-out infinite;
        }
        @keyframes reel-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(244,80,10,0.4); }
          50%      { box-shadow: 0 0 0 14px rgba(244,80,10,0); }
        }
        .reel-card:hover .reel-play-btn { transform: translate(-50%,-50%) scale(1.1); background: var(--orange-light); }

        .reel-info { position: absolute; bottom: 20px; left: 20px; right: 20px; z-index: 2; }
        .reel-title { font-size: 0.95rem; font-weight: 600; color: var(--white); margin-bottom: 5px; line-height: 1.3; }
        .reel-location { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; text-transform: uppercase; }

        .reel-iframe-wrap { position: absolute; inset: 0; z-index: 3; background: #000; }
        .reel-iframe-wrap iframe { width: 100%; height: 100%; border: none; }

        .reel-stop-btn {
          position: absolute; top: 10px; right: 10px; z-index: 4;
          background: rgba(0,0,0,0.75); border: 1px solid rgba(255,255,255,0.2);
          color: white; border-radius: 100px; padding: 5px 14px;
          font-size: 0.72rem; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: background 0.2s;
        }
        .reel-stop-btn:hover { background: rgba(244,80,10,0.85); }

        /* Nav */
        .carousel-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 32px; }
        .carousel-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, border-color 0.2s; flex-shrink: 0;
        }
        .carousel-arrow:hover:not(:disabled) { background: var(--orange); border-color: var(--orange); }
        .carousel-arrow:disabled { opacity: 0.2; cursor: default; }
        .carousel-dots { display: flex; gap: 8px; align-items: center; }
        .carousel-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.2); border: none; padding: 0;
          cursor: pointer; transition: background 0.25s, transform 0.25s;
        }
        .carousel-dot.active { background: var(--orange); transform: scale(1.5); }

        /* ═══════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════ */
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

        /* ═══════════════════════════════════════
           SCROLL REVEAL
        ═══════════════════════════════════════ */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }

        /* ═══════════════════════════════════════
           MOBILE
        ═══════════════════════════════════════ */
        @media (max-width: 768px) {
          nav { padding: 18px 24px; } .nav-links { display: none; }
          .hero { padding: 0 24px 48px; } .hero-property-tag { display: none; } .hero-tagline { display: none; }
          .about-section { grid-template-columns: 1fr; padding: 60px 24px; gap: 36px; }
          .packages-section { padding: 60px 24px; } .packages-grid { grid-template-columns: 1fr; }
          .work-section { padding: 60px 24px; }
          footer { padding: 48px 24px 32px; } .footer-top { flex-direction: column; gap: 36px; } .footer-links { gap: 36px; }
        }
      `}</style>

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* ── NAV ── */}
      <nav ref={navRef}>
        <a href="#" className="nav-logo">Vijay<span>Vaghela</span></a>
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
        {/* ── Showreel background ── */}
        <div className="hero-video-bg">
          <iframe
            src="https://www.youtube.com/embed/JfehKCUa5_g?autoplay=1&mute=1&loop=1&playlist=JfehKCUa5_g&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="hero-video-frame" />
        <div className="hero-noise" />
        <div className="hero-content">
          <div className="hero-eyebrow">Ai powered Real Estate Video Services</div>
          <h1 className="hero-title">AI-Driven<br/><em>Property Films</em></h1>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="about-left reveal">
          <div className="section-eyebrow">Vision that</div>
          <h2>Shaping Visuals That Sell Property Before Open Day</h2>
        </div>
        <div className="about-right reveal reveal-d2">
          <p>With expertise in AI-driven content creation, I help real estate projects create high-impact visuals that stand out in a cluttered market. From luxury estates to emerging developments, I craft visual stories that don&apos;t just showcase spaces, but build emotional connection and elevate perceived value. By blending real footage with advanced editing and modern visual techniques, I help audiences experience the property — not just view it.</p>
          <div className="cta-row">
            <a href="#work" className="btn-primary">
              Explore Our Work
              <span className="arrow-dot">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 6.5H11.5M11.5 6.5L7 2M11.5 6.5L7 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <div className="cta-subtext">Let&apos;s Build Something<br/>Meaningful Together</div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="packages-section" id="packages">
        <div className="packages-header reveal">
          <div>
            <div className="section-eyebrow">What&apos;s Included</div>
            <h2>Choose Your Package</h2>
          </div>
        </div>
        <div className="packages-grid">
          <div className="package-card reveal">
            <div className="pkg-num">#01</div>
            <div className="pkg-name">Essential</div>
            <div className="pkg-tagline">Get seen. Get remembered.</div>
            <ul className="pkg-features">
              <li><a href="https://www.instagram.com/p/DP3zzcggF9G/?hl=en" target="_blank" rel="noopener noreferrer">P2C property introduction reel</a></li>
              <li><a href="https://www.instagram.com/reel/DV_L5UcDFYj/?hl=en" target="_blank" rel="noopener noreferrer">VO amenities highlight reel</a></li>
              <li><a href="https://www.instagram.com/reel/DWRKqskoVyG/?hl=en" target="_blank" rel="noopener noreferrer">Scroll-stopping eye-catching reel</a></li>
            </ul>
            <div className="pkg-price">₹75,000 <span>/ 3 deliverables</span></div>
          </div>
          <div className="package-card featured reveal reveal-d1">
            <div className="pkg-num">#02</div>
            <div className="pkg-name">Signature</div>
            <div className="pkg-tagline">Convert attention into trust.</div>
            <ul className="pkg-features">
              <li><a href="https://www.google.com/search?q=P2C+property+introduction+reel+real+estate" target="_blank" rel="noopener noreferrer">Everything in The Essential</a></li>
              <li><a href="https://www.instagram.com/reel/DVJA78aDdfH/?hl=en" target="_blank" rel="noopener noreferrer">Location benefits reel</a></li>
              <li><a href="https://www.google.com/search?q=instagram+carousel+post+real+estate+marketing" target="_blank" rel="noopener noreferrer">Carousel post + 2 Instagram story images</a></li>
            </ul>
            <div className="pkg-price">₹1,10,000 <span>/ 5 deliverables</span></div>
          </div>
          <div className="package-card reveal reveal-d2">
            <div className="pkg-num">#03</div>
            <div className="pkg-name">Luxury</div>
            <div className="pkg-tagline">The film that defines the project.</div>
            <ul className="pkg-features">
              <li><a href="https://www.google.com/search?q=P2C+property+introduction+reel+real+estate" target="_blank" rel="noopener noreferrer">Everything in The Essential and Signature</a></li>
              <li><a href="https://www.google.com/search?q=cinematic+property+walkthrough+film+real+estate" target="_blank" rel="noopener noreferrer">Cinematic property walk-through film</a></li>
            </ul>
            <div className="pkg-price">₹1,75,000 <span>/ 6 deliverables</span></div>
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
              <a href="#">Karjan, Vadodara, Gujarat</a>
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
