"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../../admincomponent/Sidebar";
import Link from "next/link";

export default function EditNews() {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Extract the event ID from the URL
    const fetchedId = window.location.pathname.split("/").pop();
    setId(fetchedId);

    console.log("Fetched ID from URL:", fetchedId); // Debugging line to ensure the ID is correct

    if (fetchedId) {
      setLoading(true);
      fetch(`http://localhost:5000/event/getgalleries/${fetchedId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched event data:", data); // Check the data received
          
          if (Array.isArray(data) && data.length > 0) {
            // Access the first item in the array
            const event = data[0];
            setFormData({
              name: event.title || "",
              info: event.description || "",
              date: event.date || "",
            });
          } else {
            console.error("Invalid data structure:", data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [id]); // Add id as a dependency to refetch data if it changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      title: formData.name,
      description: formData.info,
      date: formData.date,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/event/editgalleries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (response.ok) {
        window.location.href = "/adminpanel/events"; // Redirect after success
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0 bg-light" style={{ minHeight: "100vh" }}>
          <Sidebar />
        </div>

        <div className="col-md-8 p-4 ms-5 mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Edit Event</h2>
            <Link href="/adminpanel/events" className="btn btn-secondary">
              Back to Events
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
                About Event
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
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
