'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const Status = () => {
  // Ensure Bootstrap JS is loaded (only needed for client-side components)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <section id="status">
    <img src="images/statusbg.avif" className="statusbg-img" />
    <div className="container-fluid status status-text">
      <div className="container">
        <div className="row mt-5  pt-3">
          <div
            className="col-12 col-lg-3 col-sm-6 mt-lg-5 mt-sm-3 mb-lg-5 d-flex justify-content-center gap-3"
          >
            <i className="fa-regular fa-moon py-3"></i>
            <h3 className="py-3">103</h3>
            <span className="py-2 fs-1">|</span>
            <h4>Moon <br />passed</h4>
          </div>
          <div
            className="col-12 col-lg-3 col-sm-6 mt-lg-5 mt-sm-3 mb-lg-5 d-flex justify-content-center gap-3"
          >
            <i className="fa-solid fa-rocket py-3"></i>
            <h3 className="py-3">211</h3>
            <span className="py-2 fs-1">|</span>
            <h4>
              Projects <br />
              done
            </h4>
          </div>
          <div
            className="col-12 col-lg-3 col-sm-6 mt-lg-5 mt-sm-3 mb-lg-5 d-flex justify-content-center gap-3"
          >
            <i className="fa-regular fa-lightbulb py-3"></i>
            <h3 className="py-3">93</h3>
            <span className="py-2 fs-1">|</span>
            <h4>
              Ideas <br />
              Realized
            </h4>
          </div>
          <div
            className="col-12 col-lg-3 col-sm-6 mt-lg-5 mb-lg-5 mt-sm-3 d-flex justify-content-center gap-3"
          >
            <i className="fa-solid fa-users py-3"></i>
            <h3 className="py-3">250</h3>
            <span className="py-2 fs-1">|</span>
            <h4>
              Happy <br />
              clients
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Status;
