"use client";

import { useState, useEffect, useRef, memo } from "react";
import "./events-gallery.css";

interface Event {
  id?: string;
  name: string;
  time: string;
  description?: string;
  image?: string;
}

const INITIAL_EVENT: Event = {
  name: "Sunday Morning Services",
  time: "10:00 AM - 12:00 PM",
  description: "Sunday School @ 10 AM • Morning Worship @ 11 AM",
  image: "🙏",
};

interface EventsGalleryProps {
  events: Event[];
}

function EventsGalleryComponent({ events: serverEvents }: EventsGalleryProps) {
  // Combine initial event with server-fetched events
  const allEvents = [INITIAL_EVENT, ...serverEvents];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel (3.5 second interval) - optimized to reduce layout thrashing
  useEffect(() => {
    if (!isAutoplay || allEvents.length <= 1) {
      // Clear any existing interval if autoplay is disabled or only one event
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval before creating a new one
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % allEvents.length;
        return next;
      });
    }, 3500); // 3.5 seconds - good balance between readability and engagement

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
  }, [isAutoplay, allEvents.length]);

  // Prefetch next event image (only for actual image URLs, not emojis)
  useEffect(() => {
    if (allEvents.length <= 1) return;
    const nextIndex = (currentIndex + 1) % allEvents.length;
    const nextEvent = allEvents[nextIndex];
    // Only prefetch if it's an actual image URL (starts with http/https or /)
    const imageUrl = nextEvent?.image || "";
    if (imageUrl && typeof Image !== "undefined" && (imageUrl.startsWith('http') || imageUrl.startsWith('/'))) {
      const img = new Image();
      img.src = imageUrl;
    }
  }, [currentIndex, allEvents]);

  const goToEvent = (index: number) => {
    // Ensure index is positive before modulo
    const normalizedIndex = ((index % allEvents.length) + allEvents.length) % allEvents.length;
    setCurrentIndex(normalizedIndex);

    // Clear and restart autoplay
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
    setIsAutoplay(true);
  };

  const goToNext = () => {
    goToEvent(currentIndex + 1);
  };

  const goToPrev = () => {
    goToEvent(currentIndex - 1 + allEvents.length);
  };

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  const currentEvent = allEvents[currentIndex];

  return (
    <div
      className="events-gallery-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Event Display */}
      <div className="events-gallery-main">
        {/* Event Card */}
        <div className="events-gallery-card">
          <div className="events-card-top">
            {/* Left Navigation Button */}
            <button
              onClick={goToPrev}
              className="events-nav-btn events-nav-btn-left"
              aria-label="Previous event"
            >
              ‹
            </button>

            {/* Event Icon */}
            <div className="events-image-placeholder">
              {currentEvent.image || "📅"}
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={goToNext}
              className="events-nav-btn events-nav-btn-right"
              aria-label="Next event"
            >
              ›
            </button>
          </div>

          <div className="events-content">
            <h3 className="events-title">{currentEvent.name}</h3>
            <p className="events-time">⏰ {currentEvent.time}</p>
            {currentEvent.description && (
              <p className="events-description">{currentEvent.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="events-indicators">
        {allEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToEvent(index)}
            className={`events-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(EventsGalleryComponent);
