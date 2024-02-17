"use client";

import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Review from "@/components/Review";
import Hootel from "@/components/Room";
import TopDestination from "@/components/TopDestination";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  // setting aos
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120,
      delay: 0,
      duration: 700,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <Hero />
      <TopDestination />
      <Hootel />
      <Review />
      <Contact />
    </div>
  );
}
