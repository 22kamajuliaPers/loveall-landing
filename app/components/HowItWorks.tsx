"use client";




import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GlowPanel from "./GlowPanel";




interface StepAnimationState {
  number: boolean;
  text: boolean;
  phone: boolean;
}




const steps = [
  {
    number: 1,
    title: "Build your sports identity",
    subtext: "Your profile centers around your teams, rivalries, game-day habits — at the stadium, at home, or at the bar.",
    image: "/images/how-1-watch-sports.png",
    phoneOffsetY: 0,
    variant: "peek" as const,
    cropOffsetY: 0, // Shift phone body up/down (pixels)
    zoom: 1.0, // Zoom level for image content
  },
  {
    number: 2,
    title: "We narrow, not expand",
    subtext: "Fewer picks. Higher signal. No endless scroll.",
    image: "/images/how-2-watch-sports.png",
    phoneOffsetY: -8,
  },
  {
    number: 3,
    title: "Matches are intentional",
    subtext: "Limited slots. Conversations matter.",
    image: "/images/how-3-watch-sports.png",
    phoneOffsetY: 8,
  },
  {
    number: 4,
    title: "Meet at the game",
    subtext: "LoveAll surfaces real upcoming games based on your shared fandoms. Plan a first meeting around something you both already wanted to do.",
    image: "/images/how-4-watch-sports.png",
    phoneOffsetY: -12,
  },
];




export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stepStates, setStepStates] = useState<StepAnimationState[]>(
    steps.map(() => ({ number: false, text: false, phone: false }))
  );
  const [hasAnimated, setHasAnimated] = useState(false);




  useEffect(() => {
    if (hasAnimated) return;




    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;




    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);




            // If reduced motion, show everything instantly
            if (prefersReducedMotion) {
              setStepStates(
                steps.map(() => ({ number: true, text: true, phone: true }))
              );
              return;
            }




            // Animate each step with stagger
            steps.forEach((_, stepIndex) => {
              const baseDelay = 200 + stepIndex * 400;




              // Step number appears first
              setTimeout(() => {
                setStepStates((prev) => {
                  const newStates = [...prev];
                  newStates[stepIndex] = {
                    ...newStates[stepIndex],
                    number: true,
                  };
                  return newStates;
                });
              }, baseDelay);




              // Text appears shortly after number
              setTimeout(() => {
                setStepStates((prev) => {
                  const newStates = [...prev];
                  newStates[stepIndex] = {
                    ...newStates[stepIndex],
                    text: true,
                  };
                  return newStates;
                });
              }, baseDelay + 150);




              // Phone appears after text
              setTimeout(() => {
                setStepStates((prev) => {
                  const newStates = [...prev];
                  newStates[stepIndex] = {
                    ...newStates[stepIndex],
                    phone: true,
                  };
                  return newStates;
                });
              }, baseDelay + 300);
            });
          }
        });
      },
      {
        threshold: 0.15,
      }
    );




    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }




    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);




  return (
    <section
      ref={sectionRef}
      className="how-it-works-section relative px-6 overflow-hidden pt-8 pb-10 md:pt-10 md:pb-12"
    >
      {/* Grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-overlay" />




      {/* Vignette effect */}
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />




      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top intro line */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base text-gray-400 mb-3 font-light">
            So what changes when you open LoveAll?
          </p>
         
          {/* Subtle down chevron */}
          <div className="flex justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#4CF2C7]/40 animate-pulse"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>


        {/* Faint vertical guide line on left (optional) */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-[#4CF2C7]/5" />


        {/* Steps */}
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {steps.map((step, index) => {
            const state = stepStates[index];


            return (
              <div
                key={index}
                className="relative md:min-h-[360px] lg:min-h-[400px]"
              >
                {/* Faint horizontal guide line */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-[#4CF2C7]/5 hidden md:block" />




                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                  {/* Left Column: Step Number + Text */}
                  <div className="relative z-10 md:self-center">
                    <div className="flex flex-col gap-3 md:gap-4">
                      {/* Step number badge */}
                      <div
                        className={`transition-all duration-[600ms] ease-out ${
                          state.number
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                        }`}
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#4CF2C7]/20 border border-[#4CF2C7]/30 flex items-center justify-center shadow-[0_0_20px_rgba(76,242,199,0.2)]">
                          <span className="text-[#4CF2C7] text-xl md:text-2xl font-bold">
                            {step.number}
                          </span>
                        </div>
                      </div>




                      {/* Title */}
                      <h3
                        className={`text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-bold text-white leading-tight transition-all duration-[600ms] ease-out delay-75 ${
                          state.text
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        {step.title}
                      </h3>




                      {/* Subtext */}
                      <p
                        className={`text-base md:text-base lg:text-lg text-gray-300 leading-relaxed font-light transition-all duration-[600ms] ease-out delay-150 ${
                          state.text
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        {step.subtext}
                      </p>
                    </div>
                  </div>




                  {/* Right Column: Phone Mockup or Direct Image */}
                  {/* Stationary positioning container (no animation) */}
                  <div className="relative md:self-center">
                    {/* Stationary container for absolute positioning */}
                    <div className="relative w-full max-w-[560px] mx-auto md:h-[360px] lg:h-[350px]" style={{ overflow: "visible" }}>
                      {/* Stationary GlowPanel box (no animation) */}
                      <GlowPanel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] h-[160px] md:h-[220px]" />
                     
                      {/* Phone slit reveal animation layer */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/5 -translate-y-1/2 z-10 pointer-events-none">
                        {/* Slit wrapper - same width as phone, overflow hidden, centered on row */}
                        <div className="relative w-[360px] md:w-[520px] lg:w-[580px] overflow-hidden">
                          {/* Animated phone wrapper - slides UP from below */}
                          <div
                            className={`transition-transform duration-[800ms] ease-out ${
                              state.phone ? "translate-y-0" : "translate-y-[110%]"
                            }`}
                          >
                            <Image
                              src={step.image}
                              alt={`Step ${step.number}: ${step.title}`}
                              width={560}
                              height={1200}
                              className="w-[500px] md:w-[520px] lg:w-[250px] h-auto object-contain"
                              sizes="(max-width: 768px) 360px, 580px"
                              priority={step.number === 1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom anchor line */}
        <div className="mt-12 md:mt-14 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How LoveAll Works.
          </h2>
        </div>
      </div>
    </section>
  );
}
