"use client";

import { useEffect, useRef, useState } from "react";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Sequential animation: each item fully appears before the next begins
            // Item 1: starts immediately
            setVisibleItems([true, false, false]);
            // Item 2: starts after item 1 fully completes (1000ms duration + 200ms pause)
            setTimeout(() => setVisibleItems([true, true, false]), 1200);
            // Item 3: starts after item 2 fully completes (1000ms duration + 200ms pause)
            setTimeout(() => setVisibleItems([true, true, true]), 2400);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
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

  const getItemClasses = (index: number) => {
    const baseClasses = "pb-8 md:pb-0 transition-all duration-1000 ease-out";
    const isVisible = visibleItems[index];
    
    if (isVisible) {
      return `${baseClasses} opacity-100 translate-x-0`;
    } else {
      return `${baseClasses} opacity-0 -translate-x-8`;
    }
  };

  return (
    <section ref={sectionRef} className="bg-black text-white py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            THE PROBLEM
          </p>
        </div>

        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
          <div className={`${getItemClasses(0)} md:border-r md:border-white/10 md:pr-8 lg:pr-12`}>
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              01
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Endless Swiping
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Dating apps keep you scrolling, not connecting. Hours spent, few real dates.
            </p>
          </div>

          <div className={`${getItemClasses(1)} md:border-r md:border-white/10 md:pr-8 lg:pr-12 lg:border-r-0`}>
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              02
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Low-Quality Matches
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Algorithms prioritize engagement over compatibility. More matches, less meaning.
            </p>
          </div>

          <div className={`${getItemClasses(2)} md:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-12`}>
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              03
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              No Real Connection
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Text conversations that go nowhere. The app becomes the destination, not the start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
