import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 800;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    isMobile: false,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        isMobile: window.innerWidth < MOBILE_BREAKPOINT,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
