"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import "../../style/news.css";

const NewsDetail = ({ params }) => {
  const { id } = React.use(params); // Use `React.use()` to unwrap the `params` object
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch news item by ID
  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/news/getnews/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setNewsItem(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchNewsById(); // Fetch news only if `id` is available
    }
  }, [id]);

  useEffect(() => {
    if (newsItem) {
      document.title = `${newsItem.NewsTitle} | News`; // Set page title dynamically
      <meta name="description" content={newsItem.NewsInfo} />;
    }
  }, [newsItem]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsItem) {
    return <div>News item not found.</div>;
  }

  const formatInfo = (text) => {
    return text.split("\n").map((line, index) => (
      <div key={index} style={{ marginBottom: "1em" }}>
        {line}
      </div>
    ));
  };
  
  
  return (
    <>
      <Header />
      <section>
        <div className="image-container">
          <img
            src="/images/news/newsbg.avif"
            className="image-overlay"
            alt="Background Image"
          />
          <div className="overlay-about">News</div>
        </div>
      </section>
      <section id="news-detail">
        <div className="container-fluid ">
          <div className="container">
            <div className=" row">
              <div className="col-md-8 col-12 mt-5">
                <h2 className="card-title">{newsItem.NewsTitle}</h2>
                <p className="news-dates mt-3 mb-3">
                  <FontAwesomeIcon icon={faCalendarDays} className="pe-2" />
                  {newsItem.NewsDate}
                </p>
                <hr className="mt-2 mb-2" />
                <Image
                 src={`http://localhost:5000${newsItem.NewsPhoto}`} 
                  className="mt-3 mb-5 news-img"
                  alt="News Image"
                  width={500}
                  height={400}
                />

                <div className="card-text card-texts mb-5">{formatInfo(newsItem.NewsInfo)}</div>
              </div>
              <div className="col-md-4 col-12 mt-md-5">
                <div className="Nsocial-share mt-md-3 " >
                  <h4 className="Nsocial-share-title">Share this News</h4>
                  <div className="Nsocial-icons d-flex justify-content-start gap-4">
                    <i className="fa-brands fa-whatsapp fs-4"></i>
                    <i className="fa-brands fa-twitter fs-4"></i>
                    <i className="fa-brands fa-facebook fs-4"></i>
                    <i className="fa-brands fa-linkedin fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewsDetail;
