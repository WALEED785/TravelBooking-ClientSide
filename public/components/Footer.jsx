import "../style/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container p-4" style={{ backgroundColor: "goldenroad" }}>
      <h2>Get exclusive updates</h2>
      <div className="subtitle mb-2">Subscribe to our newsletter</div>
      <div className="description mb-3">
        Sign up to our newsletter to receive the latest travel updates.
      </div>

      <div className="d-flex">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="mb-2 text-start section-title">Phone</div>
          <input
            type="text"
            className="form-control mb-3 input-line"
            placeholder="Enter your phone"
            required
          />

          <div className="mb-2 text-start section-title">Email*</div>
          <input
            type="email"
            className="form-control mb-3 input-line"
            placeholder="Enter your email"
            required
          />

          <button className="btn btn-warning w-100 subscribe-btn mb-3">
            SUBSCRIBE
          </button>
        </div>
      </div>

      <div className="disclaimer text-muted mb-5">
        You agree to receive automated transactional messages and emails.
        Reply STOP to end.
      </div>

      <div className="row footer">
        <div className="col-md-6 footer-column d-flex flex-column align-items-start mb-3 mb-md-0">
          <Link to="/" className="footer-link">Destinations</Link>
          <Link to="/plaintrip" className="footer-link">Plan your trip</Link>
          <Link to="/magzine" className="footer-link">Magazine</Link>
          <Link to="/visa" className="footer-link">Visas</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">contactUs</Link>
        </div>

        <div className="col-md-6 footer-column d-flex flex-column align-items-start">
          <div className="footer-title mb-2">Contact</div>
          <Link to="#" className="footer-link">FAQ</Link>
          <Link to="#" className="footer-link">Terms & Conditions</Link>
          <Link to="#" className="footer-link">Privacy Policy</Link>
          <Link to="#" className="footer-link">Instagram</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
