"use client"; // Ensure this is at the top
import { useState, useEffect } from "react";
import Sidebar from "../../../../admincomponent/Sidebar";
import Link from "next/link";

export default function EditTeam() {
  const [formData, setFormData] = useState({
    name: "",
    profile:"",
    info: "",
    img: null,
    date: "",
  });

  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [id, setId] = useState(null); // Track the dynamic id (e.g., passed via props or URL)

  // Fetching news data when the component mounts or when the id changes
  useEffect(() => {
    const fetchedId = window.location.pathname.split("/").pop(); // Assuming your URL structure provides the ID at the end
    setId(fetchedId);

    if (fetchedId) {
      setLoading(true);
      fetch(`http://localhost:5000/team/getteam/${fetchedId}`) // Correct API endpoint to fetch specific news by ID
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: data.TestimName || "",
            info: data.TestimInfo || "",
            profile: data.TestimProfile || "",
            img: data.TestimPhoto || null, // If image is returned, set it to img field
            date: data.TestimDate || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, []); 

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpdate = new FormData();
    dataToUpdate.append("TestimName", formData.name);
    dataToUpdate.append("TestimInfo", formData.info);
    dataToUpdate.append("TestimProfile", formData.profile);
    dataToUpdate.append("TestimDate", formData.date);

    if (formData.img) {
      dataToUpdate.append("TestimPhoto", formData.img);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/team/editteam/${id}`,
        {
          // Use id here instead of NewsID
          method: "PATCH",
          body: dataToUpdate,
        }
      );

      if (response.ok) {
        const updatedTeam = await response.json();
        console.log("Team updated successfully:", updatedTeam);
        window.location.href = "/adminpanel/testimonials"; // Redirect after success
      } else {
        console.error("Failed to update team");
      }
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  // Show loading or error message if the data is still loading or there's an error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            <h2>Edit Testimonials</h2>
            <Link href="/adminpanel/testimonials" className="btn btn-secondary">
              Back to Team
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
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
              <label htmlFor="profile" className="form-label">
                Profile
              </label>
              <input
                type="text"
                className="form-control"
                id="profile"
                name="profile"
                value={formData.profile}
                onChange={handleChange}
              />
            </div>

            {/* Info Field */}
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

            {/* Image Display */}

            {formData.img && (
              <div className="mb-3">
                <label className="form-label">Current Image</label>
                <div>
                  <img
                    src={`http://localhost:5000${formData.img}`} // Update URL with the correct path to the image
                    alt="Current Photo"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Upload New Image
              </label>
              <input
                type="file"
                className="form-control"
                id="img"
                name="img"
                onChange={handleChange}
              />
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
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
