"use client";
import { useState } from "react";

export default function ReelsSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const reels = [
    {
      thumbnail: "/reel1.jpg",
      video: "https://www.youtube.com/embed/VIDEO_ID",
    },
    {
      thumbnail: "/reel2.jpg",
      video: "https://www.youtube.com/embed/VIDEO_ID",
    },
    {
      thumbnail: "/reel3.jpg",
      video: "https://www.youtube.com/embed/VIDEO_ID",
    },
    {
      thumbnail: "/reel4.jpg",
      video: "https://www.youtube.com/embed/VIDEO_ID",
    },
  ];

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="mb-10">
        <p className="text-orange-500 text-sm">SELECTED WORK</p>
        <h2 className="text-4xl md:text-5xl font-bold">RECENT REELS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {reels.map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setActiveVideo(item.video)}
          >
            <img
              src={item.thumbnail}
              className="rounded-2xl w-full h-[350px] object-cover"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition rounded-2xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 text-xl group-hover:scale-110 transition">
                ▶
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[800px]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <iframe
              src={activeVideo}
              className="w-full h-[450px] rounded-xl"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
