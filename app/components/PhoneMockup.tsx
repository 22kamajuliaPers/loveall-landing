"use client";

import Image from "next/image";

interface PhoneMockupProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  offsetY?: number; // Subtle vertical offset for staggered positioning
  variant?: "full" | "peek"; // Display style: full phone or peek/crop
  cropOffsetY?: number; // Vertical offset for image positioning within crop (percentage)
  zoom?: number; // Zoom level for image (1.0 = 100%, 1.2 = 120%, etc.)
}

export default function PhoneMockup({
  imageSrc,
  alt = "LoveAll app screen",
  className = "",
  offsetY = 0,
  variant = "full",
  cropOffsetY = 0, // 0 = top, 50 = center, negative shifts up
  zoom = 1.0,
}: PhoneMockupProps) {
  const isPeek = variant === "peek";

  return (
    <div 
      className={`relative ${className}`}
      style={{
        transform: offsetY !== 0 ? `translateY(${offsetY}px)` : undefined,
      }}
    >
      {/* Subtle mint glow behind phone */}
      <div className="absolute inset-0 bg-[#4CF2C7]/5 blur-2xl rounded-[3rem] -z-10" />
      
      {/* Phone frame with optional crop viewport */}
      <div 
        className={`relative w-full max-w-[280px] mx-auto ${
          isPeek ? "overflow-hidden" : ""
        }`}
        style={
          isPeek
            ? {
                maxHeight: "480px", // Crop height for peek mode
              }
            : undefined
        }
      >
        {/* Phone body */}
        <div 
          className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border border-zinc-800/50"
          style={
            isPeek
              ? {
                  transform: `translateY(${cropOffsetY}px)`,
                }
              : undefined
          }
        >
          {/* Screen bezel - may be clipped by peek viewport */}
          <div 
            className={`relative bg-black rounded-[2rem] overflow-hidden ${
              isPeek ? "" : "aspect-[9/19.5]"
            }`}
            style={
              isPeek
                ? {
                    height: "460px", // Fixed height for peek (shows top portion)
                  }
                : undefined
            }
          >
            {/* Screen image with crop/zoom support */}
            <div
              className="relative w-full h-full"
              style={
                isPeek
                  ? {
                      transform: `scale(${zoom})`,
                      transformOrigin: "top center",
                    }
                  : undefined
              }
            >
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className={isPeek ? "object-top object-cover" : "object-cover"}
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>
            
            {/* Subtle top notch indicator (optional) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
          </div>
        </div>
        
        {/* Subtle bottom home indicator - hidden in peek mode */}
        {!isPeek && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 rounded-full" />
        )}
      </div>
    </div>
  );
}
