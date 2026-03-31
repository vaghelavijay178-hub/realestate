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
  <h2 className="text-4xl font-bold mb-10">Short Form Content</h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* Instagram Reel */}
    <div className="rounded-2xl overflow-hidden">
      <iframe
        src="<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DWG5fOOjAZQ/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DWG5fOOjAZQ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DWG5fOOjAZQ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by @ratnam.aangan</a></p></div></blockquote>
<script async src="//www.instagram.com/embed.js"></script>"
        className="w-full h-[420px]"
        allowFullScreen
      />
    </div>

    {/* YouTube */}
    <div className="rounded-2xl overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        className="w-full h-[420px]"
        allowFullScreen
      />
    </div>

    {/* Add more like this */}

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
