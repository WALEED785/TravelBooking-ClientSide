import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/Hero';
import MagzineCard from '../components/MagzineCard';

export default function Magzine() {
  return (
    <div>
      <Navbar />
      <HeroBanner
        heading="Magazine"
        subheading="THE JetSetGo JOURNAL"
        label="Top Featured Places"
      />
      <section className="bg-light py-5">
        <MagzineCard />
      </section>
      <Footer />
    </div>
  );
}
