"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/contact.css";

const Contact = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: e.target.name.value,
      address: e.target.address.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      enquiry: e.target.enquiry.value,
    };
  
    const response = await fetch('http://localhost:5000/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      alert('Feedback sent successfully!');
      e.target.reset(); // Reset the form fields
    } else {
      alert('Failed to send feedback. Please try again.');
    }
  };
  

  useEffect(() => {
    document.title = "Gfinance | Contact";
  }, []);
  
  return (
    <>
      <Header />
      <section id="contact">
        <section>
          <div className="image-container">
            <img
              src="/images/contact/contactbg.jpg"
              className="image-overlay"
              alt="Background Image"
            />
            <div className="overlay-about">Contact Us - Get in Touch</div>
          </div>
        </section>
        <section>
          <div className="container-fluid  mt-5 mb-5">
            <div className="container">
              <div className="row  mt-2 p-2">
                <h2 className="mb-5 themeSecondary">
                  Always taking care of your financial needs :)
                </h2>
                <div className="col-xl-8 col-12 border shadow mb-5">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <h4>Send Us Feedback</h4>
                    <input type="text" name="name" placeholder="Full Name" required />
                    <input type="text" name="address" placeholder="Address" />
                    <input type="email" name="email" placeholder="Email Address" required />
                    <input type="tel" name="contact" placeholder="Contact Number" required />
                    <textarea name="enquiry" placeholder="Enquiry" rows={3} required></textarea>
                    <button className="contactform-btn" type="submit">Send</button>
                  </form>
                </div>
                <div className="col-xl-4 col-12 ">
                  <div className="contact-container ms-md-5">
                    <div className="contact-info ms-5 ">
                      <i className="fa-solid fa-location-dot fs-3 footericon pb-3"></i>
                      <h6 className="fs-5 pb-2">Address</h6>
                      <p>
                        4, North Shivaji nagar, behind Dadage girls highschool,
                        Sangli 416 416 Maharashtra, (India)
                      </p>
                    </div>
                    <div className="contact-info ms-5">
                      <i className="fa-solid fa-phone fs-3 footericon pb-3"></i>
                      <h6 className="fs-5 pb-2">Phone Number</h6>
                      <p>
                        +91-7757099196
                        <br />
                        +91-233-3551359
                      </p>
                    </div>
                    <div className="contact-info ms-5">
                      <i className="fa-solid fa-envelope fs-3 footericon pb-3"></i>
                      <h6 className="fs-5 pb-2">Email Address</h6>
                      <p>vg8480@yahoo.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
