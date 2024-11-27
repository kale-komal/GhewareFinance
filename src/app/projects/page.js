"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/project.css";
import Link from "next/link";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/project/getproject");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Error loading projects.");
    } finally {
      setLoading(false);
      document.title = "Gfinance | Project";
    }
  };

  const getFirst25Words = (text) => {
    const words = text.split(" "); 
    const first25Words = words.slice(0, 25).join(" "); 
    return first25Words + (words.length > 10 ? "..." : ""); 
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <section>
        <div className="image-container">
          <img
            src="/images/project/projectbg.jpg"
            className="image-overlay"
            alt="Background"
          />
          <div className="overlay-about">Projects</div>
        </div>
      </section>

      <section id="gallery">
        <div className="container-fluid">
          <div className="container">
            <div className="row mt-5 mb-5">
              {projects.map((project, index) => (
                <div key={index} className="col-10 offset-1 mb-3">
                  <div className="row no-gutters  overflow-hidden flex-md-row  h-md-250 position-relative">
                    <div className="col-md-6 p-3">
                      <img
                        src={project.ProjectPhoto}
                        className="card-img"
                        alt={project.ProjectTitle}
                        width={360}
                        height={250}
                      />
                    </div>
                    <div className="col-md-6 detaliProjectinfo d-flex flex-column position-static">
                      <h5 className="themeSecondary fs-3 pb-2">
                        {project.ProjectTitle}
                      </h5>
                      <h6 className="gallerycard-title pb-1">
                        {project.ProjectDate}
                      </h6>
                      <p className="gallerycard-title">
                        {getFirst25Words(project.ProjectInfo)}
                      </p>
                      <Link className="link" href={`/projects/${project.ProjectID}`}>
                      <small className="project-footer text-start mt-auto">
                        Read more ..
                      </small>
                      </Link>
                    </div>
                  </div>
                  <hr/>
                </div>
               
              ))}
            
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;