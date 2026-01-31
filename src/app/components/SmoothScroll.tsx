"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 35,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      wheelMultiplier: 1,
      autoResize: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Optional: Add scroll event listener for debugging
    lenis.on('scroll', (e: any) => {
      // console.log(e);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}