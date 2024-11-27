"use client"
import { useState } from "react";
import Sidebar from "../../../../admincomponent/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddTeam() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    img: null,
    date: "",
    profile:"",
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
    form.append("TestimName", formData.name);
    form.append("TestimInfo", formData.info);
    form.append("img", formData.img); // Image file
    form.append("TestimDate", formData.date);
    form.append("TestimProfile", formData.profile); // Default view count
  
    try {
      const response = await fetch("http://localhost:5000/team/createteam", {
        method: "POST",
        body: form,
      });
  
      // Check if the response is successful before parsing as JSON
      if (response.ok) {
        alert("Testimonials created successfully");
        router.push("/adminpanel/testimonials");
      } else {
        // Log the status code and response for debugging
        const errorText = await response.text();
        console.error("Failed to create Testim,:", response.status, errorText);
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
            <h2>Add Testimonials</h2>
            <Link href="/adminpanel/testimonials" className="btn btn-secondary">
              Back to Team
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
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
                Profile
              </label>
              <input
                className="form-control"
                id="profile"
                name="profile"
                rows="3"
                value={formData.profile}
                onChange={handleChange}
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="info" className="form-label">
                About
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
