"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import "../style/project.css";

const Project = () => {

  const [projects, setprojects] = useState([]); // State to hold testimonials data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  const fetchAllprojects = async () => {
    try {
      const res = await fetch("http://localhost:5000/project/getproject");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json(); // Parse JSON response
      setprojects (data.slice(0, 4)); // Limit to the first three testimonials
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Error loading testimonials.");
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  const getFirst6Words = (text) => {
    const words = text.split(" "); 
    const first6Words = words.slice(0, 6).join(" "); 
    return first6Words + (words.length > 10 ? "..." : ""); 
  };

  useEffect(() => {
    fetchAllprojects(); // Fetch testimonials when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if loading failed
  }

  return (
    <section id="projects">

      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="heading">
              <h1
                className="project-heading text-center mt-4 "
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                Our Projects
              </h1>{" "}
            </div>
          </div>

          <div className="row mt-5 project-container">
          {projects.map((project, index) => (
            <div key={index}
              className="col-md-3 col-6 "
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              <div className="fadeImage">
                <div className="project-card">
                  <img
                     src={project.ProjectPhoto}
                    alt="Avatar"
                    width={150}
                    height={150}
                    className="project-image"
                  />
                 <Link className="link" href={`/projects/${project.ProjectID}`}>
                 <div className="overlay">
                    <div className="project-name">
                    {project.ProjectTitle}
                      <br/>
                    </div>
                  </div>
                 </Link>
                  <div className="project-title text-bg-light p-3 ">
                    <h5 className="mt-2 poppins-regular text-center themeSecondary">
                    {project.ProjectTitle}
                    </h5>
                    <span className="mt-2 text-center">
                    {getFirst6Words(project.ProjectInfo)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
             ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="projectbutton">
        <Link className="viewbtn"  href="/projects" ><span>View More</span> </Link>
        </button>
      </div>
    </section>
  );
};

export default Project;