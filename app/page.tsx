"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const reels = [
    {
      thumbnail: "/reel1.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Project Reel 1",
    },
    {
      thumbnail: "/reel1.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Project Reel 2",
    },
    {
      thumbnail: "/reel1.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Project Reel 3",
    },
  ];

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

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold">
          AI-Powered Real Estate Films
        </h1>
      </section>

      {/* REELS SECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl mb-10">Recent Work</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reels.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => setActiveVideo(item.video)}
            >
              <img
                src={item.thumbnail}
                className="rounded-xl mb-2"
              />
              <p className="text-sm text-gray-400">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="w-[90%] md:w-[700px]">
            <button
              onClick={() => setActiveVideo(null)}
              className="mb-4"
            >
              Close
            </button>
            <iframe
              src={activeVideo}
              className="w-full h-[400px]"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-400">
        © 2025 Vijay Vaghela
      </footer>
    </div>
  );
}
