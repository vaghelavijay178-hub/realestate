"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");

    const move = (e: MouseEvent) => {
      if (!cursor || !ring) return;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
      }, 80);
    };

    document.addEventListener("mousemove", move);

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg-black text-white">
      {/* CURSOR */}
      <div id="cursor" className="fixed w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-50" />
      <div id="cursor-ring" className="fixed w-8 h-8 border border-orange-500 rounded-full pointer-events-none z-40" />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Sell Homes <span className="text-orange-500">Faster</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl">
          Cinematic + AI-powered real estate content that makes projects impossible to ignore.
        </p>
      </section>

      {/* WORK */}
      <section className="py-20 px-6">
        <h2 className="text-3xl text-center mb-10">Reels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <iframe
            className="w-full h-[400px] rounded-xl"
            src="https://www.instagram.com/reel/"
          />
          <iframe
            className="w-full h-[400px] rounded-xl"
            src="https://www.instagram.com/reel/"
          />
          <iframe
            className="w-full h-[400px] rounded-xl"
            src="https://www.instagram.com/reel/"
          />
        </div>
      </section>

      {/* PACKAGES */}
      [
  {
    name: "The Presence",
    tagline: "Get seen. Get remembered.",
    price: "₹75,000 / package",
    deliverables: [
      "P2C property introduction reel AI — Hook-first, brand-aware, built for reach",
      "VO amenities highlight reel AI — Why choose this property — narrated & visual",
      "Scroll-stopping eye-catching reel AI — No hard sell — pure visual impact",
    ],
  },
  {
    name: "The Authority",
    tagline: "Convert attention into trust.",
    price: "₹1,10,000 / package",
    deliverables: [
      "Everything in The Presence, plus:",
      "Location benefits reel AI — Why this area? Connectivity, growth, lifestyle",
      "Carousel post + 2 Instagram story images AI — Re-engage warm followers — a visual nudge to act",
      "Best for projects launching bookings or pre-sales. Social content keeps the project alive between reels.",
    ],
  },
  {
    name: "The Legacy",
    tagline: "The film that defines the project.",
    price: "₹1,75,000 / package",
    deliverables: [
      "Everything in The Authority, plus:",
      "Cinematic property walk-through film AI — 2-min hero film — P2C, VO, luxury feel & text lines. The showreel that defines the entire project.",
      "The walk-through film is what investors, NRI buyers & premium builders expect. Everything else amplifies it.",
    ],
  },
];

const addOns = [
  { name: "Extra scroll-stopping reel", price: "₹30,000" },
  { name: "Extra VO amenities reel", price: "₹30,000" },
  { name: "Extra location reel", price: "₹25,000" },
  { name: "Extra carousel + 2 stories", price: "₹15,000" },
  { name: "Monthly retainer (2 reels/mo)", price: "₹55,000/mo" },
];

export default function PackagesSection() {
  return (
    <section className="bg-gray-900 text-white px-6 md:px-12 py-20" id="packages">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-bebas">Our Packages</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`bg-gray-800 rounded-2xl p-8 flex flex-col justify-between hover:bg-orange-600 transition-colors duration-300`}
          >
            <div>
              <h3 className="text-2xl font-bold font-bebas mb-2">{pkg.name}</h3>
              <p className="text-orange-400 mb-4">{pkg.tagline}</p>
              <p className="text-3xl font-bold mb-6">{pkg.price}</p>
              <ul className="space-y-2 text-sm">
                {pkg.deliverables.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-orange-400">—</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-6 font-bebas">Add-ons</h3>
        <div className="flex flex-col md:flex-row justify-center flex-wrap gap-6">
          {addOns.map((a, i) => (
            <div key={i} className="bg-gray-800 rounded-xl px-6 py-4 hover:bg-orange-600 transition-colors duration-300">
              <p className="font-semibold">{a.name}</p>
              <p className="text-orange-400">{a.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

