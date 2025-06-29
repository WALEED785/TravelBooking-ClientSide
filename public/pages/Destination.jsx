// src/pages/Destination.jsx
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const cardData = [
  {
    location: "VARANASI · INDIA",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Varanasi%20%C2%B7%20VNS.jpg",
    code: "MRS",
    barcode: "████████████",
    link: "description.html",
    highlighted: false,
  },
  {
    location: "TOKYO · JAPAN",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_89746924.jpeg",
    code: "BKK",
    barcode: "█████████████",
    link: "description.html",
    highlighted: true,
  },
  {
    location: "VARANASI · INDIA",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_a5cb890032c1469d814ad92901912a0c~mv2.jpg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Varanasi%20%C2%B7%20VNS.jpg",
    code: "MRS",
    barcode: "████████████",
    link: "description.html",
    highlighted: false,
  },
  {
    location: "TOKYO · JAPAN",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_e4b697adfcf34c61b1ef587a5a24b788~mv2.jpeg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_89746924.jpeg",
    code: "BKK",
    barcode: "█████████████",
    link: "description.html",
    highlighted: true,
  },
  {
    location: "SAN FRANCISCO · USA",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_821aec3a6dfb4ae0b16135f16586fb05~mv2.jpeg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_60979371.jpeg",
    code: "ICN",
    barcode: "█████████████",
    link: "description.html",
    highlighted: false,
  },
  {
    location: "TUSCANY · ITALY",
    imgSrc:
      "https://static.wixstatic.com/media/c837a6_f0a177e277be4ba2b684b524a458c829~mv2.jpg/v1/fill/w_301,h_404,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tuscany%20%C2%B7%20FLR.jpg",
    code: "PMO",
    barcode: "█████████████",
    link: "description.html",
    highlighted: false,
  },

];

const Destination = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="places">
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
    </>
  );
};

export default Destination;
