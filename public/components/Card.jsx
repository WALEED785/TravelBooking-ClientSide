import React from "react";
import "../style/Card.css";
import { Link } from "react-router-dom";

const Card = ({ location, imgSrc, code, barcode, link, highlighted }) => {
  return (
    <div className={`card-wrapper ${highlighted ? "highlighted" : ""}`}>
      <div className="card">
        <img src={imgSrc} alt={location} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{location}</h5>
          <p className="card-text">Code: {code}</p>
          <p className="card-text">Barcode: {barcode}</p>
          <Link to="/ParisTravelPage" className="btn btn-primary">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
