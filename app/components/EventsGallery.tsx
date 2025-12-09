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
  name: "Sunday Morning Services",
  time: "10:00 AM - 12:00 PM",
  description: "Sunday School @ 10 AM • Morning Worship @ 11 AM",
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

    let hasTriggered = false;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && events.length === 1 && !hasTriggered) {
        hasTriggered = true;
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
  }, []); // Remove events.length from dependencies

  // Format date/time from Airtable to user-friendly format
  const formatEventTime = (dateTimeStr: string): string => {
    if (!dateTimeStr) return "";

    try {
      const date = new Date(dateTimeStr);

      // Check if date is valid
      if (isNaN(date.getTime())) return dateTimeStr;

      // Format date as "Day, Month Date" (e.g., "Sunday, December 15")
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      const dayNumber = date.getDate();

      // Format time as "H:MM AM/PM"
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return `${dayName}, ${monthName} ${dayNumber} @ ${timeStr}`;
    } catch (error) {
      // If parsing fails, return original string
      return dateTimeStr;
    }
  };

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
          time: formatEventTime(record.fields["Date/Time"] || ""),
          description: record.fields.Description || "",
          image: "📅",
        }));

        if (fetchedEvents.length > 0) {
          setEvents([INITIAL_EVENT, ...fetchedEvents]);
          // Reset to first event when new events are loaded
          setCurrentIndex(0);
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
    if (!isAutoplay || events.length <= 1) {
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
        const next = (prev + 1) % events.length;
        return next;
      });
    }, 3500); // 3.5 seconds - good balance between readability and engagement

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
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
    // Ensure index is positive before modulo
    const normalizedIndex = ((index % events.length) + events.length) % events.length;
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
