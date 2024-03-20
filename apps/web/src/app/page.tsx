'use client';

import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Review from '@/components/Review';
import Hootel from '@/components/Room';
import CategorySection from '@/components/Services';
import TopDestination from '@/components/TopDestination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Home() {
  // setting aos
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120,
      delay: 0,
      duration: 700,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <Hero />
      <TopDestination />
      <CategorySection />
      <Hootel />
      <Review />
      <Contact />
    </div>
  );
}
