"use client";
import { useEffect, useState } from "react";
// app/admin/news/page.js
import Sidebar from "../../../admincomponent/Sidebar";
import Link from "next/link";

export default function NewsPage({ NewsID }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllNews = async () => {
    try {
      const res = await fetch("http://localhost:5000/news/getnews");
      if (!res.ok) {
        throw new Error("Network responce was not ok");
      }
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (NewsID) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/news/deletenews/${NewsID}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          fetchAllNews();
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("auth=true");

    if (!isAuthenticated) {
      alert("Please log in first.");
      window.location.href = "/admin"; // Redirects to login page
    }

    document.title = "Gfinance | AdminPanel-News"; // Fallback for updating title
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
            <h1 className="display-5">News</h1>
            <Link href="/adminpanel/news/addnews" className="btn btn-success">
              + Add News
            </Link>
          </div>
          <p className="lead">Manage the latest news articles below.</p>

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
              {news.map((newsItem) => (
                <tr key={newsItem.NewsID}>
                  <td>{newsItem.NewsTitle}</td>
                  <td>{newsItem.NewsDate}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        href={`/adminpanel/news/${newsItem.NewsID}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteNews(newsItem.NewsID)}
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
