"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Cursor
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

    // Sticky nav
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", onScroll);

    // Scroll reveal
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

    // Hero entrance animation
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
          --orange: #F4500A;
          --orange-light: #FF6B2B;
          --black: #0A0A0A;
          --dark: #111111;
          --dark-2: #181818;
          --gray: #2A2A2A;
          --text-muted: #888;
          --text-dim: #555;
          --white: #FFFFFF;
          --off-white: #F0EDE8;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--black);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }
        .cursor {
          width: 12px; height: 12px;
          background: var(--orange);
          border-radius: 50%;
          position: fixed; top: 0; left: 0;
          pointer-events: none; z-index: 9999;
          transition: transform 0.15s ease, width 0.3s, height 0.3s;
          transform: translate(-50%, -50%);
        }
        .cursor-ring {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(244,80,10,0.5);
          border-radius: 50%;
          position: fixed; top: 0; left: 0;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 48px;
          background: linear-gradient(to bottom, rgba(10,10,10,0.95), transparent);
          transition: background 0.3s;
        }
        nav.scrolled { background: rgba(10,10,10,0.97); backdrop-filter: blur(12px); }
        .nav-logo {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem;
          letter-spacing: 0.06em; color: var(--white); text-decoration: none;
        }
        .nav-logo span { color: var(--orange); }
        .nav-links { display: flex; align-items: center; gap: 36px; }
        .nav-links a {
          color: rgba(255,255,255,0.65); text-decoration: none;
          font-size: 0.85rem; font-weight: 400; letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--white); }
        .btn-cta {
          display: flex; align-items: center; gap: 10px;
          background: var(--white); color: var(--black);
          border: none; border-radius: 100px;
          padding: 10px 22px; font-size: 0.85rem; font-weight: 500;
          cursor: none; text-decoration: none; transition: background 0.25s;
        }
        .btn-cta:hover { background: var(--off-white); }
        .btn-cta .arrow-dot {
          width: 28px; height: 28px; background: var(--orange);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 48px 60px; overflow: hidden;
          border-radius: 0 0 32px 32px;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #1a0800 0%, #8B2500 35%, #D44010 65%, #F4500A 100%);
          z-index: 0;
        }
        .hero-bg::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 60% 40%, rgba(244,80,10,0.35) 0%, transparent 60%),
                      radial-gradient(ellipse at 10% 80%, rgba(0,0,0,0.7) 0%, transparent 50%);
        }
        .hero-video-frame {
          position: absolute; inset: 0; z-index: 1;
          background:
            radial-gradient(ellipse at 70% 55%, rgba(20,8,0,0.45) 0%, transparent 55%),
            linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%),
            linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 40%);
        }
        .hero-noise {
          position: absolute; inset: 0; z-index: 2; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .hero-property-tag {
          position: absolute; top: 52%; right: 72px; z-index: 5;
          background: rgba(10,10,10,0.65); backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
          padding: 18px 22px; min-width: 220px;
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .property-tag-label {
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px;
        }
        .property-tag-title { font-size: 0.95rem; font-weight: 500; color: var(--white); margin-bottom: 10px; }
        .property-tag-stats { display: flex; gap: 14px; }
        .stat-item { text-align: center; }
        .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: var(--white); line-height: 1; }
        .stat-label { font-size: 0.62rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .play-badge {
          position: absolute; top: 38%; left: 50%;
          transform: translate(-50%,-50%); z-index: 5;
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(244,80,10,0.15); border: 1.5px solid rgba(244,80,10,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: none; transition: background 0.3s, transform 0.3s;
          animation: pulse-ring 2.5s ease-in-out infinite; text-decoration: none;
        }
        .play-badge:hover { background: rgba(244,80,10,0.35); transform: translate(-50%,-50%) scale(1.1); }
        @keyframes pulse-ring {
          0%,100%{ box-shadow: 0 0 0 0 rgba(244,80,10,0.3); }
          50%{ box-shadow: 0 0 0 18px rgba(244,80,10,0); }
        }
        .hero-content { position: relative; z-index: 5; }
        .hero-eyebrow {
          font-family: 'Space Mono', monospace; font-size: 0.75rem;
          color: rgba(255,255,255,0.6); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 11vw, 10rem);
          line-height: 0.92; letter-spacing: 0.01em; color: var(--white); margin-bottom: 24px;
        }
        .hero-title em { color: var(--orange); font-style: normal; }
        .hero-tagline {
          position: absolute; right: 0; bottom: 0;
          max-width: 280px; text-align: right; z-index: 5;
        }
        .hero-tagline h3 { font-size: 1.15rem; font-weight: 500; line-height: 1.35; color: var(--white); margin-bottom: 8px; }
        .hero-tagline p { font-size: 0.8rem; color: rgba(255,255,255,0.55); line-height: 1.6; }
        .hero-services {
          display: flex; gap: 40px; margin-top: 40px; padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.12); position: relative; z-index: 5;
        }
        .hero-service-item { display: flex; flex-direction: column; gap: 4px; }
        .service-num { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--orange); letter-spacing: 0.1em; }
        .service-name { font-size: 0.78rem; color: rgba(255,255,255,0.65); font-weight: 300; }
        .trusted-strip {
          background: var(--dark); padding: 28px 48px;
          display: flex; align-items: center; gap: 48px;
          border-bottom: 1px solid var(--gray); overflow: hidden;
        }
        .trusted-label { font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; line-height: 1.5; flex-shrink: 0; }
        .trusted-brands { display: flex; gap: 36px; align-items: center; overflow: hidden; flex: 1; }
        .brand-item { display: flex; align-items: center; gap: 10px; white-space: nowrap; opacity: 0.45; transition: opacity 0.3s; }
        .brand-item:hover { opacity: 0.85; }
        .brand-icon {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.62rem; font-family: 'Space Mono', monospace;
        }
        .brand-name { font-size: 0.85rem; font-weight: 400; color: var(--white); }
        .about-section {
          padding: 100px 48px; background: var(--black);
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .section-eyebrow {
          font-family: 'Space Mono', monospace; font-size: 0.7rem;
          color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px;
        }
        .about-left h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1.0; letter-spacing: 0.02em; color: var(--white);
        }
        .about-right p { font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 20px; }
        .about-right strong { color: var(--white); font-weight: 500; }
        .cta-row { display: flex; align-items: center; gap: 20px; margin-top: 32px; }
        .btn-primary {
          display: flex; align-items: center; gap: 10px;
          background: var(--orange); color: var(--white);
          border-radius: 100px; padding: 12px 24px;
          font-size: 0.85rem; font-weight: 500; text-decoration: none;
          cursor: none; transition: background 0.25s;
        }
        .btn-primary:hover { background: var(--orange-light); }
        .btn-primary .arrow-dot {
          width: 26px; height: 26px; background: rgba(255,255,255,0.2);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
        .cta-subtext { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; }
        .packages-section { padding: 80px 48px 100px; background: var(--dark); }
        .packages-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
        .packages-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; line-height: 1; }
        .packages-header p { max-width: 280px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; text-align: right; }
        .packages-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; background: var(--gray); border-radius: 24px; overflow: hidden;
        }
        .package-card { background: var(--dark-2); padding: 40px 36px; transition: background 0.3s; position: relative; }
        .package-card:hover { background: #1e1e1e; }
        .package-card.featured { background: var(--orange); }
        .package-card.featured:hover { background: var(--orange-light); }
        .pkg-num { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; margin-bottom: 24px; }
        .package-card.featured .pkg-num { color: rgba(255,255,255,0.6); }
        .pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.03em; color: var(--white); margin-bottom: 8px; }
        .pkg-tagline { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 28px; line-height: 1.5; }
        .package-card.featured .pkg-tagline { color: rgba(255,255,255,0.7); }
        .pkg-features { list-style: none; margin-bottom: 32px; }
        .pkg-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.8rem; color: rgba(255,255,255,0.6);
          padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); line-height: 1.4;
        }
        .package-card.featured .pkg-features li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.15); }
        .pkg-features li::before { content: '—'; color: var(--orange); font-size: 0.7rem; flex-shrink: 0; margin-top: 2px; }
        .package-card.featured .pkg-features li::before { color: rgba(255,255,255,0.8); }
        .pkg-price { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: var(--white); line-height: 1; }
        .pkg-price span { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 300; color: rgba(255,255,255,0.45); }
        .package-card.featured .pkg-price span { color: rgba(255,255,255,0.6); }
        .work-section { padding: 80px 48px 100px; background: var(--black); }
        .work-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
        .work-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.8rem, 4.5vw, 4rem); letter-spacing: 0.02em; }
        .work-header a { font-size: 0.8rem; color: var(--orange); text-decoration: none; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px; transition: gap 0.2s; }
        .work-header a:hover { gap: 10px; }
        .reels-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .reel-card { position: relative; aspect-ratio: 4/5; border-radius: 18px; overflow: hidden; background: var(--dark-2); cursor: none; }
        .reel-card:first-child { grid-column: span 2; aspect-ratio: 16/9; }
        .reel-bg {
          position: absolute; inset: 0; filter: grayscale(1) contrast(1.1);
          background-size: cover; background-position: center;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s;
        }
        .reel-card:hover .reel-bg { transform: scale(1.06); filter: grayscale(0.5) contrast(1.1); }
        .reel-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.1) 55%, transparent 100%); z-index: 1; }
        .reel-info { position: absolute; bottom: 20px; left: 20px; right: 20px; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; }
        .reel-title { font-size: 0.85rem; font-weight: 500; color: var(--white); margin-bottom: 4px; }
        .reel-meta { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.5); letter-spacing: 0.08em; text-transform: uppercase; }
        .reel-play {
          width: 40px; height: 40px; background: rgba(244,80,10,0.85);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; opacity: 0; transform: scale(0.8);
          transition: opacity 0.3s, transform 0.3s;
        }
        .reel-card:hover .reel-play { opacity: 1; transform: scale(1); }
        .stats-section {
          padding: 60px 48px; background: var(--dark);
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--gray); border-bottom: 1px solid var(--gray);
        }
        .stat-block { padding: 36px 32px; background: var(--dark); }
        .stat-block:not(:last-child) { border-right: 1px solid var(--gray); }
        .stat-big { font-family: 'Bebas Neue', sans-serif; font-size: 4rem; color: var(--white); line-height: 1; margin-bottom: 6px; }
        .stat-big span { color: var(--orange); }
        .stat-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }
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
        .social-btn {
          width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--gray);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.75rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .social-btn:hover { border-color: var(--orange); color: var(--orange); }
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
        .reveal-d4 { transition-delay: 0.4s; }
        @media (max-width: 768px) {
          nav { padding: 18px 24px; }
          .nav-links { display: none; }
          .hero { padding: 0 24px 48px; }
          .hero-property-tag { display: none; }
          .hero-tagline { display: none; }
          .about-section { grid-template-columns: 1fr; padding: 60px 24px; gap: 36px; }
          .packages-section { padding: 60px 24px; }
          .packages-grid { grid-template-columns: 1fr; }
          .work-section { padding: 60px 24px; }
          .reels-grid { grid-template-columns: 1fr 1fr; }
          .reel-card:first-child { grid-column: span 2; }
          .stats-section { grid-template-columns: 1fr 1fr; padding: 40px 24px; }
          .stat-block:nth-child(2) { border-right: none; }
          .trusted-strip { padding: 20px 24px; }
          footer { padding: 48px 24px 32px; }
          .footer-top { flex-direction: column; gap: 36px; }
          .footer-links { gap: 36px; }
        }
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav ref={navRef}>
        <a href="#" className="nav-logo">Vijay<span>Vaghela</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#packages">Packages</a>
          <a href="#work">Work</a>
          <a href="#contact" className="btn-cta">
            Book a Shoot
            <span className="arrow-dot">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-video-frame" />
        <div className="hero-noise" />

        <a href="#work" className="play-badge">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M7 4.5L17.5 11L7 17.5V4.5Z" fill="white"/>
          </svg>
        </a>

        <div className="hero-property-tag">
          <div className="property-tag-label">OUR STANDARD</div>
          <div className="property-tag-title">AI-POWERED CINEMATIC TOUR</div>
          <div className="property-tag-stats">
            <div className="stat-item"><div className="stat-num">4K</div><div className="stat-label">CINEMATIC</div></div>
            <div className="stat-item"><div className="stat-num">AI</div><div className="stat-label">ENHANCED</div></div>
            <div className="stat-item"><div className="stat-num">AI</div><div className="stat-label">STAGING</div></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">Ai powered Real Estate Video Services</div>
          <h1 className="hero-title">AI-Driven<br/><em>Property Films</em></h1>
        </div>

        <div className="hero-tagline">
          <h3>Every frame tells a story buyers can&apos;t ignore.</h3>
        </div>

        <div className="hero-services">
          {[["#01","Drone Aerial"],["#02","Walkthrough Film"],["#03","Eye catching reels"],["#04","Property Highlights"]].map(([num, name]) => (
            <div className="hero-service-item" key={num}>
              <span className="service-num">{num}</span>
              <span className="service-name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-left reveal">
          <div className="section-eyebrow">Vision that</div>
          <h2>Shaping Visuals That Sell Property Before Open Day</h2>
        </div>
        <div className="about-right reveal reveal-d2">
          <p>With expertise in AI-driven content creation, I help real estate projects create high-impact visuals that stand out in a cluttered market.

From luxury estates to emerging developments, I craft visual stories that don’t just showcase spaces, but build emotional connection and elevate perceived value. My work is designed to capture attention instantly and give builders and agents a clear competitive edge.

By blending real footage with advanced editing and modern visual techniques, I help audiences experience the property — not just view it.</p>
          <div className="cta-row">
            <a href="#contact" className="btn-primary">
              Let&apos;s Work Together
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

      {/* PACKAGES */}
      <section className="packages-section" id="packages">
        <div className="packages-header reveal">
          <div>
            <div className="section-eyebrow">What&apos;s Included</div>
            <h2>Choose Your Package</h2>
          </div>
          <p>premium option for people who take their business seriously.</p>
        </div>
        <div className="packages-grid">
          <div className="package-card reveal">
            <div className="pkg-num">#01</div>
            <div className="pkg-name">Essential</div>
            <div className="pkg-tagline"> Get seen. Get remembered.</div>
            <ul className="pkg-features">
              <li>P2C property introduction reel</li>
              <li>VO amenities highlight reel</li>
              <li>Scroll-stopping eye-catching reel</li>
            </ul>
            <div className="pkg-price">₹75,000 <span>/ 3 deliverables</span></div>
          </div>
          <div className="package-card featured reveal reveal-d1">
            <div className="pkg-num">#02</div>
            <div className="pkg-name">Signature</div>
            <div className="pkg-tagline">Convert attention into trust.</div>
            <ul className="pkg-features">
              <li>Everything in The Essential</li>
              <li>Location benefits reel</li>
              <li>Carousel post + 2 Instagram story images</li>
            </ul>
            <div className="pkg-price">₹1,10,000 <span>/ 5 deliverables</span></div>
          </div>
          <div className="package-card reveal reveal-d2">
            <div className="pkg-num">#03</div>
            <div className="pkg-name">Luxury</div>
            <div className="pkg-tagline">The film that defines the project.</div>
            <ul className="pkg-features">
              <li>Everything in The Essential and Signature</li>
              <li>Cinematic property walk-through film</li>
            </ul>
            <div className="pkg-price">₹1,75,000 <span>/ 6 deliverables</span></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section">
        {[
          ["120","+","Properties filmed across Gujarat & beyond"],
          ["3","×","Faster average sale for video-listed homes"],
          ["4","K","Ultra-HD drone & ground footage, every shoot"],
          ["98","%","Client satisfaction — agents keep coming back"],
        ].map(([num, suffix, desc], i) => (
          <div className={`stat-block reveal${i > 0 ? ` reveal-d${i}` : ""}`} key={num+suffix}>
            <div className="stat-big">{num}<span>{suffix}</span></div>
            <div className="stat-desc">{desc}</div>
          </div>
        ))}
      </div>

      {/* WORK / REELS */}
     <section className="py-20 px-6 bg-black text-white">
  <div className="flex justify-between items-center mb-10">
    <div>
      <p className="text-orange-500 text-sm">SELECTED WORK</p>
      <h2 className="text-4xl md:text-5xl font-bold">RECENT REELS</h2>
    </div>

    <a
      href="https://www.instagram.com/"
      target="_blank"
      className="text-sm text-orange-500 hover:underline"
    >
      View All Projects →
    </a>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
    
    {/* Reel Card */}
    <a
      href="https://www.instagram.com/reel/XXXXXXXX/"
      target="_blank"
      className="relative group"
    >
      <img
        src="/reel1.jpg"
        className="rounded-2xl w-full h-[350px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition rounded-2xl" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 text-xl group-hover:scale-110 transition">
          ▶
        </div>
      </div>
    </a>

    {/* Reel Card 2 */}
    <a
      href="https://www.instagram.com/p/DWG5fOOjAZQ/"
      target="_blank"
      className="relative group"
    >
      <img
        src="/reel2.jpg"
        className="rounded-2xl w-full h-[350px] object-cover"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition rounded-2xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 text-xl group-hover:scale-110 transition">
          ▶
        </div>
      </div>
    </a>

  </div>
</section>
      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-top">
          <div>
            <a href="#" className="footer-logo">Frame<span>Shot</span></a>
            <div className="footer-tagline">Cinematic real estate video for agents who don&apos;t settle.</div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#">Drone Aerials</a>
              <a href="#">Walkthrough Reels</a>
              <a href="#">Social Cuts</a>
              <a href="#">Twilight Shoots</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="#">hello@frameshot.in</a>
              <a href="#">+91 98765 43210</a>
              <a href="#">Vadodara, Gujarat</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 FrameShot. All rights reserved.</div>
          <div className="footer-socials">
            <a href="#" className="social-btn">IG</a>
            <a href="#" className="social-btn">YT</a>
            <a href="#" className="social-btn">WA</a>
          </div>
        </div>
      </footer>
    </>
  );
}
