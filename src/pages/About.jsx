import React from "react";

import "../styles/About.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import ParticlesBackground from "../hooks/ParticlesBackground";

import Reveal from "../hooks/Reveal";

import CustomCursor from "../hooks/CustomCursor";
const navLinks = [
  { label: "Home", path: "/#top" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/#contact" },
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
    path: "/#contact",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1.0,
};
const AboutPage = () => {
  const publicUrl = process.env.PUBLIC_URL;

  const location = useLocation();

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
      <div className="container">
        <Header navLinks={navLinks} />
        <div className="vertical-text-widget">
          <p>The Owner</p>
        </div>

        <main>
          <section className="about-section">
            <div className="about-content">
              <div className="heading">
                <Reveal>
                  <span>Who is</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1>Raja Ali Sher</h1>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <p>
                  He stands as the <strong>founder</strong> of The Creed's
                  creative agency, wielding the art of video editing like a
                  sharpened blade. He speaks not in riddles but with clarity and
                  purpose—direct, unwavering, and swift. He seeks not idle
                  chatter, but understanding forged through conversation. Time
                  is sacred, and he wastes none—not his own, and never his
                  client's.
                </p>
              </Reveal>

              {/* Added: The "Talk to him" button was missing. It now correctly links to the contact section on the homepage. */}
              <Reveal delay={0.25}>
                <a href="/#contact" className="btn">
                  Talk to him
                </a>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="quote-section">
                  <div className="quote-icons">
                    {/* Fixed: Image paths now correctly use the publicUrl variable */}
                    <a id="mail" href="mailto:alisocial233@gmail.com">
                      <img src={`${publicUrl}/mail.png`} alt="Mail Icon" />
                    </a>
                    <a href="tel:+923020887777">
                      <img src={`${publicUrl}/phone.png`} alt="Phone Icon" />
                    </a>
                  </div>
                  <div className="quote-text">
                    <p>
                      "Man cannot remake himself without suffering, for he is
                      both the marble and the sculptor"
                    </p>
                    <span>- Alexis Carrel</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="about-image">
              <img
                src={`${publicUrl}/hack.png`}
                alt="Bust of Alexander the Great"
              />
            </div>
          </section>
        </main>
        <MobileNavbar navLinks={mobileNavLinks} />
      </div>
    </motion.div>
  );
};

export default AboutPage;
