import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroBanner = ({
  mainHeading = "ABOUT",
  subHeading = "UNIQUE JOURNEY AWAIT",
  highlightText = "We Know Where to Find Real Treasure",
}) => {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="text-uppercase fw-bold bg-transparent" style={{textAlign:"-webkit-left" , color:"rgb(6, 6, 75)"}} >{mainHeading}</h1>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-center mb-5 ">
        <span className="display-3 text-primary">&#8594;</span>
        <h1
          className="h1 fw-semibold mt-3 mt-md-0 ms-md-4 mb-0 py-3 fs-1 bg-transparent"
          style={{ color:"#2D94F5",lineHeight: 1}}
        >
          {subHeading}
        </h1>
      </div>

      <div className="destination d-flex flex-column flex-md-row align-items-center">
        <div className="bg-warning border border-danger rounded-circle p-3 d-inline-block mb-3 mb-md-0 me-md-4">
          <img
            src="https://static.thenounproject.com/png/200336-200.png"
            alt="Destination Logo"
            className="img-fluid rounded-circle"
            style={{ width: "60px", height: "60px" }}
          />
        </div>

        <div className="pt-2 pt-md-3 text-center text-md-start">
          <h5 className="fw-bold mb-0 fs-1 fs-5 fs-md-4"  style={{color:"rgb(6, 6, 75)"}}>{highlightText}</h5>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
