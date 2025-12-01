"use client";

import { createContext, useState, ReactNode } from "react";

interface MapModalContextType {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}

export const MapModalContext = createContext<MapModalContextType>({
  showMap: false,
  setShowMap: () => {},
});

export default function MapModalProvider({ children }: { children: ReactNode }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <MapModalContext.Provider value={{ showMap, setShowMap }}>
      {children}
    </MapModalContext.Provider>
  );
}
