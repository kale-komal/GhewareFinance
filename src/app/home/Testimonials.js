"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/testimonials.css";
import Link from "next/link";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // State to hold testimonials data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  const fetchAllTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/team/getteam");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json(); // Parse JSON response
      setTestimonials(data.slice(0, 3)); // Limit to the first three testimonials
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Error loading testimonials.");
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    fetchAllTestimonials(); // Fetch testimonials when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if loading failed
  }

  return (
    <div id="testimonials">
      <div className="container-fluid">
        <div className="container">
          <div
            className="text-center mt-5"
            data-aos="flip-left"
            data-aos-duration="2000"
          >
            <h1 className="fw-medium Theading">Testimonials</h1>
          </div>
          <div className="row mt-4 justify-content-between text-center">
            {testimonials.map((team, index) => (
              <div key={index} className="col-6 col-lg-4 Tsection">
                <div className="row">
                  <div className="col-12 col-md-3 mt-3 Ticon">
                    <img
                      src={`http://localhost:5000${team.TestimPhoto}`} 
                      alt=""
                      width={110}
                      height={110}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="col-12 col-md-8 mt-4">
                    <h6 className="fw-bold fs-4 Tname">{team.TestimName}</h6>
                    <h6 className="fs-5">{team.TestimProfile}</h6>
                    <p className="fw-light">{team.TestimInfo}</p>
                    {/* <div className="d-flex justify-content-center gap-3">
                     <Link href={"https://www.whatsapp.com"} className="Tbrandicon"> <i className="fa-brands fa-whatsapp fs-5 "></i></Link>
                    <Link href={"https://www.twitter.com"}  className="Tbrandicon">  <i className="fa-brands fa-twitter fs-5 "></i></Link>
                     <Link href={"https://www.facebook.com"}  className="Tbrandicon"> <i className="fa-brands fa-facebook fs-5 "></i></Link>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
