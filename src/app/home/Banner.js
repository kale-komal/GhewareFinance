'use client'
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const Banner = () => {
  // Ensure Bootstrap JS is loaded (only needed for client-side components)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <section id="Banner">
    <div>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/images/img3.jpg"
              alt="Los Angeles"
              layout="responsive"
              width={800}
              height={400}
              className="d-block w-100 bannerImg"
            />
            <div className="carousel-caption">
              <h3>Los Angeles</h3>
              <p>We had such a great time in LA!</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src="/images/img3.jpg"
              alt="Chicago"
              layout="responsive"
              width={800}
              height={400}
              className="d-block w-100 bannerImg"
            />
            <div className="carousel-caption">
              <h3>Chicago</h3>
              <p>Enjoyed the sights of Chicago!</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src="/images/img3.jpg"
              alt="New York"
              layout="responsive"
              width={800}
              height={400}
              className="d-block w-100 bannerImg"
            />
            <div className="carousel-caption">
              <h3>New York</h3>
              <p>Exploring the city that never sleeps!</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
  );
};

export default Banner;
