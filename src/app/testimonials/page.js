"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/testimonials.css";

const Contact = () => {
  const [testimonials, setTestimonials] = useState([]); // State for testimonials data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchAllTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/team/getteam");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json(); // Parse JSON response
      setTestimonials(data); // Set testimonials data to state
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Error loading testimonials.");
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    fetchAllTestimonials(); // Fetch testimonials on mount
    document.title = "Gfinance | Testimonials"; // Set page title
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }
  return (
    <>
      <Header />
      <section id="testimonials">
        <section>
          <div className="image-container">
            <img
              src="/images/team/teambg.jpg"
              className="image-overlay"
              alt="Background Image"
            />
            <div className="overlay-about">Testimonials</div>
          </div>
        </section>
        <section id="testimonials">
          <div className="container-fluid">
            <div className="container">
              <div className="row mt-5 mb-5">
                {testimonials.map((team, index) => (
                  <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                    <div className="card shadow" style={{ width: "100%" }}>
                      <img
                        src={`http://localhost:5000${team.TestimPhoto}`} // Full URL by combining localhost and relative path
                        className="card-img-top"
                        alt={team.TestimName}
                        width={200}
                        height={200}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center fw-3 fs-4 Tname">
                          {team.TestimName}
                        </h5>
                        <h6 className="text-center Tprofile">
                          {team.TestimProfile}
                        </h6>
                        <p className="card-text text-center">
                          {team.TestimInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
