import React from 'react';
import '../style/Visa.css'; // External CSS with goldenrod background

const Visa = () => {
  return (
    <div className="visa-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="mb-4" style={{background:"none"}}>
              <span className="fs-5 fw-bold" style={{color:"#0c2450"}}>
                <span className="me-2">ℹ️</span>You're Probably Wondering
              </span>
            </h1>

            {/* FAQ Section */}
            <div className="accordion" id="faqAccordion">
              {/* Question 1 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    What is a Visa?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    A visa is an official document that allows the bearer to legally enter a foreign country.
                    The visa is usually stamped or glued into the bearer's passport. There are several different types of visas,
                    each of which afford the bearer different rights in the host country.
                    <SocialIcons />
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Who Needs a Schengen Visa?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    There are many nationalities that need a visa to travel to the Schengen Area or Europe. To check if your nationality requires a visa, please contact us at info@wanderwiseservices.com / +1 (786) 703-1593
                    <SocialIcons />
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    How early can I apply?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Applicants are free to apply up to 180 days prior to their date of travel. However, all applications must be submitted at least 15 days prior to the proposed date of travel to accommodate any unforeseen processing delays.
                    <SocialIcons />
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Which countries are in the Schengen Area?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    The list of countries in the Schengen Area:
                    Austria, Finland, Greece, Luxemburg, Portugal, Switzerland, Hungary, Malta, Estonia, Belgium, France, Iceland, Netherlands, Spain, Poland, Slovenia, Latvia, Denmark, Germany, Italy, Norway, Sweden, Slovak Republic, Czech Republic and Lithuania.
                    <br />
                    The Schengen Visa allows you to transit through all the member countries described above for the duration of the visa.
                    <SocialIcons />
                  </div>
                </div>
              </div>

              {/* Question 5 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    How can JETSETGO help me obtain my visa?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We can help you throughout the entire process! Some of our services:
                    <ol>
                      <li>Schedule an appointment with the Visa Application Center.</li>
                      <li>We fill out the visa application form and take the photos.</li>
                      <li>We provide you with the mandatory medical insurance for the visa.</li>
                      <li>Create a complete itinerary including flights, hotels and trains.</li>
                      <li>Notarizations including certifications, notarized letters, sponsorships and authorizations for minors.</li>
                    </ol>
                    Each application is different, therefore, for more information contact us!
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.rjourney.com/wp-content/uploads/2022/04/Friends-outside-tent.jpg"
              alt="Visa Travel"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialIcons = () => (
  <div className="mt-3">
    <a href="https://www.facebook.com" className="me-2">
      <img src="https://img.icons8.com/ios-glyphs/20/facebook.png" alt="Facebook" />
    </a>
    <a href="https://www.linkedin.com" className="me-2">
      <img src="https://img.icons8.com/ios-glyphs/20/linkedin.png" alt="LinkedIn" />
    </a>
    <a href="https://www.instagram.com" className="me-2">
      <img src="https://img.icons8.com/ios-glyphs/20/instagram.png" alt="Instagram" />
    </a>
    <a href="https://www.twitter.com">
      <img src="https://img.icons8.com/ios-glyphs/20/twitter.png" alt="Twitter" />
    </a>
  </div>
);

export default Visa;
