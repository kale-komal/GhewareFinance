"use client";
import { useState } from "react";
import Sidebar from "../../../../admincomponent/Sidebar";
import Link from "next/link";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
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
    form.append("title", formData.name);
    form.append("description", formData.info);
    form.append("date", formData.date);
  
    try {
      const response = await fetch("http://localhost:5000/event/creategalleries", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Event added successfully !");
        window.location.href = "/adminpanel/events"; // Redirect after success
      } else {
        const errorText = await response.text();
        console.error("Failed to create event:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 p-0 bg-light" style={{ minHeight: "100vh" }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-8 p-4 ms-5 mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Add Event</h2>
            <Link href="/adminpanel/events" className="btn btn-secondary">
              Back to Event
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
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

            {/* Info Field */}
            <div className="mb-3">
              <label htmlFor="info" className="form-label">
                 Event Information
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


            {/* Date Field */}
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
          Save info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
