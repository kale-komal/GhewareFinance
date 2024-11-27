"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import "../../style/project.css";

const ProjectDetail = ({ params }) => {
  const { id } = React.use(params); // Use `React.use()` to unwrap the `params` object
  const [projectItem, setProjectItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch project item by ID
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/project/getproject/${id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProjectItem(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProjectById(); // Fetch project only if `id` is available
    }
  }, [id]);

  useEffect(() => {
    if (projectItem) {
      document.title = `${projectItem.ProjectTitle} | project`; // Set page title dynamically
      <meta name="description" content={projectItem.ProjectInfo} />;
    }
  }, [projectItem]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!projectItem) {
    return <div>project item not found.</div>;
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <Image
            src={projectItem.ProjectPhoto}
            className="hero-bg"
            alt="Project Background"
            layout="fill"
            objectFit="cover"
            quality={85}
          />
          <div className="hero-overlay">
            <h1>{projectItem.ProjectTitle}</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="project-detail container">
        <div className="content-wrapper">
          <div className="project-info mb-4">
            <p className="project-date">
              <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
              {projectItem.ProjectDate}
            </p>
            <div className="project-info">
              <p className="project-description">
                <strong>
                  {projectItem.ProjectInfo.split(" ").slice(0, 2).join(" ")}
                </strong>{" "}
                {projectItem.ProjectInfo.split(" ").slice(2).join(" ")}
              </p>
            </div>
          </div>
          <div className="project-sidebar">
            <h4 className="sidebar-title">Share this Project</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">
                WhatsApp
              </a>
              <a href="#" className="social-icon">
                Twitter
              </a>
              <a href="#" className="social-icon">
                Facebook
              </a>
              <a href="#" className="social-icon">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetail;
