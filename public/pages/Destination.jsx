// src/pages/Destination.jsx
import React from 'react';
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useDestinations } from "../../src/hooks/useDestinations";

// Static images array - maps to destinations by index or name
const staticImages = [
  {
    name: "VARANASI",
    country: "INDIA",
    imgSrc: "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Varanasi%20%C2%B7%20VNS.jpg",
    code: "VNS",
    barcode: "████████████",
    highlighted: false,
  },
  {
    name: "TOKYO",
    country: "JAPAN",
    imgSrc: "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_89746924.jpeg",
    code: "NRT",
    barcode: "█████████████",
    highlighted: true,
  },
  {
    name: "SAN FRANCISCO",
    country: "USA",
    imgSrc: "https://static.wixstatic.com/media/c837a6_821aec3a6dfb4ae0b16135f16586fb05~mv2.jpeg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_60979371.jpeg",
    code: "SFO",
    barcode: "█████████████",
    highlighted: false,
  },
  {
    name: "TUSCANY",
    country: "ITALY",
    imgSrc: "https://static.wixstatic.com/media/c837a6_f0a177e277be4ba2b684b524a458c829~mv2.jpg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tuscany%20%C2%B7%20FLR.jpg",
    code: "FLR",
    barcode: "█████████████",
    highlighted: false,
  },
  {
    name: "PARIS",
    country: "FRANCE",
    imgSrc: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    code: "CDG",
    barcode: "█████████████",
    highlighted: false,
  },
  {
    name: "LONDON",
    country: "UK",
    imgSrc: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    code: "LHR",
    barcode: "█████████████",
    highlighted: false,
  }
];

// Function to match backend data with static images
const mergeDestinationData = (backendDestinations, staticImages) => {
  return backendDestinations.map((destination, index) => {
    // Try to find matching static image by name or use fallback by index
    const matchingImage = staticImages.find(img => 
      img.name.toLowerCase() === destination.name?.toLowerCase() ||
      img.country.toLowerCase() === destination.country?.toLowerCase()
    ) || staticImages[index % staticImages.length]; // Fallback to cycling through images

    return {
      destinationId: destination.destinationId,
      location: `${destination.name?.toUpperCase()} · ${destination.country?.toUpperCase()}`,
      name: destination.name,
      country: destination.country,
      description: destination.description,
      imgSrc: matchingImage?.imgSrc || staticImages[0].imgSrc,
      code: matchingImage?.code || "DEF",
      barcode: matchingImage?.barcode || "█████████████",
      highlighted: matchingImage?.highlighted || false,
      link: `/destination/${destination.destinationId}`, // Dynamic link based on ID
    };
  });
};

const Destination = () => {
  const { destinations, loading, error, status } = useDestinations(true);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <Hero />
        <div className="places">
          <div className="card-container">
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading destinations...</span>
              </div>
              <p className="mt-2">Loading destinations...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <Hero />
        <div className="places">
          <div className="card-container">
            <div className="text-center p-4">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error Loading Destinations</h4>
                <p>{error.message || 'Failed to load destinations. Please try again later.'}</p>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No destinations found
  if (!destinations || destinations.length === 0) {
    return (
      <>
        <Navbar />
        <Hero />
        <div className="places">
          <div className="card-container">
            <div className="text-center p-4">
              <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">No Destinations Found</h4>
                <p>No destinations are currently available. Please check back later.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Merge backend data with static images
  const mergedDestinations = mergeDestinationData(destinations, staticImages);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="places">
        <div className="card-container">
          {mergedDestinations.map((destination) => (
            <Card
              key={destination.destinationId}
              destinationId={destination.destinationId}
              location={destination.location}
              name={destination.name}
              country={destination.country}
              description={destination.description}
              imgSrc={destination.imgSrc}
              code={destination.code}
              barcode={destination.barcode}
              link={destination.link}
              highlighted={destination.highlighted}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Destination;