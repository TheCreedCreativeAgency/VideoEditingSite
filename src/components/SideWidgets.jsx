import React from "react";
import Reveal from "../hooks/Reveal";

const SideWidgets = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <>
      {/* Apply the className directly to the Reveal component */}
      <div className="side-icons-left" direction="right">
        <Reveal >
          <a href="#top">
        <img src={`${publicUrl}/icon.png`} alt="Icon" id="icon" />
        </a>
        </Reveal>
        <Reveal >
        <a href="tel:+923020887777">
          <img src={`${publicUrl}/phone.png`} alt="Phone" />
        </a>
        </Reveal>
        <Reveal>
        <a href="mailto:alisocial233@gmail.com">
          <img src={`${publicUrl}/mail.png`} alt="Mail" />
        </a>
        </Reveal>
      </div>

      {/* Do the same for all other widgets */}
      {/* <Reveal> */}
      <Reveal className="vertical-text-widget-" rotate={-90} >
        <p>delivering perfection</p>
      {/* </div> */}
      </Reveal>

      <Reveal className="vertical-text-widget-2" rotate={-90} >
        <p>voice your needs</p>
      </Reveal>

      <Reveal  className="vertical-text-widget-small" rotate={-90}>
        <p>know your contacts</p>
      </Reveal>
    </>
  );
};

export default SideWidgets;
