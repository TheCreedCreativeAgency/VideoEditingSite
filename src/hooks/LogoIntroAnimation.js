import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import useWindowSize from "./useWindowSize";

const LogoIntroAnimation = ({
  onAnimationComplete,
  fontFamily = "'Times New Roman', serif",
}) => {
  const mainControls = useAnimation();
  const { isMobile } = useWindowSize();
  const textControls = useAnimation();

  const logoPopInControls = useAnimation();
  const [showText, setShowText] = useState(false);

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const logoPopInVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,

        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    const sequence = async () => {
      await mainControls.start("visible");

      await logoPopInControls.start("visible");

      await new Promise((resolve) => setTimeout(resolve, 400));

      setShowText(true);

      await new Promise((resolve) => setTimeout(resolve, 1600));

      await mainControls.start("exit");
      onAnimationComplete();
    };
    if (isMobile !== undefined) {
      sequence();
    }
  }, [mainControls, logoPopInControls, onAnimationComplete, isMobile]);

  useEffect(() => {
    if (showText) {
      textControls.start("visible");
    }
  }, [showText, textControls]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(to right, #0f0f0f 8%, #371919 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      initial="hidden"
      animate={mainControls}
      variants={mainVariants}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* --> 5. CONNECT THE LOGO TO ITS NEW POP-IN ANIMATION */}
        <motion.div
          layout
          initial="hidden"
          animate={logoPopInControls}
          variants={logoPopInVariants}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{
            width: isMobile ? "60px" : "120px",
            height: isMobile ? "60px" : "120px",
            borderRadius: "50%",
            backgroundColor: "#381e1e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            marginRight: isMobile ? "0px" : "30px",
            marginBottom: isMobile ? "30px" : "0px",
          }}
        >
          <img
            src="/icon.png"
            alt="Logo Icon"
            style={{ width: isMobile ? "30px" : "65px", height: "auto" }}
          />
        </motion.div>

        <AnimatePresence>
          {showText && (
            <motion.div
              style={{ display: "flex", gap: "1rem" }}
              initial="hidden"
              animate={textControls}
              variants={textContainerVariants}
            >
              {/* ... The rest of your text mapping is correct ... */}
              {["The", "Creed's", "Creatives"].map((word, index) => (
                <motion.span
                  key={index}
                  style={{
                    color: "#d2ad75",
                    fontSize: isMobile ? "2.25rem" : "4rem",
                    fontFamily: fontFamily,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LogoIntroAnimation;
