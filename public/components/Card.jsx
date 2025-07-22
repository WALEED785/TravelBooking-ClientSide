// src/components/Card.jsx
import React from "react";
import "../style/Card.css";
import { Link } from "react-router-dom";

const Card = ({ 
  destinationId, 
  location, 
  name, 
  country, 
  description, 
  imgSrc, 
  code, 
  barcode, 
  link, 
  highlighted 
}) => {
  return (
    <div className={`card-wrapper ${highlighted ? "highlighted" : ""}`}>
      <div className="card">
        <img src={imgSrc} alt={location} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{location}</h5>
          <p className="card-text">{name}, {country}</p>
          {description && (
            <p className="card-text">
              <small className="text-muted">
                {description.length > 100 
                  ? `${description.substring(0, 100)}...` 
                  : description
                }
              </small>
            </p>
          )}
          <p className="card-text">Code: {code}</p>
          <p className="card-text">Barcode: {barcode}</p>
          <Link 
            to={link || `/destination/${destinationId}`} 
            className="btn btn-primary"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;