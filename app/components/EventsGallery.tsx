"use client";

import { useState, useEffect, useRef, memo } from "react";
import "./events-gallery.css";

interface Event {
  id?: string;
  name: string;
  time: string;
  dateTime?: string; // Raw ISO date string for client-side formatting
  description?: string;
  image?: string;
}

// Format date/time in the user's local timezone
function formatEventTime(dateTimeStr: string): string {
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

  // Auto-play carousel (5 second interval) - optimized to reduce main-thread work
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
      setCurrentIndex((prev) => (prev + 1) % allEvents.length);
    }, 5000); // 5 seconds - reduces CPU usage while maintaining engagement

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
  }, [isAutoplay, allEvents.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allEvents.length);
    setIsAutoplay(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allEvents.length) % allEvents.length);
    setIsAutoplay(true);
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
            <p className="events-time">
              ⏰ {currentEvent.dateTime ? formatEventTime(currentEvent.dateTime) : currentEvent.time}
            </p>
            {currentEvent.description && (
              <p className="events-description">{currentEvent.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="events-indicators" role="status" aria-live="polite">
        {allEvents.map((_, index) => (
          <div
            key={index}
            className={`events-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            aria-label={index === currentIndex ? `Currently showing event ${index + 1} of ${allEvents.length}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(EventsGalleryComponent);
