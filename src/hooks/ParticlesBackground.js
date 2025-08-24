import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,

    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#ff5e00", "#ffb000", "#ffca3a", "#ffffff"],
      },
      shape: {
        type: "circle",
      },
      shadow: {
        enable: true,
        color: "#ff8c00",
        blur: 20,
      },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: {
          enable: true,
          speed: 0.8,
          startValue: "random",

          destroy: "none",
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          startValue: "random",

          destroy: "none",
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 1,
          size: 10,
        },
      },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesBackground;
