"use client"
import Link from "next/link";
import Sidebar from "../../../admincomponent/Sidebar";
import { useEffect } from "react";

export default function DashboardPage() {


  useEffect(() => {
    const isAuthenticated = document.cookie.includes("auth=true");

    if (!isAuthenticated) {
      alert("Please log in first.");
      window.location.href = "/admin"; // Redirects to login page
    }

    document.title = "Gfinance | AdminPanel-Dashboard"; // Fallback for updating title
  }, []);
  

  return (
    <div>
      {/* Main layout with Sidebar and Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 p-0 bg-light">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="col-md-8 ms-5 mt-5">
            <div className="p-4">
              <h1>Dashboard</h1>
              <p>Welcome to the Admin Dashboard.</p>
              <div className="row">
                {/* Example Cards */}
                <div className="col-md-4">
                  <div className="card text-white bg-primary mb-3">
                    <Link href="/adminpanel/news" className="link">
                      <div className="card-body text-light">
                        <h5 className="card-title">News</h5>
                        <p className="card-text ">
                          Manage news articles and updates.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-success mb-3">
                    <Link href="/adminpanel/testimonials" className="link">
                      <div className="card-body text-light">
                        <h5 className="card-title">Testimonials</h5>
                        <p className="card-text">
                          View and manage client testimonials.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-warning mb-3">
                    <Link href="/adminpanel/events" className="link">
                      <div className="card-body text-light">
                        <h5 className="card-title">Events</h5>
                        <p className="card-text">
                          Organize and schedule events.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
