"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  start: boolean; // External trigger to start typing
  typingSpeed?: number; // ms per character
  pauseAfterPunctuationMs?: number; // ms pause after period
  showCursor?: boolean;
  postBlinkCount?: number; // Number of blinks after typing completes
  postBlinkCycleMs?: number; // Full cycle duration (on + off) in ms
}

export default function TypewriterText({
  text,
  className = "",
  start,
  typingSpeed = 50, // Default 50ms per character
  pauseAfterPunctuationMs = 250, // 250ms pause after period
  showCursor = true,
  postBlinkCount = 6, // Default 6 blinks
  postBlinkCycleMs = 500, // Default 500ms per full cycle (250ms on, 250ms off)
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPostBlinking, setIsPostBlinking] = useState(false);
  const hasRunRef = useRef(false);
  const isReducedMotion = useRef(false);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [targetWidth, setTargetWidth] = useState<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaQuery.matches;

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener("change", handleReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;
    const w = Math.ceil(measureRef.current.getBoundingClientRect().width);
    setTargetWidth(w);
  }, [text, className]);

  useEffect(() => {
    // Guard: only run once, and only if start is true
    if (!start || hasRunRef.current) return;
    
    // If reduced motion, show text instantly
    if (isReducedMotion.current) {
      setDisplayedText(text);
      hasRunRef.current = true;
      return;
    }

    // Start typing animation
    hasRunRef.current = true;
    setIsTyping(true);
    setCursorVisible(true);
    startTyping();
  }, [start, text, typingSpeed, pauseAfterPunctuationMs]);

  const startTyping = () => {
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const char = text[currentIndex];
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;

        // Determine delay: longer pause after period
        const delay = char === "." ? pauseAfterPunctuationMs : typingSpeed;

        setTimeout(typeNextChar, delay);
      } else {
        // Typing complete - start post-blink sequence
        setIsTyping(false);
        startPostBlink();
      }
    };

    typeNextChar();
  };

  const startPostBlink = () => {
    if (!showCursor || postBlinkCount === 0) {
      setCursorVisible(false);
      return;
    }

    setIsPostBlinking(true);
    let blinkCount = 0;
    const halfCycle = postBlinkCycleMs / 2; // 250ms for on, 250ms for off

    const blink = () => {
      if (blinkCount >= postBlinkCount * 2) {
        // Completed all blinks (each blink = 2 half-cycles)
        setIsPostBlinking(false);
        setCursorVisible(false);
        return;
      }

      // Toggle cursor visibility
      setCursorVisible((prev) => !prev);
      blinkCount++;

      setTimeout(blink, halfCycle);
    };

    // Start first blink after a brief moment
    setTimeout(blink, halfCycle);
  };

  // If reduced motion, show full text immediately
  const finalText = isReducedMotion.current && hasRunRef.current 
    ? text 
    : displayedText;

  // Show cursor if typing, post-blinking, or if reduced motion (never show cursor in reduced motion)
  const shouldShowCursor = cursorVisible && !isReducedMotion.current && (isTyping || isPostBlinking);

  return (
    <div className="w-full flex justify-center">
      {/* Hidden full-text measurement (not visible, but gives us stable width) */}
      <span
        ref={measureRef}
        className={`${className} absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap`}
      >
        {text}
      </span>

      {/* Centered line container with width = full sentence (clamped to viewport) */}
      <div
        style={{
          width: targetWidth ? `min(${targetWidth}px, 92vw)` : "92vw",
        }}
        className="flex justify-start"
      >
        {/* IMPORTANT: do NOT use w-full here; let the text be inline width */}
        <p className={`${className} text-left whitespace-nowrap`}>
          {finalText}
          {shouldShowCursor && (
            <span className="typewriter-cursor">|</span>
          )}
        </p>
      </div>
    </div>
  );
}
