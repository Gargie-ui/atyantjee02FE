import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import AdminPanel from './components/AdminPanel';
import LaunchpadPage from './pages/LaunchpadPage';
import CollegePage from './pages/CollegePage';
import FinalYearPage from './pages/FinalYearPage';
import WorkingProPage from './pages/WorkingProPage';
import MentorsPage from './pages/MentorsPage';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

function AppContent() {
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [showAdmin, setShowAdmin] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    function openHandler() {
      setShowLeadModal(true);
    }
    window.addEventListener('openLeadModal', openHandler);
    return () => window.removeEventListener('openLeadModal', openHandler);
  }, []);

  // Set canonical URL for SEO (served from root, will be under /launchpad/ when proxied)
  React.useEffect(() => {
    const baseUrl = 'https://www.atyant.in';
    const isProduction = window.location.host !== 'localhost:5173' && window.location.host !== 'localhost:5174';
    
    // In production (proxied), URLs are under /launchpad/; in dev/Vercel preview, they're at root
    const path = isProduction ? `/launchpad${window.location.pathname}` : window.location.pathname;
    const canonicalUrl = `${baseUrl}${path === '/launchpad/' ? '/launchpad/' : path}`;
    
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, []);

  const activeTab = location.pathname === '/mentors' ? 'mentors' : location.pathname === '/college' ? 'college' : location.pathname === '/finalyear' ? 'finalyear' : location.pathname === '/workingpro' ? 'workingpro' : 'after12th';

  const handleTabChange = (tab) => {
    if (tab === 'after12th') navigate('/');
    else navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased">
      <Navbar 
        onLeadClick={() => setShowLeadModal(true)} 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <LaunchpadPage activeTab={activeTab} onTabChange={handleTabChange} />
            </motion.div>
          } />
          <Route path="/college" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <CollegePage activeTab={activeTab} onTabChange={handleTabChange} />
            </motion.div>
          } />
          <Route path="/finalyear" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <FinalYearPage activeTab={activeTab} onTabChange={handleTabChange} />
            </motion.div>
          } />
          <Route path="/workingpro" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <WorkingProPage activeTab={activeTab} onTabChange={handleTabChange} />
            </motion.div>
          } />
          <Route path="/mentors" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              <MentorsPage />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
      <LeadCaptureModal open={showLeadModal} onClose={() => setShowLeadModal(false)} />
      <AdminPanel open={showAdmin} onClose={() => setShowAdmin(false)} />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
