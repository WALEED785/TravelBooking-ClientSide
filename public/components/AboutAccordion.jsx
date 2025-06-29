import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutAccordion = () => {
  return (
    <div className="container my-4">
      <div className="row align-items-stretch">
        {/* Left side: Image */}
        <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
          <div className="h-100 d-flex justify-content-center align-items-center" style={{ maxWidth: '300px', width: '100%' }}>
            <img
              src="images/company logo.png"
              alt="Company Logo"
              id="box1-img"
              className="img-fluid"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Right side: Accordion */}
        <div className="col-12 col-md-6">
          <div className="accordion h-100" id="aboutAccordion">
            <div className="accordion-item bg-warning border-0 rounded h-100 d-flex flex-column">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed bg-warning text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  About ME
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#aboutAccordion"
              >
                <div className="accordion-body" style={{ fontSize: '16px', color: '#212529', marginTop: 0 }}>
                  <p>
                    Discover JetSetGo Services: Your Trusted Partner for Seamless Travel, Notarizations, and Visa Assistance. With over a decade of experience, we specialize in crafting personalized travel experiences, providing expert notarization services.
                  </p>
                  <p>
                    Thank you for considering JetSetGo services for your travel and notary needs! Feel free to contact us using the contact form below and we will get back to you soon. Your satisfaction is our priority!
                  </p>
                  <address>
                    2655 S Le Jeune Rd Suite 519 <br />
                    Coral Gables, FL 33134
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAccordion;
