import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import airplane from '../images/airplane.png';
import '../style/Hero.css';

const HeroBanner = ({
  heading = "Explore Destinations",
  subheading = "Discover Your Dream Destinations",
  label = "Popular Destinations"
}) => {
  return (
    <section className="hero-banner py-5 bg-light">
      <div className="container">
        {/* Heading */}
        <div>
          <p className="h3 text-uppercase Explore_Destionation">{heading}</p>
        </div>

        {/* Arrow and Subheading */}
        <div className="d-flex align-items-center mb-5">
          <span style={{ fontSize: '60px', color: '#2D94F5' }}>&#8594;</span>
          <p className="h5 mb-0 ms-3 DreamDestination">{subheading}</p>
        </div>

        {/* Airplane Logo and Label */}
        <div className="d-flex">
          <img
            src={airplane}
            alt="Airplane"
            width={90}
            height="auto"
            className="mb-3 DestinationLogo rounded-circle"
          />
          <h5 className="fw-bold mt-4 Popular">{label}</h5>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
