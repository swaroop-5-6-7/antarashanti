import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import CampusImpact from './pages/CampusImpact';
import Features from './pages/Features';
import Security from './pages/Security';
import Community from './pages/Community';
import About from './pages/About';
import Resources from './pages/Resources';
import Demo from './pages/Demo';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative w-full bg-midnight-blue text-cool-mist selection:bg-electric-lavender selection:text-midnight-blue overflow-x-hidden min-h-screen flex flex-col">
        <div className="noise-overlay" />
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/impact" element={<CampusImpact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/security" element={<Security />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
