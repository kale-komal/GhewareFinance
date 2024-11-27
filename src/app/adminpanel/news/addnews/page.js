"use client"
import { useState } from "react";
import Sidebar from "../../../../admincomponent/Sidebar";
import Link from "next/link";

export default function AddNews() {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    img: null,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("NewsTitle", formData.name);
    form.append("NewsInfo", formData.info);
    form.append("img", formData.img); // Image file
    form.append("NewsDate", formData.date);
    form.append("NewsViews", 0); // Default view count
  
    try {
      const response = await fetch("http://localhost:5000/news/createnews", {
        method: "POST",
        body: form,
      });
  
      // Check if the response is successful before parsing as JSON
      if (response.ok) {
        alert("News created successfully");
      } else {
        // Log the status code and response for debugging
        const errorText = await response.text();
        console.error("Failed to create news item:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error:", error);
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
            <h2>Add News</h2>
            <Link href="/adminpanel/news" className="btn btn-secondary">
              Back to News
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                News Title
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
              <label htmlFor="info" className="form-label">
                News Information
              </label>
              <textarea
                className="form-control"
                id="info"
                name="info"
                rows="3"
                value={formData.info}
                onChange={handleChange}
              ></textarea>
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

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
