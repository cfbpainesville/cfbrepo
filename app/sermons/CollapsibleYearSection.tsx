"use client";

import { useState } from "react";
import type { SermonData } from "@/lib/data/sermons";

function SermonCard({ sermon }: { sermon: SermonData }) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'facebook':
        return '📘';
      case 'youtube':
        return '▶️';
      case 'powerpoint':
        return '📄';
      default:
        return '🎤';
    }
  };

  return (
    <a
      href={sermon.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-sky-50 transition-colors group border border-gray-100 hover:border-sky-200"
    >
      <span className="text-2xl flex-shrink-0">{getIconForType(sermon.type)}</span>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors truncate">
          {sermon.title}
        </h4>
        {sermon.speaker && (
          <p className="text-xs text-gray-600 truncate">Speaker: {sermon.speaker}</p>
        )}
      </div>
      <div className="text-xs text-gray-500 flex-shrink-0">
        {new Date(sermon.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
    </a>
  );
}

export default function CollapsibleYearSection({
  year,
  sermons,
  isExpanded = false
}: {
  year: number;
  sermons: SermonData[];
  isExpanded?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
      >
        <h3 className="text-2xl font-bold text-gray-900">{year}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {sermons.length} sermon{sermons.length !== 1 ? 's' : ''}
          </span>
          <svg
            className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sermons.map((sermon, index) => (
              <SermonCard key={`${sermon.date}-${index}`} sermon={sermon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
