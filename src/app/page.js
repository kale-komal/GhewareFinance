"use client";
import { useEffect } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Banner from "./home/Banner";
import Service from "./home/Service";
import Project from "./home/Project";
import About from "./home/About";
import Footer from "./components/Footer";
import NewsSection from "./home/NewsSection";
import Status from "./home/Status";
import Testimonials from "./home/Testimonials";

export default function Home() {
  useEffect(() => {
    document.title = "Gheware Finance"; // Fallback for updating title
  }, []);
  return (
    <>
      <Head>
        <title>Gheware Finance</title>
      </Head>

      <Header />
      <Banner />
      <Service />
      <Project />
      <About />
      <Testimonials />
      <Status />
      <NewsSection />
      <Footer />
    </>
  );
}
