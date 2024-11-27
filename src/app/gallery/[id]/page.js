"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../style/gallery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";

const EventDetail = ({ params: promiseParams }) => {
  const [id, setId] = useState(null); // State to store unwrapped id
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State for modal

  // Unwrap params in useEffect
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await promiseParams;
      setId(unwrappedParams.id);
    };
    unwrapParams();
  }, [promiseParams]);

  // Fetch event details after id is set
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (id) {
        try {
          const res = await fetch(
            `http://localhost:5000/event/geteventdetails/${id}`
          );
          if (!res.ok) {
            throw new Error(
              `Network response was not ok: ${res.statusText}`
            );
          }
          const data = await res.json();
          setEventData(data);
        } catch (error) {
          console.error("Failed to fetch event details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventData) {
    return <div>No event details found.</div>;
  }

  const formattedDate = new Date(eventData.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <section>
        <div className="image-container">
          <img
             src="/images/gallery/gallerybg.jpg"
            className="image-overlay"
            alt="Background"
          />
          <div className="overlay-about">Gallery</div>
        </div>
      </section>
      <div className="container mt-5">
        <h2 className="themeSecondary">{eventData.title}</h2>
        <p className="text-muted">
          <FontAwesomeIcon icon={faCalendarDays} className="pe-2" />
          {formattedDate}
        </p>
        <hr />
        <p className="mb-4">{eventData.description}</p>

        <div className="row">
          {eventData.photos.map((photo, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <img
                src={`http://localhost:5000${photo}`} 
                alt={`Photo ${index + 1}`}
                className="img-fluid rounded evevt-img"
                onClick={() => setSelectedImage(`http://localhost:5000${photo}`)} // Set the clicked image
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Fixed Size Image */}
      {selectedImage && (
        <div className="image-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)} // Close the modal
            >
              &times;
            </button>
            <img src={selectedImage} alt="Selected" className="img-fixed-size" />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default EventDetail;