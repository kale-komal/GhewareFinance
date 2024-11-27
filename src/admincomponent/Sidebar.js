// components/Sidebar.js
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Sidebar() {

  const handleLogout = () => {
    document.cookie = "auth=; path=/; max-age=0";
      window.location.replace("/admin");
  };
  

  return (
    <div
      className="d-flex flex-column p-2 bg-secondary"
      style={{ width: "250px", height: "120vh" }}
    >
      <h4 className="text-start text-light pt-4 mb-2">
        <img src="/images/logo/logo.png " width={40} height={40}></img> Gfinance
        India
      </h4>
      <hr className="text-light"></hr>
      <ul className="nav nav-pills flex-column mb-auto pt-2">
        <li className="nav-item">
          <Link href="/adminpanel/dashboard" className="nav-link link-light">
            <i className="fa-solid fa-gauge pe-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/adminpanel/news" className="nav-link link-light">
            <i className="fa-regular fa-newspaper  pe-2"></i> News
          </Link>
        </li>
        <li>
          <Link href="/adminpanel/testimonials" className="nav-link link-light">
            <i className="fa-regular fa-user pe-2"></i> Testimonials
          </Link>
        </li>
        <li>
          <Link href="/adminpanel/events" className="nav-link link-light">
            <i className="fa-regular fa-calendar pe-2"></i> Events
          </Link>
        </li>
        
        <li onClick={handleLogout} style={{ cursor: "pointer" }} className="nav-link link-light">
          <i className="fa-solid fa-right-from-bracket pe-2 "></i> Logout
        </li>

      </ul>
    </div>
  );
}
