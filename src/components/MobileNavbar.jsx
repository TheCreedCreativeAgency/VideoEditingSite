import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNavbar = ({ navLinks = [] }) => {
  const navBarRef = useRef(null);
  const indicatorRef = useRef(null);
  const buttonRefs = useRef([]);
  const location = useLocation();

  const moveIndicatorTo = (button) => {
    if (!button || !navBarRef.current || !indicatorRef.current) return;
    setTimeout(() => {
      const buttonRect = button.getBoundingClientRect();
      const navBarRect = navBarRef.current.getBoundingClientRect();
      if (navBarRect.width > 0) {
        const offset =
          buttonRect.left -
          navBarRect.left +
          buttonRect.width / 2 -
          indicatorRef.current.offsetWidth / 2;
        indicatorRef.current.style.left = `${offset}px`;
      }
    }, 100);
  };

  useEffect(() => {
    const updateActiveState = () => {
      const currentPath = location.pathname;
      const currentHash = location.hash;
      let activeButton = null;

      buttonRefs.current.forEach((btn) => {
        if (!btn) return;
        btn.classList.remove("active");
        const btnPath = btn.getAttribute("href");

        if (
          (currentHash && btnPath === `/${currentHash}`) ||
          (currentHash && btnPath == `/#top`)
        ) {
          activeButton = btn;
        } else if (!currentHash && btnPath === currentPath) {
          activeButton = btn;
        }
      });

      if (!activeButton && currentPath === "/") {
        activeButton = buttonRefs.current.find(
          (btn) => btn && btn.getAttribute("href").endsWith("#top")
        );
      }

      if (activeButton) {
        activeButton.classList.add("active");
        moveIndicatorTo(activeButton);
      }
    };

    updateActiveState();
    window.addEventListener("resize", updateActiveState);
    return () => window.removeEventListener("resize", updateActiveState);
  }, [location]);

  return (
    <nav className="mobile-nav-bar" ref={navBarRef}>
      <div
        id="nav-indicator"
        className="nav-indicator spotlight"
        ref={indicatorRef}
      ></div>

      {/* Map over the navLinks to create the buttons */}
      {navLinks.map((link, index) =>
        link.path.startsWith("/") ? (
          <a
            key={index}
            href={link.path}
            className="nav-button"
            aria-label={link.label}
            ref={(el) => (buttonRefs.current[index] = el)}
          >
            {link.svg}
          </a>
        ) : (
          <Link
            key={index}
            to={link.path}
            className="nav-button"
            aria-label={link.label}
            ref={(el) => (buttonRefs.current[index] = el)}
          >
            {link.svg}
          </Link>
        )
      )}
    </nav>
  );
};

export default MobileNavbar;
