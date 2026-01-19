"use client";

export default function OurValues() {
  // Logo positions: top (0°), right (90°), bottom (180°), left (270°)
  // rotationOffset: static rotation to make each logo appear upright
  const logos = [
    { name: "NFL", src: "/logos/NFL.png", angle: 0, rotationOffset: 0 },      // Top - no offset needed
    { name: "NBA", src: "/logos/NBA.png", angle: 90, rotationOffset: 270 },     // Right - rotate 270deg (90 + 180)
    { name: "MLB", src: "/logos/MLB.png", angle: 180, rotationOffset: 180 },    // Bottom - rotate 180deg
    { name: "MLS", src: "/logos/MLS.png", angle: 270, rotationOffset: 90 },     // Left - rotate 90deg (270 + 180 = 450, equivalent to 90)
  ];

  return (
    <section id="about" className="bg-white text-black py-20 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]">
          {/* Orbit Container */}
          <div className="orbit-container relative w-full h-full">
            {/* Rotating Orbit Ring */}
            <div
              className="orbit-ring absolute inset-0"
              style={{
                animation: "orbit-rotate 20s linear infinite",
                transformOrigin: "center center",
              }}
            >
              {/* Logos positioned around the circle */}
              {logos.map((logo) => {
                // Use rotate + translateX pattern for circular positioning
                // Radius is responsive via CSS custom property
                // Counter-rotate to keep logos upright as orbit rotates
                return (
                  <div
                    key={logo.name}
                    className="orbit-logo absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${logo.angle}deg) translateX(var(--orbit-radius, 140px))`,
                      transformOrigin: "0 0",
                      filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    {/* Counter-rotation wrapper: cancels out orbit rotation to keep logo upright */}
                    <div
                      className="orbit-logo-inner"
                      style={{
                        animation: "counter-rotate 20s linear infinite",
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                        style={{
                          objectFit: "contain",
                          display: "block",
                          transform: `translate(-50%, -50%) rotate(${logo.rotationOffset}deg)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Content */}
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Connect with others who share your sports identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
