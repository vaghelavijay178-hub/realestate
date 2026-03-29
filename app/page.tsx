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
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-3xl text-center mb-10">Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl">
            <h3>The Presence</h3>
            <p>₹75,000</p>
          </div>
          <div className="border p-6 rounded-xl">
            <h3>The Authority</h3>
            <p>₹1,10,000</p>
          </div>
          <div className="border p-6 rounded-xl">
            <h3>The Legacy</h3>
            <p>₹1,75,000</p>
          </div>
        </div>
      </section>
    </div>
  );
}
