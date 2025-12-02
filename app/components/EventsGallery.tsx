"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import "./events-gallery.css";

interface Event {
  id?: string;
  name: string;
  time: string;
  description?: string;
  image?: string;
}

const INITIAL_EVENT: Event = {
  name: "Sunday Worship",
  time: "11:00 AM",
  description: "Main worship service",
  image: "🙏",
};

function EventsGalleryComponent() {
  const [events, setEvents] = useState<Event[]>([INITIAL_EVENT]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch events from Airtable only when section becomes visible
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && events.length === 1) {
        fetchEvents();
      }
    }, options);

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [events.length]);

  // Fetch events from Airtable
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
      const token = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/Events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const fetchedEvents: Event[] = data.records.map((record: any) => ({
          id: record.id,
          name: record.fields["Event Name"] || "Event",
          time: record.fields["Date/Time"] || "",
          description: record.fields.Description || "",
          image: "📅",
        }));

        if (fetchedEvents.length > 0) {
          setEvents([INITIAL_EVENT, ...fetchedEvents]);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-play carousel (3.5 second interval) - optimized to reduce layout thrashing
  useEffect(() => {
    if (!isAutoplay || events.length <= 1) return;

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3500); // 3.5 seconds - good balance between readability and engagement

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isAutoplay, events.length]);

  // Prefetch next event image
  useEffect(() => {
    if (events.length <= 1) return;
    const nextIndex = (currentIndex + 1) % events.length;
    const nextEvent = events[nextIndex];
    // Prefetch to improve perceived performance
    if (nextEvent && typeof Image !== "undefined") {
      const img = new Image();
      img.src = nextEvent.image || "";
    }
  }, [currentIndex, events]);

  const goToEvent = (index: number) => {
    setCurrentIndex(index % events.length);
    setIsAutoplay(true);
  };

  const goToNext = () => {
    goToEvent(currentIndex + 1);
  };

  const goToPrev = () => {
    goToEvent(currentIndex - 1 + events.length);
  };

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  const currentEvent = events[currentIndex];

  return (
    <div
      ref={containerRef}
      className="events-gallery-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Event Display */}
      <div className="events-gallery-main">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="events-nav-btn events-nav-btn-left"
          aria-label="Previous event"
          disabled={isLoading}
        >
          ‹
        </button>

        {/* Event Card */}
        <div className="events-gallery-card">
          <div className="events-image-placeholder">
            {currentEvent.image || "📅"}
          </div>

          <div className="events-content">
            <h3 className="events-title">{currentEvent.name}</h3>
            <p className="events-time">⏰ {currentEvent.time}</p>
            {currentEvent.description && (
              <p className="events-description">{currentEvent.description}</p>
            )}
          </div>
        </div>

        <button
          onClick={goToNext}
          className="events-nav-btn events-nav-btn-right"
          aria-label="Next event"
          disabled={isLoading}
        >
          ›
        </button>
      </div>

      {/* Indicators */}
      <div className="events-indicators">
        {events.map((_, index) => (
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

      {/* Loading State */}
      {isLoading && (
        <div className="events-loading">
          <p>Loading more events...</p>
        </div>
      )}
    </div>
  );
}

export default memo(EventsGalleryComponent);
