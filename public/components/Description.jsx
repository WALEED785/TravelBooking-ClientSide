import React from "react";
import "../style/Description.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Description = () => {
  return (
    <div className="main-container container-fluid px-0">
      <img
        src="https://t3.ftcdn.net/jpg/00/43/30/66/360_F_43306641_gKoJjgOpY8rQ34bFahF9iaMhdcI5lJNI.jpg"
        alt="Paris"
        className="hero-image img-fluid"
      />

      <div
        className="content-wrapper d-flex flex-wrap justify-content-center"
        style={{ marginTop: "-34vw" }}
      >
        <div className="page col-lg-6">
          <h1>PARIS FRANCE</h1>

          <span className="description-label">Description:</span>

          <div className="description-content">
            <p>
              Experience the Timeless Charm of Paris with JetSetGo Travels and
              Tour
            </p>

            <p>
              Induge in the enchanting ambiance of the City of Light with
              JetSetGo Travels and Tour as your trusted travel companion. Paris,
              with its timeless elegance and Beckons travellers from around the
              globe to immerse themselves in its rich tapestry of art, and
              history.
            </p>

            <p>
              From hassle-free visa application support to securing the perfect
              flight and hotel accommodations, JetSetGo Travels and Tour takes
              care of every detail, allowing you to focus on savoring every
              moment in this iconic city. Need a car rental to explore the
              charming streets of Montmartre or venture out to the breathtaking
              Palace of Versailles? We have got you covered.
            </p>

            <p>
              At JetSetGo Travels and Tour your peace of mind is our priority.
              That is why we offer comprehensive travel medical insurance,
              ensuring that you can explore Paris with confidence, knowing that
              you are protected every step of the way.
            </p>

            <p>
              So whether you are dreaming of strolling along the Seine at
              sunset, savoring gourmet delights in a quaint Parisian café, or
              discovering hidden gems in the City of Light, let JetSetGo Travels
              and Tour turn your Parisian fantasies into reality. Start planning
              your unforgettable journey today, and let the magic of Paris
              enchant you like never before.
            </p>
          </div>

          <hr />
        </div>

        <div className="barcode col-lg-6">
          <div id="barcode-header">
            <p className="p1">
              CDG &nbsp;&nbsp;&nbsp;&nbsp; |||||||||||||||||||||||
            </p>
            <p className="p2">Tags.</p>
            <hr />
            <p className="p3">City, Culture, Paris, visa, travel, france</p>
          </div>
          <div className="btn-container">
            <button className="btn1">
              <Link to="/contact">CONTACT US</Link>
            </button>
            <button className="btn2">
              <Link to="/plaintrip">ALL DESTINATIONS</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
