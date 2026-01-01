import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Doc Connect. All rights reserved.
    </footer>
  );
}

export default Footer;
