import React from "react";

export default function Website() {
  return (
    <div className="bg-black text-white font-sans">
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          We Don’t Just Shoot Properties.<br/>We Make Them Look Premium.
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          AI-Powered Cinematic Content for Builders & Real Estate Projects
        </p>
        <div className="mt-6 flex gap-4">
          <a href="#work">
            <button className="bg-white text-black px-6 py-3 rounded-2xl">View Work</button>
          </a>
          <a href="#packages">
            <button className="border border-white px-6 py-3 rounded-2xl">See Packages</button>
          </a>
        </div>
      </section>

      {/* VALUE */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <p className="text-xl">
          If your project looks average, it sells average.
        </p>
        <p className="mt-4 text-gray-300">
          We create AI-powered high-end video content that grabs attention,
          builds trust with buyers, and helps you stand out in a crowded market.
        </p>
      </section>

      {/* WORK */}
      {/* WORK */}
<section id="work" className="py-20 px-6">
  <div className="bg-gray-900 p-4 rounded-2xl">
  <iframe
    src="https://www.instagram.com/reel/XXXXXXXX/embed"
    className="w-full h-64 rounded-xl"
    allowFullScreen
  ></iframe>
  <p className="text-sm text-gray-400 mt-2">Project Reel</p>
</div>

        <div className="text-center mt-10">
          <a href="https://www.notion.so/Video-Editor-Portfolio-Vijay-Vaghela-280b288e18bc80cbebf192941" target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-black px-6 py-3 rounded-2xl">
              View Full Portfolio
            </button>
          </a>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-20 px-6 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-12">Visual Prestige Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">The Presence</h3>
            <p className="text-gray-400 mt-2">Get seen. Get remembered.</p>
            <p className="text-2xl mt-4">₹75,000</p>
            <ul className="mt-4 text-sm text-gray-300 space-y-2">
              <li>• Property Introduction Reel (AI)</li>
              <li>• VO Amenities Reel (AI)</li>
              <li>• Scroll-Stopping Reel (AI)</li>
            </ul>
          </div>

          <div className="border border-white p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">The Authority</h3>
            <p className="text-gray-400 mt-2">Convert attention into trust.</p>
            <p className="text-2xl mt-4">₹1,10,000</p>
            <ul className="mt-4 text-sm text-gray-300 space-y-2">
              <li>• Everything in Presence</li>
              <li>• Location Benefits Reel (AI)</li>
              <li>• Carousel + Stories (AI)</li>
            </ul>
          </div>

          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">The Legacy</h3>
            <p className="text-gray-400 mt-2">The film that defines the project.</p>
            <p className="text-2xl mt-4">₹1,75,000</p>
            <ul className="mt-4 text-sm text-gray-300 space-y-2">
              <li>• Everything in Authority</li>
              <li>• Cinematic Walkthrough Film (AI)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">Let’s Work Together</h2>
        <p className="text-gray-400 mt-4">Discuss your project and create premium visuals.</p>
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank">
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-2xl">
            Contact on WhatsApp
          </button>
        </a>
      </section>
    </div>
  );
}
