import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/MagzineCard.css";
import { motion } from "framer-motion";

const MagzineCard = () => {
  const MagzineCardData = [
    {
      img: "https://static.wixstatic.com/media/442feb_9038b53ff04a4887a293bb9e20218c53~mv2.png/v1/fill/w_740,h_349,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/442feb_9038b53ff04a4887a293bb9e20218c53~mv2.png",
      date: "Aug 20, 2024",
      readTime: "2 min read",
      title: "Cuban-Spaniards Now Require a Tourist Visa to Travel to the U.S",
      link: "/Assets/magazine1.html",
    },
    {
      img: "https://static.wixstatic.com/media/442feb_7170db06e00d4abdb32090955b05e187~mv2.jpg/v1/fill/w_740,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/442feb_7170db06e00d4abdb32090955b05e187~mv2.jpg",
      date: "Sep 15, 2024",
      readTime: "3 min read",
      title: "Extension of the Democratic Memory Law Deadline for Spanish Citizenship Applications",
      link: "/Assets/magazine1.html",
    },
    {
      img: "https://static.wixstatic.com/media/nsplsh_bec6a848aae9412fb9f3adac64b9bcea~mv2.jpg/v1/fill/w_740,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_bec6a848aae9412fb9f3adac64b9bcea~mv2.jpg",
      date: "Oct 10, 2024",
      readTime: "4 min read",
      title: "Save Money on Your Next Trip to Europe",
      link: "/Assets/magazine1.html",
    },
    {
      img: "https://static.wixstatic.com/media/nsplsh_6874517a6e532d52783777~mv2.jpg/v1/fill/w_740,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_6874517a6e532d52783777~mv2.jpg",
      date: "Oct 10, 2024",
      readTime: "4 min read",
      title: "10 tips to apply for a visa quickly and easily",
      link: "/Assets/magazine1.html",
    },
    {
      img: "https://static.wixstatic.com/media/nsplsh_a02ff8f66062413ea883b651ac393d61~mv2.jpg/v1/fill/w_740,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_a02ff8f66062413ea883b651ac393d61~mv2.jpg",
      date: "Oct 10, 2024",
      readTime: "4 min read",
      title: "Are you planning an exciting trip to Europe but worried about the budget?",
      link: "/Assets/magazine1.html",
    },
    {
      img: "https://static.wixstatic.com/media/nsplsh_a02ff8f66062413ea883b651ac393d61~mv2.jpg/v1/fill/w_740,h_493,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_a02ff8f66062413ea883b651ac393d61~mv2.jpg",
      date: "Oct 10, 2024",
      readTime: "4 min read",
      title: "Are you planning an exciting trip to Europe but worried about the budget?",
      link: "/Assets/magazine1.html",
    },
  ];

  return (
    <>
      <div className="row no-gutters">
        {MagzineCardData.slice(0, 6).map((card, index) => (
          <motion.div
            className="col-12 col-sm-6 col-lg-4 magazine-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={card.img}
                className="card-img-top"
                alt="Card"
                style={{ height: "240px", objectFit: "cover" }}
              />
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://static.thenounproject.com/png/4851855-200.png"
                    className="rounded-circle me-2"
                    alt="avatar"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <small className="text-muted">JETSETGO SERVICES</small>
                    <div className="small text-muted">
                      {card.date} • {card.readTime}
                    </div>
                  </div>
                </div>
                <h5 className="card-title">
                  <a
                    href={card.link}
                    className="text-decoration-none text-dark"
                  >
                    {card.title}
                  </a>
                </h5>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default MagzineCard;
