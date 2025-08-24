import React, { useEffect } from "react";
import "../styles/index.css";
import { motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import SideWidgets from "../components/SideWidgets";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { useLocation } from "react-router-dom";
import PortfolioSection from "../components/PortfolioSection";
import ContactSection from "../components/ContactSection";
import MobileNavbar from "../components/MobileNavbar";
import ParticlesBackground from "../hooks/ParticlesBackground";
import CustomCursor from "../hooks/CustomCursor";
import PortfolioDesktop from "../components/PortfolioDesktop";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};
const navLinks = [
  { label: "Home", path: "/#top" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "#contact" },
];

const mobileNavLinks = [
  {
    label: "Home",
    path: "/#top",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    label: "About Us",
    path: "/about",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    label: "Contact",
    path: "#contact",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

const HomePage = () => {
  const location = useLocation();
  const { isMobile } = useWindowSize();
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ParticlesBackground />
      <CustomCursor />
      <div id="top">
        <SideWidgets />
        <div className="container">
          <Header navLinks={navLinks} />
          <HeroSection />
          {isMobile? <PortfolioSection /> : <PortfolioDesktop/>}
          <ContactSection />
        </div>
        <MobileNavbar navLinks={mobileNavLinks} />
      </div>
    </motion.div>
  );
};

export default HomePage;
