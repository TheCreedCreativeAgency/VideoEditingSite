import React from "react";
import Reveal from "../hooks/Reveal";
import "../styles/Hero.css";
const HeroSection = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          {/* Left side remains the same */}
          <Reveal>
            <div className="flex-heading">
              <h1>The Creed</h1>
              <h2>The Creative Agency</h2>
            </div>
          </Reveal>
          <div className="flex-sub">
            <Reveal>
              <p>
                "We produce videos as captivating and{" "}
                <span id="bl">
                  {" "}
                  refined as classical <span id="greek">Greek</span> art."
                </span>
              </p>
            </Reveal>
            <Reveal>
              <a href="#contact" className="btn">
                Contact Me
              </a>
            </Reveal>
          </div>
        </div>

        {/* --- THE FIX IS HERE --- */}
        {/* We wrap the entire container div, not the individual elements inside */}
        <Reveal className="hero-image">
          {/* These elements are now direct children, their layout is preserved */}
          <img
            src={`${publicUrl}/main.png`}
            alt="Statue of Perseus with the Head of Medusa"
          />
          <h3>We Sculpt Visual Art...</h3>
        </Reveal>
      </section>
    </main>
  );
};

export default HeroSection;
