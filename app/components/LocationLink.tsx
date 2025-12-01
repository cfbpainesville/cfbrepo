"use client";

import { useContext } from "react";
import { MapModalContext } from "@/app/providers/MapModalProvider";
import "./location-link.css";

export default function LocationLink() {
  const { setShowMap } = useContext(MapModalContext);

  return (
    <button
      onClick={() => setShowMap(true)}
      className="location-link-btn"
    >
      <p className="location-text">
        📍 Located at 727 Mentor Avenue, Painesville, OH
      </p>
    </button>
  );
}
