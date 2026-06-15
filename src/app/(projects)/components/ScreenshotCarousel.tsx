"use client";

import { useState } from "react";

interface Screenshot {
  url: string;
  alt: string;
}

export default function ScreenshotCarousel({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [active, setActive] = useState(0);

  if (screenshots.length === 0) return null;

  return (
    <div>
      {/* Main image */}
      <div className="aspect-video rounded-xl overflow-hidden bg-bg-tertiary border border-border mb-3">
        <img
          src={screenshots[active].url}
          alt={screenshots[active].alt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {screenshots.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-20 aspect-video rounded-md overflow-hidden border-2 transition-all ${
                i === active
                  ? "border-accent-cyan"
                  : "border-transparent hover:border-text-dim"
              }`}
            >
              <img
                src={s.url}
                alt={s.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
