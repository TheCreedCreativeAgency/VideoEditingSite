import React from "react";
import Reveal from "../hooks/Reveal";
const ContactSection = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <>
      <div className="cee" id="contact">
        <a href="#top">
        <img className="logo-down" src={`${publicUrl}/icon.png`} alt="logo" />
        </a>
      </div>
      <section className="contact-section">
        <span id="contact" className="section-anchor"></span>
        <div className="contact-inner">
          <Reveal className="contact-details">
            <img
              className="whoami"
              src={`${publicUrl}/text_bottom.png`}
              alt="Who Am I"
            />
            <p>
              You are contacting the owner of the agency directly and not some
              sales representative as we value communication with our clients.
            </p>
            <div className="contact-methods">
              <p>
                <span>
                  Email
                  <a href="mailto:alisocial233@gmail.com">
                    <img src={`${publicUrl}/goto.png`} alt="go to mail" />
                  </a>
                </span>
                brotherhood@the-creed.org
              </p>
              <p>
                <span>
                  WhatsApp
                  <a href="tel:+923020887777">
                    <img src={`${publicUrl}/goto.png`} alt="go to whatsapp" />
                  </a>
                </span>
                +(92)3020887777
              </p>
            </div>
            {/* </div> */}
          </Reveal>
          <img
            className="btw-form"
            src={`${publicUrl}/icon.png`}
            alt="form separator"
          />
          <Reveal>
            <div className="contact-form-container">
              <h3>Contact Form</h3>
              <form action="#" method="post">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                />
                <input type="email" name="email" placeholder="Email" required />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message (Optional)"
                ></textarea>
                <button type="submit" className="btn">
                  Send Form
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
