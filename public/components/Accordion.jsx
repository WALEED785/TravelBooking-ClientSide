import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Accordion.css"; // Only keep if it doesn't override responsiveness

const GoldenAccordion = () => {
  return (
    <div className="container-fluid mt-5 py-5">
      <div className="row d-flex flex-column flex-lg-row">
        {/* Left Side - Image */}
        <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
          <img
            src="https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg"
            alt="Trip"
            className="img-fluid rounded shadow w-100"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Right Side - Accordion */}
        <div className="col-lg-6 col-md-12 golden-bg text-dark p-4 rounded">
          <h3 className="text-center mb-4">How It Works</h3>
          <div className="accordion" id="accordionExample">
            {/* Accordion Items */}
            {[
              {
                id: 1,
                title: "Discover your adventure",
                content:
                  "Define where you want to go, your budget, and your available days. Make your travel dreams come true!",
              },
              {
                id: 2,
                title: "Plan your itinerary",
                content:
                  "We offer packages including flights, hotels, tours, and travel insurance.",
              },
              {
                id: 3,
                title: "Book accommodation and visa",
                content:
                  "Book early for best prices and we’ll assist with your visa process.",
              },
              {
                id: 4,
                title: "Dive into local experiences",
                content:
                  "Enjoy your trip while we support you all the way for a stress-free experience.",
              },
            ].map(({ id, title, content }) => (
              <div className="accordion-item bg-transparent border-0 mb-2" key={id}>
                <h2 className="accordion-header" id={`heading${id}`}>
                  <button
                    className={`accordion-button ${id !== 1 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${id}`}
                    aria-expanded={id === 1 ? "true" : "false"}
                    aria-controls={`collapse${id}`}
                  >
                    {title}
                  </button>
                </h2>
                <div
                  id={`collapse${id}`}
                  className={`accordion-collapse collapse ${id === 1 ? "show" : ""}`}
                  aria-labelledby={`heading${id}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">{content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenAccordion;
