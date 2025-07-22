import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Plane, Hotel, Calendar, Users, Filter, Star, Clock, DollarSign } from 'lucide-react';
import TravelSearch from '../components/TravelSearch';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const TravelSearchPage = () => {
    return (
        <div className='bg-light' >
            <Navbar />
            <TravelSearch />
            <Footer />
        </div>
    );
}

export default TravelSearchPage;