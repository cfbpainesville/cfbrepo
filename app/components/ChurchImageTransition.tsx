"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ChurchImageTransition() {
  const [showSketch, setShowSketch] = useState(true);

  useEffect(() => {
    // Switch images every 5 seconds with a smooth fade
    const interval = setInterval(() => {
      setShowSketch((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-lg shadow-lg overflow-hidden border-4 border-[#130303]/15">
      {/* Real Photo - Bottom Layer */}
      <div
        className="transition-opacity duration-[2000ms] ease-in-out"
        style={{ opacity: showSketch ? 0 : 1 }}
      >
        <Image
          src="/cfb-church-image.webp"
          alt="Calvary Fellowship Building at 727 Mentor Avenue"
          width={1200}
          height={900}
          priority={true}
          loading="eager"
          quality={90}
          className="w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        />
      </div>

      {/* Artistic Sketch - Top Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
        style={{ opacity: showSketch ? 1 : 0 }}
      >
        <Image
          src="/church-artistic-sketch.webp"
          alt="Hand-drawn sketch of Calvary Fellowship Building"
          width={1200}
          height={900}
          priority={true}
          loading="eager"
          quality={90}
          className="w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        />
      </div>
    </div>
  );
}
