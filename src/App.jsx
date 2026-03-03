import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import InstitutionLogin from './pages/InstitutionLogin';
import AdminLayout from './components/AdminLayout';
import Overview from './pages/admin/Overview';
import Escalations from './pages/admin/Escalations';
import Compliance from './pages/admin/Compliance';
import Interventions from './pages/admin/Interventions';
import AdminRequests from './pages/admin/AdminRequests';
const AppContent = () => {
  const location = useLocation();
  const isEnterpriseRoute = location.pathname.startsWith('/admin') || location.pathname === '/institution-login';

  return (
    <div className="relative w-full bg-midnight-blue text-cool-mist selection:bg-electric-lavender selection:text-midnight-blue overflow-x-hidden min-h-screen flex flex-col">
      {!isEnterpriseRoute && <div className="noise-overlay" />}
      {!isEnterpriseRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Marketing & Demo Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/impact" element={<CampusImpact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/security" element={<Security />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/demo" element={<Demo />} />

          {/* Enterprise / Authority Routes */}
          <Route path="/institution-login" element={<InstitutionLogin />} />

          {/* Protected Admin Shell */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="overview" element={<Overview />} />
            <Route path="escalations" element={<Escalations />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="interventions" element={<Interventions />} />
            <Route path="requests" element={<AdminRequests />} />
          </Route>
        </Routes>
      </main>

      {!isEnterpriseRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
