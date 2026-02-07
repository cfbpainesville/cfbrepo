"use client";

import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
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
// Supports both ISO date strings and plain text (e.g., "Every Thursday")
function formatEventTime(dateTimeStr: string): string {
  if (!dateTimeStr) return "";

  try {
    const date = new Date(dateTimeStr);

    // Check if date is valid - if not, return plain text as-is
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
  image: "/webp-background/calvary.webp",
};

// Map event names to specific background images
function getEventImage(eventName: string): string {
  const eventImageMap: Record<string, string> = {
    "Sunday Morning Services": "/webp-background/calvary.webp",
    "Morning Worship": "/webp-background/worship-hands.webp",
    "Sunday School": "/webp-background/children-crafts.webp",
    "Ladies Bible Study": "/webp-background/women-gathering.webp",
  };

  // Check for partial matches (case-insensitive)
  const lowerEventName = eventName.toLowerCase();
  for (const [key, value] of Object.entries(eventImageMap)) {
    if (lowerEventName.includes(key.toLowerCase())) {
      return value;
    }
  }

  // Default to time-date icon if no match
  return "/webp-icons/time-date-icon.webp";
}

interface EventsGalleryProps {
  events: Event[];
}

function EventsGalleryComponent({ events: serverEvents }: EventsGalleryProps) {
  // Map server events to use specific images based on event name
  const mappedEvents = serverEvents.map(event => ({
    ...event,
    image: getEventImage(event.name)
  }));

  // Combine initial event with server-fetched events
  const allEvents = [INITIAL_EVENT, ...mappedEvents];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel - exactly 7 seconds between transitions
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

    // Start autoplay with exactly 7000ms intervals
    autoplayIntervalRef.current = setInterval(() => {
      // Trigger flip animation
      setFlipDirection('right');
      setIsFlipping(true);

      // Change index after flip animation starts
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % allEvents.length);
      }, 300);

      // Reset flip state
      setTimeout(() => {
        setIsFlipping(false);
      }, 350);
    }, 7000); // Exactly 7000ms = 7 seconds

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
  }, [isAutoplay, allEvents.length]);

  const goToNext = () => {
    setFlipDirection('right');
    setIsFlipping(true);
    setIsAutoplay(false); // Stop autoplay when user manually navigates

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allEvents.length);
    }, 300);

    setTimeout(() => {
      setIsFlipping(false);
    }, 350);
  };

  const goToPrev = () => {
    setFlipDirection('left');
    setIsFlipping(true);
    setIsAutoplay(false); // Stop autoplay when user manually navigates

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allEvents.length) % allEvents.length);
    }, 300);

    setTimeout(() => {
      setIsFlipping(false);
    }, 350);
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
            <div className={`events-image-placeholder ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
              {currentEvent.image && currentEvent.image.startsWith('/') ? (
                <Image
                  src={currentEvent.image}
                  alt={currentEvent.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain mix-blend-multiply"
                  style={{ filter: 'contrast(1.1) brightness(0.95)' }}
                />
              ) : (
                currentEvent.image || "📅"
              )}
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
