"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/gallery.css";
import { useEffect, useState } from "react";
import Link from "next/link";

const Gallery = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllEvent = async () => {
    try {
      const res = await fetch("http://localhost:5000/event/getallgalleries");
      if (!res.ok) {
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      }
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error("Error fetching events:", err); // Check if any specific error is logged here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvent();
    document.title = "Gfinance | Gallery ";
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

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

      <section id="gallery">
        <div className="container-fluid">
          <div className="container">
            <div className="row mt-5 mb-4">
              {event.map((eventItem) => (
                <div className="col-sm-6 col-md-4 col-lg-4" key={eventItem.id}>
                  <div className="gallery mb-3">
                    <Link
                      href={`/gallery/${eventItem.id}`}
                      className="gallery-link link"
                    >
                      <div className="gallerycard">
                        <img
                          src={`http://localhost:5000${eventItem.first_image}`}
                          className="card-img-top "
                          alt={eventItem.title}
                          height={250}
                          width={300}
                        />
                        <div className="gallerycard-body">
                          <h5 className="gallerycard-title themeSecondary mt-2">
                            {eventItem.title}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Gallery;
