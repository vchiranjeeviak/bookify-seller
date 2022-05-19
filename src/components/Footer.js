import React from "react";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <p className="first-line">
        Made with &#10084; and code by{" "}
        <a href="https://www.linkedin.com/in/chiranjeevi-tirunagari-685459191/">
          Chiranjeevi Tirunagari
        </a>
      </p>
      <div className="second-line">
        <a href="https://twitter.com/VChiranjeeviAK">Chiranjeevi's Twitter</a>
        <a href="https://github.com/vchiranjeeviak/bookify-seller">
          Source code of this site
        </a>
      </div>
    </div>
  );
};

export default Footer;
