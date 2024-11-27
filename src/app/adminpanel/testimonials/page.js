"use client";
import { useEffect, useState } from "react";
// app/admin/news/page.js
import Sidebar from "../../../admincomponent/Sidebar";
import Link from "next/link";

export default function TeamPage({ TestimID }) {
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTeam = async () => {
    try {
      const res = await fetch("http://localhost:5000/team/getteam");
      if (!res.ok) {
        throw new Error("Network responce was not ok");
      }
      const data = await res.json();
      setTestimonial(data);
    } catch (err) {
      console.error("Error fetching testimonial:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteteam = async (TestimID) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/team/deleteteam/${TestimID}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          window.location.reload();
          fetchAllTeam();
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  useEffect(() => {
    fetchAllTeam();
  }, []);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("auth=true");

    if (!isAuthenticated) {
      alert("Please log in first.");
      window.location.href = "/admin"; // Redirects to login page
    }

    document.title = "Gfinance | AdminPanel-Testimonials"; // Fallback for updating title
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
            <h1 className="display-5">Testimonials</h1>
            <Link href="/adminpanel/testimonials/addteam" className="btn btn-success">
              + Add Team
            </Link>
          </div>
          <p className="lead">Manage the latest team members.</p>

          {/* News Table */}
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Profile</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row 1 */}
              {testimonial.map((teamItem) => (
                <tr key={teamItem.TestimID}>
                  <td>{teamItem.TestimName}</td>
                  <td>{teamItem.TestimDate}</td>
                  <td>{teamItem.TestimProfile}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        href={`/adminpanel/testimonials/${teamItem.TestimID}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteteam(teamItem.TestimID)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
