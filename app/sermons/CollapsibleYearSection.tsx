"use client";

import { useState } from "react";
import Image from "next/image";
import type { SermonData } from "@/lib/data/sermons";

function SermonCard({ sermon }: { sermon: SermonData }) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'facebook':
        return '/webp-icons/video-play-icon.webp';
      case 'youtube':
        return '/webp-icons/video-play-icon.webp';
      case 'powerpoint':
        return '/webp-icons/file-icon.webp';
      default:
        return '/webp-icons/microphone-icon.webp';
    }
  };

  return (
    <a
      href={sermon.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-[#C5D5E4] transition-colors group border border-gray-100 hover:border-sky-200"
    >
      <div className="w-10 h-10 flex-shrink-0">
        <Image
          src={getIconForType(sermon.type)}
          alt={sermon.type}
          width={40}
          height={40}
          className="w-full h-full object-contain mix-blend-multiply"
          style={{ filter: 'contrast(1.1) brightness(0.95)' }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 group-hover:text-[#006CD7] transition-colors truncate">
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
        className="w-full px-6 py-4 bg-[#D9E5F0] hover:bg-gray-100 transition-colors flex justify-between items-center"
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
