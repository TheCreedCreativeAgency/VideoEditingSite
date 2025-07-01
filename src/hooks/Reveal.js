import React from "react";
import { motion } from "framer-motion";

/**
 * A reusable component to animate its children when they scroll into view.
 *
 * ... (your existing props documentation) ...
 * @param {function} [props.onRevealComplete] Callback fired when the "visible" animation finishes.
 * @param {function} [props.onHideComplete] Callback fired when the "hidden" animation finishes (on scroll out).
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 80,
  rotate = 0,
  scale = 1,
  // CHANGE: Add new callback props with default empty functions
  onRevealComplete = () => {},
  onHideComplete = () => {},
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      rotate: rotate,
      scale: scale,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: rotate,
      scale: scale,
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // Note: `once: false` is important for this to work on scroll-out
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: delay,
      }}
      // CHANGE: Add the onAnimationComplete handler
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          onRevealComplete();
        } else if (definition === "hidden") {
          onHideComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
