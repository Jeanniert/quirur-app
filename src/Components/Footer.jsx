import React from "react";
import "../assets/navbar.css";

const Footer = () => {
  const date= new Date();
  return (
    <footer className="footer footer mt-auto py-3">
    <div className="container">
      <span className=" fst-italic">Desarrollado por <a href="">Tecnologias Naykana</a> © {date.getFullYear()}</span>
    </div>
  </footer>

  );
};

export default Footer;
