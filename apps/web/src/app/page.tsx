"use client";

import BannerPic from "@/components/Banner";
import SliderBanner from "@/components/BannerPromotion";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marque from "@/components/Marque";
import Review from "@/components/Review";
import Room from "@/components/Room";
import CategorySection from "@/components/Services";
import TopDestination from "@/components/TopDestination";
import withUserGuard from "@/utils/HOC/UserPageGuard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Home() {
  // setting aos
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
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
      <Marque />
      <TopDestination />
      <SliderBanner />
      <Room />
      <BannerPic img={"/images/banner-page.png"} />
      <CategorySection />
      <Review />
      <Contact />
    </div>
  );
}
export default withUserGuard(Home);
