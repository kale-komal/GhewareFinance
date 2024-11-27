"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import Sidebar from "../../../../../admincomponent/Sidebar";
import Link from "next/link";
import "../../../../globals.css";

export default function AddNews() {
  const params = useParams(); // Access dynamic route params
  const { edit } = params; // Get the galleryId from params

  const [formData, setFormData] = useState({
    name: "",
    img: null,
    date: "",
  });

  // State for storing fetched images
  const [galleryImages, setGalleryImages] = useState([]);

  // Fetch existing event details and gallery images based on galleryId (edit param)
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await fetch(
        `http://localhost:5000/event/getgalleries/${edit}`
        );
        const eventData = await eventResponse.json();

        if (eventData && eventData.length > 0) {
          const event = eventData[0];
          setFormData({
            name: event.title,
            img: event.images || [], // Assuming image_url field is stored in your DB
            date: event.date,
          });
        }

        // Fetch gallery images
        const imagesResponse = await fetch(
         `http://localhost:5000/event/getgalleyimg/${edit}`
        );
        const imagesData = await imagesResponse.json();

        if (imagesData && imagesData.length > 0) {
          setGalleryImages(imagesData);
        }
      } catch (error) {
        console.error("Error fetching event details or images:", error);
      }
    };

    fetchEventDetails();
  }, [edit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("title", formData.name);
    uploadData.append("img", formData.img);

    try {
      const response = await fetch(
        `http://localhost:5000/event/creategalleries/${edit}/images`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();

      if (data) {
        console.log("Event photo added:", data);
        // Refetch gallery images after uploading a new image
        const imagesResponse = await fetch(
          `http://localhost:5000/event/getgalleyimg/${edit}`
        );
        const imagesData = await imagesResponse.json();
        setGalleryImages(imagesData);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading event photo:", error);
    }
  };

  // Handle deleting an image
  const handleDeleteImage = async (imageId) => {
    console.log(imageId);
    try {
      const response = await fetch(
        `http://localhost:5000/event/deletegalleries/${edit}/images/${imageId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.message === "Image deleted successfully") {
        // Remove deleted image from galleryImages state
        setGalleryImages((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0 bg-light" style={{ minHeight: "100vh" }}>
          <Sidebar />
        </div>

        <div className="col-md-8 p-4 ms-5 mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Add Event Photo</h2>
            <Link href="/adminpanel/events" className="btn btn-secondary">
              Back to Event
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Event Title
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

         

            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="img"
                name="img"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Info
            </button>
          </form>

          {galleryImages.length > 0 && (
            <div className="container mt-5">
              <h3>Uploaded Images:</h3>
              <div className="row">
                {galleryImages.map((image) => (
                  <div key={image.id} className="col-md-4 col-6 mb-4">
                    <div className="galleryphoto position-relative">
                      <div
                        className="deletebtn position-absolute top-0 end-0 p-1 bg-danger text-white rounded-circle"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                      <img
                        src={`http://localhost:5000${image.images}`}
                        className="card-img-top"
                        alt="Gallery"
                        width={400}
                        height={200}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}