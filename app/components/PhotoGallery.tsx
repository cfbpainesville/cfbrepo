"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isInView || hasUserInteracted || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, hasUserInteracted, images.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setHasUserInteracted(true);
  };

  const goToPrev = () =>
    goTo((currentIndex - 1 + images.length) % images.length);
  const goToNext = () => goTo((currentIndex + 1) % images.length);

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Row: left arrow — image — right arrow */}
      <div className="flex items-center gap-2">
        {images.length > 1 && (
          <button
            onClick={goToPrev}
            aria-label="Previous photo"
            style={{
              background: "transparent",
              border: "none",
              color: "#006CD7",
              fontSize: "5rem",
              fontWeight: 300,
              lineHeight: 1,
              cursor: "pointer",
              padding: 0,
              transform: "scaleY(1.5)",
              transition: "transform 0.2s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#3D94E8";
              (e.currentTarget as HTMLButtonElement).style.transform = "scaleY(1.5) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#006CD7";
              (e.currentTarget as HTMLButtonElement).style.transform = "scaleY(1.5)";
            }}
          >
            ‹
          </button>
        )}

        <div
          className="relative rounded-lg overflow-hidden shadow-md"
          style={{ width: "min(384px, 70vw)", aspectRatio: "4/3" }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="384px"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <button
            onClick={goToNext}
            aria-label="Next photo"
            style={{
              background: "transparent",
              border: "none",
              color: "#006CD7",
              fontSize: "5rem",
              fontWeight: 300,
              lineHeight: 1,
              cursor: "pointer",
              padding: 0,
              transform: "scaleY(1.5)",
              transition: "transform 0.2s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#3D94E8";
              (e.currentTarget as HTMLButtonElement).style.transform = "scaleY(1.5) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#006CD7";
              (e.currentTarget as HTMLButtonElement).style.transform = "scaleY(1.5)";
            }}
          >
            ›
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-[#006CD7]" : "bg-gray-300"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
