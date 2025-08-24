import React, { useState, useEffect, useRef } from "react";
import Reveal from "../hooks/Reveal";
import "../styles/PortfolioDesktop.css";

const MinimizeIconCustom = (props) => (
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 9h4m0 0V5m0 4L4 4m15 5h-4m0 0V5m0 4 5-5M5 15h4m0 0v4m0-4-5 5m15-5h-4m0 0v4m0-4 5 5"
    />
  </svg>
);
const SpeakerIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const MuteIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const slides = [
  { mainVideo: "vid2.mp4", thumbnail: "./thumbnail2.jpg" },
  { mainVideo: "vid6.mp4", thumbnail: "./thumbnail6.jpg" },
  { mainVideo: "vid5.mp4", thumbnail: "./thumbnail5.jpg" },
  { mainVideo: "vid4.mp4", thumbnail: "./thumbnail4.jpg" },
  { mainVideo: "vid1.mp4", thumbnail: "./thumbnail1.jpg" },
  { mainVideo: "vid3.mp4", thumbnail: "./thumbnail3.jpg" },
];

const PortfolioDesktop = () => {
  const publicUrl = process.env.PUBLIC_URL;

  // --- Gallery State ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);

  // --- Video Modal State ---
  const [modalVideoSrc, setModalVideoSrc] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // This effect runs only once after the component first loads.
    // It creates an in-memory Image object for each thumbnail.
    // Setting the .src attribute triggers the browser to download and cache the image.
    slides.forEach((slide) => {
      const img = new Image();
      img.src = `${publicUrl}/${slide.thumbnail}`;
    });
  }, [publicUrl]); // Run once when publicUrl is available.

  // --- Main Gallery Animation Logic ---
  useEffect(() => {
    if (animationDirection) {
      const timer = setTimeout(() => {
        if (animationDirection === "next") {
          setCurrentIndex((prev) => (prev + 1) % slides.length);
        } else if (animationDirection === "prev") {
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }
        setAnimationDirection(null);
      }, 350); // Must match CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [animationDirection]);

  // --- Modal & Video Player Logic ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalVideoSrc) return; // Do nothing if modal isn't open

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          navigateToVideoInModal("next");
          break;
        case "ArrowLeft":
          navigateToVideoInModal("prev");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalVideoSrc, currentIndex]); // Rerun if modal or index changes

  // Main gallery navigation
  const handleNext = () => !animationDirection && setAnimationDirection("next");
  const handlePrev = () => !animationDirection && setAnimationDirection("prev");

  // Open the modal
  const openVideoModal = (videoFileName) => {
    setModalVideoSrc(`${publicUrl}/${videoFileName}`);
    setIsPlaying(true);
  };

  // Close the modal with animation
  const closeModal = () => {
    if (isModalClosing) return;
    setIsModalClosing(true);
    setTimeout(() => {
      setModalVideoSrc(null);
      setIsModalClosing(false);
    }, 500); // Must match CSS animation duration
  };

  // NEW: Navigate videos while modal is open
  const navigateToVideoInModal = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % slides.length
        : (currentIndex - 1 + slides.length) % slides.length;

    setCurrentIndex(newIndex); // Sync background gallery
    setModalVideoSrc(`${publicUrl}/${slides[newIndex].mainVideo}`);
    setProgress(0); // Reset progress bar
    setIsPlaying(true); // Ensure new video plays
  };

  // Video player controls
  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  // --- JSX Rendering ---
  const currentSlide = slides[currentIndex];
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;
  const galleryClassName = `gallery ${
    animationDirection ? `animating-${animationDirection}` : ""
  }`;

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container" style={{ overflow: "hidden" }}>
        {/* <Reveal>
          <div className="testimonial">
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
          <img
            src={`${publicUrl}/down.png`}
            className="nav-chevron down"
            alt="down arrow"
          />
        </Reveal> */}
        <Reveal>
          <div className="gallery-container">
            <div className={galleryClassName}>
              {/* Previous Video Thumbnail (left side) */}
              <div
                className="thumbnail-wrapper prev-wrapper"
                onClick={handlePrev} // Click here to go to previous
              >
                <img
                  key={`prev-thumb-${prevIndex}`}
                  src={`${publicUrl}/${slides[prevIndex].thumbnail}`}
                  alt="Previous video thumbnail"
                />
              </div>

              {/* Main Video Thumbnail (center) */}
              <div className="thumbnail-wrapper main-wrapper">
                <img
                  key={`main-thumb-${currentIndex}`}
                  src={`${publicUrl}/${currentSlide.thumbnail}`}
                  alt="Main video thumbnail"
                />
                <button
                  className="play-button"
                  onClick={() => openVideoModal(currentSlide.mainVideo)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#d2ad75"
                      strokeWidth="1"
                    />
                    <path d="M9.5 8L16.5 12L9.5 16V8Z" fill="#FFD700" />
                  </svg>
                </button>
              </div>

              {/* Next Video Thumbnail (right side) */}
              <div
                className="thumbnail-wrapper next-wrapper"
                onClick={handleNext} // Click here to go to next
              >
                <img
                  key={`next-thumb-${nextIndex}`}
                  src={`${publicUrl}/${slides[nextIndex].thumbnail}`}
                  alt="Next video thumbnail"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="flex-portfolio"
            style={{
              opacity: animationDirection ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <img src="./text_center.png" alt="Section title" />
            <p className="subtitle">
              We cater to clients of every scale, always upholding a standard of
              excellence.
            </p>
            <a href="#contact" className="portfolio-btn">
              Contact Me
            </a>
          </div>
        </Reveal>
      </div>

      {/* --- Custom Video Player Modal --- */}
      {modalVideoSrc && (
        <div
          className={`video-modal-overlay ${
            isModalClosing ? "is-closing" : ""
          }`}
          onClick={closeModal}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={modalVideoSrc}
              autoPlay
              playsInline
              className="full-screen-video"
              onTimeUpdate={handleTimeUpdate}
              onEnded={closeModal}
              onClick={handlePlayPause}
            />

            {/* === STRUCTURAL CHANGE 1: Close button is now a direct child of the content wrapper === */}
            <button
              className="control-button close-button"
              onClick={closeModal}
              title="Close (Esc)"
            >
              <MinimizeIconCustom />
            </button>

            <div className="custom-video-controls">
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ transform: `scaleX(${progress / 100})` }}
                ></div>
              </div>

              {/* === STRUCTURAL CHANGE 2: This container now only holds the mute button === */}
              <div className="control-buttons-container">
                <button
                  className={`control-button mute-button ${
                    !isMuted ? "glowing" : ""
                  }`}
                  onClick={handleMuteToggle}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MuteIcon /> : <SpeakerIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioDesktop;
