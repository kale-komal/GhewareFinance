"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/service.css";

const Services = () => {
  useEffect(() => {
    document.title = "Gfinance | Services "; // Fallback for updating title
  }, []);
  return (
    <>
      <Header />
      <div id="Services">
        <section>
          <div className="image-container">
            <img
              src="/images/service/servicebg.jpg"
              className="image-overlay"
              alt="Background Image"
            />
            <div className="overlay-about">Services</div>
          </div>
        </section>
        <section>
          <div className="container-fluid  mt-5 mb-4">
            <div className="container">
              <div className="row  mt-2 p-2">
                <div className="col-12 col-md-6 ">
                  <Image
                    className="rounded-5 service-img mt-md-5 mt-lg-1"
                    src="/images/service/service1.jpg"
                    alt="Service Image"
                    width={500}
                    height={400}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <h3 className="themeSecondary">
                    Loan proposals from banks financial institutions
                  </h3>
                  <ul className="p-2 ms-3 fs-6 ">
                    <li>For term loan</li>
                    <li>Working capital limits</li>
                    <li>Bill discounting</li>
                    <li>Opening inland & foreign letter of credit </li>
                    <li>Issuing guarantees</li>
                    <li>Restructuring</li>
                    <li>Venture capital</li>
                  </ul>
                </div>
              </div>
              <div className="row  mt-lg-5 p-2">
                <div className="col-12  mt-3">
                  <h3 className="themeSecondary">
                    Preparation of project report / /due diligence report /
                    Technical & economical viability (TEV Report): Project
                    assigned are
                  </h3>
                  <ul className="pt-3">
                    <li>
                      Pre cooling & cold storages, warehouses, Grape winery,
                      Agro processing, solvent extraction, Horticulture, Grape,
                      Mango, pomegranate & Floriculture Rose, Gerbera, Lilium,
                      Carnation.
                    </li>
                    <li>
                      Engineering metal & alloys, Textiles spinning mills, power
                      loom & cloth processing, garment, wind mills
                    </li>
                    <li>Sugar factories, Maize processing, Poultry, Hotels</li>
                  </ul>
                  <p>
                    Cluster development program under Ministry of MSME Sangli
                    Grape Processing, marketing & Research industry ltd. This is
                    the first cluster developed. Subsidy grants up to 70% of the
                    project sanctioned.
                  </p>
                </div>
              </div>
              <div className="row  mt-lg-5 p-2">
                <div className="col-12 col-md-6 mt-3">
                  <h3 className="themeSecondary">Industrial Services</h3>
                  <ul className="p-2 ms-3 fs-6 ">
                    <li>Services of MIDC </li>
                    <li>Services of DIC </li>
                  </ul>
                  <p>
                    We are having well rapo with Bankers, Institutions and
                    investors.
                    <br />
                    Our experiences in this field will not provide only funds
                    but project will be economically viable and marketable. Our
                    organization includes CA, Lawyer, Architect and MBAs
                    specially experienced in housing & commercial projects
                  </p>
                </div>
                <div className="col-12 col-md-6 ">
                  <Image
                    className="rounded-circle service-img"
                    src="/images/service/service2.jpg"
                    alt="Service Image"
                    width={500}
                    height={400}
                  />
                </div>
              </div>
              <div className="row  mt-lg-5 p-2">
                <div className="col-12 col-md-6 mt-3">
                  <h3 className="themeSecondary">
                    Services of state & central subsidies for
                  </h3>
                  <ul className="p-2 ms-3 fs-6 ">
                    <li>Industry</li>
                    <li>Hotels</li>
                    <li>Agro processing / cold storage & warehouses</li>
                    <li>Horticulture</li>
                    <li>Wind mills</li>
                  </ul>
                  <Image
                    className="rounded-5 shadow p-3 mb-5 bg-body-tertiary service-clm-img"
                    src="/images/service/service3.jpg"
                    alt="Service Image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <h3 className="themeSecondary">
                  Services to Bakers
                  </h3>
                 <ol type="A">
                  <li>In the field of apprisal</li>
                  <ul type="disc">
                    <li>Preparation of Bank appraisal</li>
                    <li>CMA</li>
                    <li>DSCR, BEP, Debt-Equity, Sensitive & SWOT analysis</li>
                    <li>Credit rating</li>
                    <li>Back office operations</li>
                  </ul>
                  <li>In the field of marketing & financial products Business loans, Home loans, Pledge loans.</li>
                  <li>TEV Report</li>
                 </ol>
                  <Image
                    className="rounded-5 shadow p-3 mb-5 bg-body-tertiary service-clm-img"
                    src="/images/service/service4.jpg"
                    alt="Service Image"
                    width={300}
                    height={300}
                  />
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

export default Services;
