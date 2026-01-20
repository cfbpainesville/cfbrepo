"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./photo-carousel.css";

interface Photo {
  src: string;
  alt: string;
}

const GALLERY_PHOTOS: Photo[] = [
  {
    src: "/images/gallery/20250315_194554.jpg",
    alt: "Calvary Fellowship gathering",
  },
  {
    src: "/images/gallery/20250907_183638.jpg",
    alt: "Church fellowship",
  },
  {
    src: "/images/gallery/20251206_103302.jpg",
    alt: "Community worship",
  },
  {
    src: "/images/gallery/IMG_3144.jpg",
    alt: "Church service",
  },
];

interface PhotoCarouselProps {
  interval?: number; // milliseconds between transitions
  transitionDuration?: number; // milliseconds for fade transition
}

export default function PhotoCarousel({
  interval = 5000,
  transitionDuration = 1000,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % GALLERY_PHOTOS.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="photo-carousel">
      <div className="photo-carousel-container">
        {GALLERY_PHOTOS.map((photo, index) => (
          <div
            key={photo.src}
            className={`photo-carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="photo-carousel-image"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              quality={85}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="photo-carousel-indicators">
        {GALLERY_PHOTOS.map((_, index) => (
          <div
            key={index}
            className={`photo-carousel-indicator ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
