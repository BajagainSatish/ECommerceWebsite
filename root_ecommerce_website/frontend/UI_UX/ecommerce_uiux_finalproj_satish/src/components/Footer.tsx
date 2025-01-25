import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4>About Us</h4>
          <p>
            Your go-to eCommerce platform offering the best products with
            exceptional service. Shop with us and experience excellence!
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <p>Email: satudada@ecommerce.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} eCommerce Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
