"use client";

import { useEffect, useRef, useState } from "react";
import TypewriterText from "./TypewriterText";

interface RowAnimationState {
  left: boolean;
  strike: boolean;
  arrow: boolean;
  card: boolean;
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [rowStates, setRowStates] = useState<RowAnimationState[]>([
    { left: false, strike: false, arrow: false, card: false },
    { left: false, strike: false, arrow: false, card: false },
    { left: false, strike: false, arrow: false, card: false },
    { left: false, strike: false, arrow: false, card: false },
  ]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [canStartTypewriter, setCanStartTypewriter] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Base delay after section becomes visible
            const baseDelay = 200;
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            
            // Animate each row in sequence
            solutions.forEach((_, rowIndex) => {
              const rowDelay = baseDelay + rowIndex * 700;
              const isLastRow = rowIndex === solutions.length - 1;
              
              // Timing values
              const strikeDelay = 250; // Delay after left appears before strike starts
              const strikeDuration = 450; // Strike animation duration
              const arrowGap = 150; // Gap after strike completes before arrow appears
              
              // Left text: delay = baseDelay + rowIndex * 700ms
              setTimeout(() => {
                setRowStates((prev) => {
                  const newStates = [...prev];
                  newStates[rowIndex] = { ...newStates[rowIndex], left: true };
                  // If reduced motion, show strike immediately
                  if (prefersReducedMotion) {
                    newStates[rowIndex] = { ...newStates[rowIndex], strike: true };
                  }
                  return newStates;
                });
              }, rowDelay);
              
              // Strike: starts after left appears (rowDelay + 250ms)
              // If reduced motion, skip strike animation (already set above)
              if (!prefersReducedMotion) {
                setTimeout(() => {
                  setRowStates((prev) => {
                    const newStates = [...prev];
                    newStates[rowIndex] = { ...newStates[rowIndex], strike: true };
                    return newStates;
                  });
                }, rowDelay + strikeDelay);
              }
              
              // Arrow: delay = rowDelay + strikeDelay + strikeDuration + arrowGap
              // = rowDelay + 250 + 450 + 150 = rowDelay + 850ms
              const arrowDelay = rowDelay + strikeDelay + strikeDuration + arrowGap;
              setTimeout(() => {
                setRowStates((prev) => {
                  const newStates = [...prev];
                  newStates[rowIndex] = { ...newStates[rowIndex], arrow: true };
                  return newStates;
                });
              }, arrowDelay);
              
              // Card: delay = arrowDelay + 300ms
              // Animation duration is 900ms, so card completes at: cardDelay + 900ms
              const cardAnimationStart = arrowDelay + 300;
              const cardAnimationDuration = 900; // duration-[900ms]
              
              setTimeout(() => {
                setRowStates((prev) => {
                  const newStates = [...prev];
                  newStates[rowIndex] = { ...newStates[rowIndex], card: true };
                  return newStates;
                });
                
                // If this is the last row, trigger typewriter after card animation completes
                if (isLastRow) {
                  setTimeout(() => {
                    setCanStartTypewriter(true);
                  }, cardAnimationDuration);
                }
              }, cardAnimationStart);
            });
          }
        });
      },
      {
        threshold: 0.2,
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

  const solutions = [
    {
      notText: "Endless swiping designed to keep you scrolling",
      solutionText: "Limited daily picks that respect your time and attention",
    },
    {
      notText: "Matches you'll never message that pile up endlessly",
      solutionText: "Capped match slots that encourage real conversation",
    },
    {
      notText: "Photos first, personality second",
      solutionText: "Sports identity first—teams, players, and how you watch",
    },
    {
      notText: "Manufactured urgency and notifications",
      solutionText: "Discovery pauses when you need to focus on who you've met",
    },
  ];


  return (
    <section
      ref={sectionRef}
      className="solution-section relative px-6 overflow-hidden pt-16 pb-12 md:pt-24 md:pb-18"
    >
      {/* Grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 font-medium">
            Why LoveAll exists
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            We play by a different set of rules.
          </h2>
          
          {/* Horizontal green glow line under headline */}
          <div className="flex justify-center">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#61f6c5] to-transparent solution-divider-line"></div>
          </div>
        </div>

        {/* Solution Rows - Three Column Layout */}
        <div className="solution-rows-container relative">
          {/* Faint horizontal guide lines */}
          {solutions.map((_, index) => (
            <div
              key={`guide-${index}`}
              className="absolute left-0 right-0 h-px bg-[#61f6c5]/5 hidden md:block"
              style={{
                top: `${index * 25}%`,
              }}
            />
          ))}

          {solutions.map((solution, index) => {
            const state = rowStates[index];
            
            return (
              <div
                key={index}
                className="solution-row relative"
              >
                <div className="relative grid grid-cols-1 md:grid-cols-[1fr_150px_1fr] gap-6 md:gap-8 items-center">
                  {/* Left Column: Rejected Behavior */}
                  <div 
                    className={`relative z-10 transition-all duration-[900ms] ease-out ${
                      state.left 
                        ? "opacity-100 translate-x-0 translate-y-0" 
                        : "opacity-0 -translate-x-2 translate-y-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Green dash indicator */}
                      <div className="w-2 h-2 rounded-full bg-[#61f6c5] glow-dash flex-shrink-0 mt-1" />
                      <span className="relative inline-block">
                        <span 
                          className="
                            solution-not-text text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed font-light
                            [text-decoration:none!important] [text-decoration-line:none!important]
                            [&::before]:content-none [&::after]:content-none
                            [&::before]:hidden [&::after]:hidden
                          "
                        >
                          {solution.notText}
                        </span>
                        
                        {/* Animated strike overlay */}
                        <span
                          aria-hidden="true"
                          className={`
                            pointer-events-none absolute left-0 right-0
                            top-1/2 -translate-y-1/2
                            h-[2px] rounded-full
                            bg-red-500/80
                            origin-left
                            transition-transform duration-[450ms] ease-out
                            ${state.strike ? "scale-x-100" : "scale-x-0"}
                          `}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Arrow Container (Gutter) */}
                  <div className="hidden md:block relative h-full flex items-center justify-center pointer-events-none">
                    <div 
                      className={`relative w-full flex items-center justify-center pr-6 transition-all duration-[900ms] ease-out ${
                        state.arrow 
                          ? "opacity-100 translate-x-0" 
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <img
                        src="/arrows/curved-arrow.png"
                        alt=""
                        className="solution-arrow-image w-full max-w-[480px] h-auto"
                        style={{
                          objectFit: "contain",
                          transform: "scale(2)",
                          transformOrigin: "center center",
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Column: Solution Card */}
                  <div 
                    className={`relative z-10 transition-all duration-[900ms] ease-out ${
                      state.card 
                        ? "opacity-100 translate-x-0 translate-y-0" 
                        : "opacity-0 translate-x-2 translate-y-2"
                    }`}
                  >
                    <div className="solution-card relative flex items-start gap-4 p-5 md:p-6 lg:p-7 rounded-xl">
                      {/* Green Check Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="solution-check w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#61f6c5] flex items-center justify-center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Solution Text */}
                      <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed flex-1">
                        {solution.solutionText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Tagline with Typewriter Effect */}
        <div className="mt-12 md:mt-14">
          <TypewriterText
            text="You don't need more matches. You need better ones."
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight italic"
            start={canStartTypewriter}
            typingSpeed={50}
            pauseAfterPunctuationMs={300}
            showCursor={true}
            postBlinkCount={6}
            postBlinkCycleMs={700}
          />
        </div>
      </div>
    </section>
  );
}
