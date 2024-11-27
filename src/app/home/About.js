import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../style/about.css";

const About = () => {
    return (
<div id="About">
      <div className="container-fluid aboutpara mt-5 mb-4">
        <div className="container">
          <div className="row justify-content-between text-center mt-2 p-2">
            <div className="col-12 col-md-6 ">
              <h1 className="mb-4  aboutheading fw-medium " data-aos="flip-left" data-aos-duration="2000">About us and our skills</h1>
              <p className=" fw-normal fs-6 text-start">
                Lorem ipsum gravida nibh vel velit auctor aliqunean sollicitudin
                lorem quis bibendum auci elit consequat ipsutis sem nibh elit
                duis vulputate.
              </p>
              <p className="fw-normal  text-start">
                Lorem ipsum dolor sit amet, consectetuer gravida nibh vel velit
                auctor aliqunean sollicitudinlorem quis bibendum auci elit
                consequat ipsutis sem nibh id elit. Duis sed odio sit amet nibh
                vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.
                Nam nec tellus.
              </p>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <div className="d-flex justify-content-between">
                <h6 className="text-start">Digital</h6>
                <h6>25%</h6>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Info example"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{width: "25%"}}></div>
              </div>
              <br />
              <div className="d-flex justify-content-between" >
                <h6 className="text-start">Branding</h6>
                <h6>50%</h6>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Info example"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{width: "50%"}}></div>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <h6 className="text-start">Illustration</h6>
                <h6>75%</h6>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Warning example"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{width: "75%"}}></div>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <h6 className="text-start">Photography</h6>
                <h6>100%</h6>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Danger example"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar"  style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

);
};

export default About;