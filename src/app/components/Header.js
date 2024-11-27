"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../style/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  


  return (
    <>
      {/* Top Strip Section */}
      <section id="topStrip">
        <div className="container-fluid themeSecondaryBg py-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <a href="tel:+1234567890" className="call-link">
                  <i className="fa-solid fa-phone"></i>
                  Call Us: +91 9922335716
                </a>
                <span
                  style={{ color: "white", paddingRight: "5px" }}
                  className="topStripLine"
                >
                  |
                </span>
                <a href="mailto:dummy@gmail.com" className="call-link">
                  <i className="fa-solid fa-envelope"></i>
                  Email: dummy@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Header Section */}
      <header id="stickyHeader" className="container-fluid py-2">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Logo Section */}
            <div className="col-md-3 col-2 logo">
              <Link href="/" className="d-flex gap-2">
                <img src="/images/logo/logo.png" alt="Logo" />
                <img src="/images/logo/logo-name.png" alt="Logo"  />
              </Link>
            </div>

            {/* Navigation Section */}
            <div className="col-md-6 col-2">
              <nav className="navbar-expand-lg">
                <button
                  className={`navbar-toggler ${menuOpen ? "" : "collapsed"}`}
                  type="button"
                  aria-controls="navbarNav"
                  aria-expanded={menuOpen ? "true" : "false"}
                  aria-label="Toggle navigation"
                  onClick={handleToggle}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className={`collapse navbar-collapse ${
                    menuOpen ? "show" : ""
                  }`}
                  id="navbarNav"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
                      <Link href="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/services") ? "active" : ""
                      }`}
                    >
                      <Link href="/services" className="nav-link">
                        Services
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/projects") ? "active" : ""
                      }`}
                    >
                      <Link href="/projects" className="nav-link">
                        Projects
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/about") ? "active" : ""
                      }`}
                    >
                      <Link href="/about" className="nav-link" style={{whiteSpace:"nowrap"}}>
                        About Us
                      </Link>
                    </li>
                    <li className={`nav-item ${isActive("/news") ? "active" : ""}`}>
                      <Link href="/news" className="nav-link">
                        News
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/gallery") ? "active" : ""
                      }`}
                    >
                      <Link href="/gallery" className="nav-link">
                        Gallery
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/testimonials") ? "active" : ""
                      }`}
                    >
                      <Link href="/testimonials" className="nav-link">
                        Testimonials
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        isActive("/contact") ? "active" : ""
                      }`}
                    >
                      <Link href="/contact" className="nav-link">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;  