import React from 'react';
import '../style/ContactForm.css'; // Import your external CSS

const ContactForm = () => {
  return (
    <div className="main-container py-4 bg-light">
      <div className="contact-container container bg-white p-4 shadow rounded">
        <div className="header d-flex align-items-center text-white p-3 mb-4 rounded">
          <img src="images/company logo.png" alt="icon" className="me-2" style={{ width: '30px', height: '30px' }} />
          Contact Us and get help now!
        </div>

        <form>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name *</label>
              <input type="text" className="form-control border-bottom" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name *</label>
              <input type="text" className="form-control border-bottom" required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email *</label>
              <input type="email" className="form-control border-bottom" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Preferred Dates</label>
              <input type="text" className="form-control border-bottom" placeholder="MM/DD/YYYY - MM/DD/YYYY" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Destination</label>
            <select className="form-select border-bottom">
              <option value="">Select Destination</option>
              <option>Paris</option>
              <option>London</option>
              <option>Japan</option>
              <option>New York</option>
              <option>India</option>
              <option>Malaysia</option>
              <option>South Korea</option>
              <option>Canada</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 text-uppercase mt-3 fw-bold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
