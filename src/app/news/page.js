"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/news.css";

import { useEffect, useState } from "react";
import Link from "next/link";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllNews = async () => {
    try {
      const res = await fetch("http://localhost:5000/news/getnews");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data.NewsPhoto);
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFirst10Words = (text) => {
    const words = text.split(" ");
    const first10Words = words.slice(0, 10).join(" ");
    return first10Words + (words.length > 10 ? "..." : "");
  };

  const getFirst5Words = (text) => {
    const words = text.split(" ");
    const first5Words = words.slice(0, 5).join(" ");
    return first5Words + (words.length > 5 ? "..." : "");
  };

  useEffect(() => {
    fetchAllNews();

    document.title = "Gfinance | News"; // Set page title
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

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
      <section id="news">
        <div className="container-fluid">
          <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5 mt-2">
              {news.map((newsItem) => (
                <div className="col" key={newsItem.NewsID}>
                  <div
                    className="card"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <Image
                      src={`http://localhost:5000${newsItem.NewsPhoto}`} // Full URL by combining localhost and relative path
                      alt="News Image"
                      className="card-img-top"
                      width={500}
                      height={300}
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {getFirst5Words(newsItem.NewsTitle)}
                      </h5>
                      <p className="news-date">
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="pe-2"
                        />{" "}
                        {newsItem.NewsDate}
                      </p>
                      <p className="card-text">
                        {getFirst10Words(newsItem.NewsInfo)}
                      </p>
                    </div>
                    <Link
                      className="card-footer"
                      href={`/news/${newsItem.NewsID}`}
                    >
                      <small className="news-footer">Read more ...</small>
                    </Link>
                  </div>
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

export default NewsSection;
