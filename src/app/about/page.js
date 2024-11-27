"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/about.css";

const Aboutus = () => {
  useEffect(() => {
    document.title = "Gfinance | About"; // Fallback for updating title
  }, []);
  return (
    <>
      <Header />
      <div id="Services">
        <section>
          <div className="image-container">
            <img
              src="/images/about/aboutbg.jpg"
              className="image-overlay"
              alt="Background Image"
            />
            <div className="overlay-about">About Gfinance India</div>
          </div>
        </section>
        <section>
          <div className="container-fluid  mt-5 mb-4">
            <div className="container">
              <div className="row  mt-lg-5 p-2">
                <div className="col-12 col-md-6 mt-3">
                  <h1 className="themeSecondary mb-3">Company Profile</h1>
                  <p>
                    Gheware Financial services is today counted among India
                    leading firms. The firm is made of highly expert people who
                    hold thorough knowledge of their respective works. We offer
                    a range of financial services including Audit, Taxation,
                    Management & Financial Consultancy. The firm, its team
                    members and staffs follow professional ethics that allow it
                    to make the customers satisfied by peerless outputs, which
                    are measured up to the level of excellence. We maintain and
                    follow the greatest standards of accuracy in our work by
                    implementing superior Auditing and Accounting procedures.
                  </p>
                  <p>
                    On behalf of our people, knowledge and accessibility, we are
                    competent enough as well as hold requisite expertise,
                    allowing us to handle any assignment without being
                    compromised on the level of quality. Having such faith on
                    ourselves simply means that we have trained and qualified
                    staffs who work through newest facilities and under latest
                    infrastructure. In last, we invite you to meet us at our
                    office where we let you know about our work and about the
                    size of assignments we execute.
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  {/* <Image
                    className="rounded about-img"
                    src="/images/service/service2.jpg"
                    alt="Service Image"
                    width={500}
                    height={400}
                  /> */}
                  <img src="/images/service/service2.jpg" className="about-img rounded"></img>
                </div>
              </div>
              <hr className="mt-lg-4 mb-lg-4"></hr>
              <div className="row">
                <div className=" col-12">
                  <h1 className="themeSecondary">Our Vision</h1>
                  <p>
                    We are open to accept any kind of challenge. We have guts to
                    achieve pinnacle of success. We have through knowledge that
                    lets us complete our client’s projects with desired results.
                    We hold in-depth knowledge of our sphere as well as
                    understand the exact need of clients.
                  </p>
                  <p>
                    Before proceeding to a project, we first initiate a meeting
                    with respective clients and understand their requirements as
                    clearly as possible. Doing so makes our work process easy
                    and smooth as well as allows us to fulfill the project
                    within promised timeframe.
                  </p>
                </div>
              </div>
              <hr className="mt-lg-4 mb-lg-4"></hr>
              <div className="row mb-5 ">
                <div className="mb-4">
                  {" "}
                  <h1 className="themeSecondary ">Directors Profile</h1>
                </div>
                <div className="col-12 col-md-6 ">
                  <h4>Mr.Virendra V. Gheware</h4>
                  <p className="text-secondary aboutdirector-info">
                    Proprietor of Gheware Financial Services Empanel Consultant
                    for DPR,SFAC, Dept. Of Mini. Of Agri.New Delhi
                  </p>
                  <p>
                    <b>Education :</b> B.Com., MBA- Specialised in Finance &
                    marketing, C.A. Artisanship completed
                  </p>
                  <p>
                    <b> Professional Experience :</b> <br />
                    A) MIDC, DIC, MPCB (Maharashtra Pollution Control Board),
                    Excise exemtion work <br />
                    B) Metal & alloys industry, Starch factory, Textile industry{" "}
                    <br />
                    C) State & central governmentgrants / subsidy / proposals{" "}
                    <br />
                    D) Preparation of Bankable Project Report & Subsidy
                    proposals of Agri – Cold Storage, Agro Processing Unit,
                    Winery, Grape, Pomegranate, Mango & Other Mix Fruit
                    Horticulture & Floriculture Proposal successfully submitted
                    & released eligible amount of subsidy from
                    NHB,NABARD,SFAC,DIC under various schemes of Central
                    Govt./State Government. <br /> E) Cluster Development
                    Programmee – Under Ministry Of MSME – Sangli Grape
                    Processing, Marketing & Research Industry Ltd. – Appointed
                    as Financial Consultant & Subsidy Consultant.
                  </p>
                </div>
                <div className="col-12 col-md-6 ">
                  <h4>Mr.Vijay V. Gheware</h4>
                  <p>
                    <b>Education :</b> B.Com, F.C.A
                  </p>

                  <p>
                    <b>Professional Experience :</b> Practising as C.A. from last
                    32 years in following core sector Industrial, Banking &
                    Finance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
