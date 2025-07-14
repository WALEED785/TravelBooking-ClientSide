import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/Hero';
import AccordionBootstrap from '../components/Accordion';
import Card from '../components/Card.jsx';
import Footer from "../components/Footer.jsx";

const PlainTrip = () => {
  const cardData = [
    {
      location: "VARANASI · INDIA",
      imgSrc: "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg",
      code: "MRS",
      barcode: "████████████",
      link: "description.html",
      highlighted: false,
    },
    {
      location: "TOKYO · JAPAN",
      imgSrc: "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg",
      code: "BKK",
      barcode: "█████████████",
      link: "description.html",
      highlighted: true,
    },
    {
      location: "SAN FRANCISCO · USA",
      imgSrc: "https://static.wixstatic.com/media/c837a6_821aec3a6dfb4ae0b16135f16586fb05~mv2.jpeg",
      code: "ICN",
      barcode: "█████████████",
      link: "description.html",
      highlighted: false,
    },
    {
      location: "TUSCANY · ITALY",
      imgSrc: "https://static.wixstatic.com/media/c837a6_f0a177e277be4ba2b684b524a458c829~mv2.jpg",
      code: "PMO",
      barcode: "█████████████",
      link: "description.html",
      highlighted: false,
    },
    {
      location: "TOKYO · JAPAN",
      imgSrc: "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg",
      code: "BKK",
      barcode: "█████████████",
      link: "description.html",
      highlighted: true,
    },
    {
      location: "VARANASI · INDIA",
      imgSrc: "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg",
      code: "MRS",
      barcode: "████████████",
      link: "description.html",
      highlighted: false,
    },
    {
      location: "TOKYO · JAPAN",
      imgSrc: "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg",
      code: "BKK",
      barcode: "█████████████",
      link: "description.html",
      highlighted: true,
    },
    {
      location: "VARANASI · INDIA",
      imgSrc: "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg",
      code: "MRS",
      barcode: "████████████",
      link: "description.html",
      highlighted: false,
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroBanner
  heading="Plan Your Trip"
  subheading={
    <>
      THE WORLD IS YOURS WITH <br />
      JETSETGO TRAVELS AND TOUR
    </>
  }
  label="Top Travel Picks"
/>

      <AccordionBootstrap />
      <div className="places" style={{ marginTop: "150px" }}>
        <div className="card-container">
          {cardData.map((card, index) => (
            <Card
              key={index}
              location={card.location}
              imgSrc={card.imgSrc}
              code={card.code}
              barcode={card.barcode}
              link={card.link}
              highlighted={card.highlighted}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlainTrip;
