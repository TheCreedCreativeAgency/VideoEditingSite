import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import App from "../pages/App";
import LogoIntroAnimation from "./LogoIntroAnimation";

const IntroWrapper = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <LogoIntroAnimation
          key="intro-animation"
          onAnimationComplete={handleAnimationComplete}
          fontFamily="'Cormorant Garamond', serif"
        />
      ) : (
        <App key="main-app" />
      )}
    </AnimatePresence>
  );
};

export default IntroWrapper;
