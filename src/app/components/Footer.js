'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../style/footer.css";
import TopButton from '../home/TopButton';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer-wrapper container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 d-flex justify-content-start pt-2 gap-2">
            <i className="fa-solid fa-envelope fs-3 footericon"></i> dummy@gmail.com
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-start pt-2 gap-2">
            <i className="fa-solid fa-phone fs-3 footericon"></i> +91 4545454545
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-start pt-2 gap-2">
            <i className="fa-solid fa-location-dot fs-3 footericon"></i> Sangali, Maharashtra
          </div>
        </div>
        <hr />
        <div className="row mt-2">
          <div className="col-12 col-lg-4 col-sm-6">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum aperiam sed dolore ex dolor
              consequatur adipisci
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum aperiam sed dolore ex dolor
              consequatur adipisci
            </p>
          </div>
          <div className="col-12 col-lg-4 col-sm-6">
            <ul>
              <li className='footerlist'>
                <Link href="/" className="nav-link">
                  <i className="fa-solid fa-caret-right p-2"></i>Home
                </Link>
              </li>
              <li className='footerlist'>
                   <Link href="/services" className="nav-link">
                <i className="fa-solid fa-caret-right p-2"></i>Services
                </Link>
              </li>
              <li className='footerlist'>
                   <Link href="/about" className="nav-link">
                <i className="fa-solid fa-caret-right p-2"></i>About
                </Link>
              </li>
              <li className='footerlist'>
                   <Link href="/news" className="nav-link">
                <i className="fa-solid fa-caret-right p-2"></i>News
                </Link>
              </li>
              <li className='footerlist'>
                   <Link href="/projects" className="nav-link">
                <i className="fa-solid fa-caret-right p-2"></i>Projects
                </Link>
              </li>
              <li className='footerlist'>
                   <Link href="/gallery" className="nav-link">
                <i className="fa-solid fa-caret-right p-2"></i>Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-4 col-sm-6">
            <h5>Our Location</h5>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0847841171847!2d-122.41941528468183!3d37.774929179758176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d0d8b7aaf%3A0x1d5b3b5c57c8df4!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1611226391534!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="text-center">
            &#169; Copyright Gfinance. Theme by{' '}
            <a href="#" className="text-primary">
              ITELLECT SYSTEMS
            </a>
          </p>
        </div>
      </div>
      <TopButton />
    </footer>
  );
};

export default Footer;
