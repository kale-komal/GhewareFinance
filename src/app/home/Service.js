"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import "../style/service.css";

const Service = () => {
  return (
    <div id="section">
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <h1 className="text-center mt-4 fw-medium sectionheading ">
              What we do
            </h1>
            <p className="text-center fs-6 mt-3">
              We provide professional services for inbound and outbound business
              set up. We offer a complete range of financial solutions to our
              clients. We take care of investment banking & financial planning
              requirements by providing authentic advice.
            </p>
          </div>
          <div className="row justify-content-between text-center mt-3">
            <div
              className="col-12 col-md-4 mt-3"
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              <Link className="servicelink" href="/services">
                <i className="fa-solid fa-computer iconFs"></i>
                <h3 className="mt-3 sectionpara">Financial projects</h3>{" "}
                <p className="text-center mt-3 text-secondary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </p>
              </Link>
            </div>
            <div
              className="col-12 col-md-4 mt-3"
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              <Link className="servicelink" href="/services">
                <i className="fa-solid fa-money-check-dollar iconFs"></i>
                <h3 className="mt-3 sectionpara">Loan proposals</h3>{" "}
                <p className="text-center mt-3 text-secondary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the sstandard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </p>
              </Link>
            </div>
            <div
              className="col-12 col-md-4 mt-3"
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              <Link className="servicelink" href="/services">
                <i className="fa-solid fa-building-columns iconFs"></i>
                <h3 className="mt-3 sectionpara">Bankable projects</h3>{" "}
                <p className="text-center mt-3 text-secondary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
