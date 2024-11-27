"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../../admincomponent/Sidebar";
import Link from "next/link";

export default function EventPage() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllEvent = async () => {
    try {
      const res = await fetch("http://localhost:5000/event/getgalleries");
      if (!res.ok) {
        throw new Error("Network responce was not ok");
      }
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletetevent = async (id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/event/deletegalleries/${id}`,
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
    fetchAllEvent();
  }, []);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("auth=true");

    if (!isAuthenticated) {
      alert("Please log in first.");
      window.location.href = "/admin"; // Redirects to login page
    }

    document.title = "Gfinance | AdminPanel-Events"; // Fallback for updating title
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
            <h1 className="display-5">Events</h1>
            <Link
              href="/adminpanel/events/addevent"
              className="btn btn-success"
            >
              + Add Event
            </Link>
          </div>
          <p className="lead">Manage the latest events articles below.</p>

          {/* News Table */}
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row 1 */}
              {event.map((eventItem) => (
                <tr key={eventItem.id}>
                  <td>{eventItem.title}</td>
                  <td>{eventItem.date}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <Link
                        href={`/adminpanel/events/${eventItem.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deletetevent(eventItem.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                      <Link href={`/adminpanel/events/${eventItem.id}/gallery`}className="">
                        <i className="fa-regular fa-file-image fs-2 ms-3 link"></i>
                      </Link>
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
