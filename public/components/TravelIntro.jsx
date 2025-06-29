import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TravelIntro = () => {
  return (
    <div className="container py-5">
      {/* Headline Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-uppercase">
          Turning Unforgettable<br />Moments Into Your
        </h2>
        <h2 className="fw-bold text-primary text-uppercase">Ultimate Adventure</h2>
      </div>

      {/* Image Section */}
      <div className="mb-4 text-center">
        <img
          src="https://static.wixstatic.com/media/nsplsh_45674b375169357132454d~mv2.jpg/v1/fill/w_970,h_577,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20XH_S.jpg"
          alt="Travel Adventure"
          className="img-fluid rounded shadow w-100"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
      </div>

      {/* Text Section */}
      <div className="mx-auto text-center px-3" style={{ maxWidth: '850px' }}>
        <p className="fs-5 text-muted">
          On this site, you'll find everything you need to plan your next adventure —
          from personalized travel itineraries to expert guidance on visa applications.
          Let us be your trusted partner in making every journey memorable.
        </p>
        <p className="fs-5 fw-semibold">Welcome to JetSetGo Services!</p>
      </div>
    </div>
  );
};

export default TravelIntro;
