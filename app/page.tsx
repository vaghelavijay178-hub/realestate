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
      {/* Cursor */}
      <div id="cursor" className="fixed w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-50" />
      <div id="cursor-ring" className="fixed w-9 h-9 border border-orange-500 rounded-full pointer-events-none z-40" />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Sell Homes <br /> <span className="text-orange-500">Faster.</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl">
          Cinematic + AI-powered real estate reels that make properties feel premium before site visits.
        </p>
      </section>

      {/* WORK (REELS) */}
      <section id="work" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Reels</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
          ].map((link, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-gray-900">
              <iframe
                className="w-full h-64"
                src={link}
                title="Reel"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.notion.so/Video-Editor-Portfolio-Vijay-Vaghela-280b288e18bc80cb833decbebf192941"
            target="_blank"
          >
            <button className="bg-white text-black px-6 py-3 rounded-2xl">
              View Full Portfolio
            </button>
          </a>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-20 px-6 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-12">Packages</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-2xl">
            <h3 className="text-xl">The Presence</h3>
            <p className="mt-2 text-gray-400">₹75,000</p>
          </div>

          <div className="border border-white p-6 rounded-2xl">
            <h3 className="text-xl">The Authority</h3>
            <p className="mt-2 text-gray-400">₹1,10,000</p>
          </div>

          <div className="border p-6 rounded-2xl">
            <h3 className="text-xl">The Legacy</h3>
            <p className="mt-2 text-gray-400">₹1,75,000</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">Let’s Work Together</h2>
        <a href="https://wa.me/91XXXXXXXXXX">
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-2xl">
            Contact Now
          </button>
        </a>
      </section>
    </div>
  );
}
