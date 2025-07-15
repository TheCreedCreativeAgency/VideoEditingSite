import React, { useState, useEffect, useRef } from "react";
import Reveal from "../hooks/Reveal";
import useIntersectionObserver from "../hooks/userIntersectionObserver";
import "../styles/index.css";

const slides = [
  {
    mainVideo: "vid1.mp4"
  },
  {
    mainVideo: "vid2.mp4"
  },
  {
    mainVideo: "vid3.mp4"
  },
  {
    mainVideo: "vid4.mp4"
  },
  {
    mainVideo: "vid5.mp4"
  },
  {
    mainVideo: "vid6.mp4"
  },
];

const PortfolioSection = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const mainVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const isVideoVisible = useIntersectionObserver(mainVideoRef, { threshold: 0.5 });
  const handlePlayPause = () => {
    if (mainVideoRef.current?.paused) {
      mainVideoRef.current.play();
      setIsPlaying(true);
    } else {
      mainVideoRef.current?.pause();
      setIsPlaying(false);
    }
  };
  const [canVideoPlay, setCanVideoPlay] = useState(false);
  useEffect(() => {
    const videoElement = mainVideoRef.current;
    if (!videoElement) return;

    if (isVideoVisible) {
      videoElement.play().catch(error => console.warn("Autoplay was prevented:", error));
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isVideoVisible]); // This effect ONLY runs when visibility changes
  useEffect(() => {
    const videoElement = mainVideoRef.current;
    if (videoElement) {
        videoElement.load();
    }
  }, [currentIndex]);
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => setIsFading(false), 300);
      return () => clearTimeout(timer);
    }

    const videoElement = mainVideoRef.current;
    if (videoElement) {
      if (canVideoPlay && !isFading) {
        videoElement.load();
        videoElement.play().catch((error) => {
          console.warn("Video play was prevented:", error);
        });
      } else {
        videoElement.pause();
      }
    }
  }, [isFading, currentIndex, canVideoPlay]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    changeSlide(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex);
  };

  const handleSideVideoClick = (indexToMakeMain) => {
    if (indexToMakeMain !== currentIndex) {
      changeSlide(indexToMakeMain);
    }
  };

  const changeSlide = (newIndex) => {
    if (isFading) return; // Prevent changes during a transition

    setIsFading(true); // Start fading out the current video

    // Wait for the fade-out animation to complete before changing the source
    setTimeout(() => {
      setCurrentIndex(newIndex);
      // The new video will be loaded, and the onLoadedData event will handle the fade-in
    }, 400); // This duration should match your CSS transition time
  };
  const currentSlide = slides[currentIndex];

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;
  const handleVideoLoaded = () => {
    setIsFading(false); // Fade the new video in now that it's ready
  };
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container"  >
        {/* <Reveal>
          <div className="testimonial" >
            <div className="image-container">
              <img src={`${publicUrl}/small.png`} alt="GigaChad profile" />
            </div>
            <div className="testimonial-text">
              <span className="testimonial-author">GigaChad Says:</span>
              <p>
                Asked an edit and got a masterpiece. This guy knows what he's
                doing!
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <img
            src={`${publicUrl}/down.png`}
            className="nav-chevron down"
            alt="down arrow"
          />
        </Reveal> */}

        <Reveal
          onRevealComplete={() => setCanVideoPlay(true)}
          onHideComplete={() => setCanVideoPlay(false)}
        >
          <div className="gallery">
            {/* Left Arrow (hidden on large screens via CSS) */}
            <img
              className="left"
              onClick={handlePrev}
              src="/left.png"
              alt="Previous video"
            />

            {/* Previous Video (left side) */}

            <video
              key={`prev-${prevIndex}`}
              src={`${publicUrl}/${slides[prevIndex].mainVideo}`}
              className="side-image"
              muted
              playsInline
              preload="metadata"
              onClick={() => handleSideVideoClick(prevIndex)}
              style={{ zIndex: -1 }}
            />

            {/* Main Video (center) */}
            <video
              key={`main-${currentIndex}`}
              ref={mainVideoRef}
              src={`${publicUrl}/${currentSlide.mainVideo}`}
              className="main-image"
              playsInline
              preload="auto"
              style={{ opacity: isFading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }} // FIX: ensure transition is here              onClick={handlePlayPause}
              onLoadedData={handleVideoLoaded} // FIX: This is the key to the smooth transition
          onClick={handlePlayPause}
            />

            {/* Next Video (right side) */}
            <video
              key={`next-${nextIndex}`}
              src={`${publicUrl}/${slides[nextIndex].mainVideo}`}
              className="side-image"
              muted
              playsInline
              preload="metadata"
              onClick={() => handleSideVideoClick(nextIndex)}
            />

            {/* Right Arrow (hidden on large screens via CSS) */}
            <img
              className="right"
              onClick={handleNext}
              src="/right.png"
              alt="Next video"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="flex-portfolio">
            <img
              src="./text_center.png"
              alt="Section title"
              style={{ opacity: isFading ? 0 : 1 }}
            />
            <p className="subtitle" style={{ opacity: isFading ? 0 : 1 }}>
              We cater to clients of every scale, always upholding a standard of
              excellence.
            </p>
            <a href="#contact" className="portfolio-btn">
              Contact Me
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
