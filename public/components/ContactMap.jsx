import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactMap = () => {
  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Form Section */}
        <div className="col-12 col-md-6">
          <h2>Contact us</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">First name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="First name"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lname" className="form-label">Last name</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Last name"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                required
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        {/* Map Section */}
        <div className="col-12 col-md-6">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.1845716596164!2d-80.27715682459777!3d25.758679208023794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c7bcb7ff385f%3A0x14972b97355c8d77!2sVFS%20Global%20Miami%20Visa%20CENTER!5e0!3m2!1sen!2sus!4v1713268624965!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
