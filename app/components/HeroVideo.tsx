"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mobile devices
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/VideoLoveAll.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Logo in top-left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Logo />
      </div>

      {/* Navigation in top-right */}
      <nav className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "about")}
            className="text-white text-2xl md:text-3xl font-medium hover:underline transition-all duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className="text-white text-2xl md:text-3xl font-medium hover:underline transition-all duration-200"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          Matches don't matter. Dates do.
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-gray-100 mb-10 leading-relaxed">
          The App Where Sports Fans Meet Their Match.
        </p>

        <Link
          href="/waitlist"
          className="inline-block px-10 py-4 rounded-full font-semibold text-base md:text-lg text-white border border-white/40 bg-white/10 backdrop-blur-lg hover:bg-white/15 hover:border-white/50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_8px_32px_0_rgba(0,0,0,0.5)]"
          style={{
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
          }}
        >
          JOIN THE WAITLIST
        </Link>
      </div>
    </section>
  );
}

/* 
// EXPO REACT NATIVE VERSION (for reference)
// To use this version, install: npm install expo-av
// Then uncomment and use this implementation instead

import { Video, ResizeMode } from 'expo-av';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRef, useEffect } from 'react';

const { width, height } = Dimensions.get('window');

export default function HeroVideo() {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: '/mnt/data/VideoLoveAll.mp4' }} // or require('./assets/VideoLoveAll.mp4')
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
      
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.headline}>
          Matches don't matter. Dates do.
        </Text>
        
        <Text style={styles.subtext}>
          LoveAll is built to get you off the app and into real game-day moments.
        </Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>JOIN THE WAITLIST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    zIndex: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    maxWidth: 800,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  subtext: {
    fontSize: 18,
    color: '#f3f4f6',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 999,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});
*/
