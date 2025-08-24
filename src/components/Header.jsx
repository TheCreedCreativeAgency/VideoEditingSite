import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Header.css";
import Reveal from "../hooks/Reveal";
const Header = ({ navLinks = [] }) => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
<Reveal direction="left">
    <motion.header
      className="main-header"
      id="top"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.2 }}
    >
      <div className="logo">
        <img src={`${publicUrl}/icon.png`} alt="The Creed Logo" />
      </div>
      <nav>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.path.startsWith("/#") ? (
                <a href={link.path}>{link.label}</a>
              ) : (
                <Link to={link.path}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
    </Reveal>
  );
};

export default Header;
