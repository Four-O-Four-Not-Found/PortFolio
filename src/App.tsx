import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { Github as GithubIcon } from './components/Icons';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ProjectModal from './components/ProjectModal';

// Section Components
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Arsenal from './components/sections/Arsenal';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';

function App() {
  const [isLowPower, setIsLowPower] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for low power mode or slow device
    const checkPerformance = () => {
      const isMobile = window.innerWidth <= 768;
      const isLowEnd = 'hardwareConcurrency' in navigator && (navigator.hardwareConcurrency as number) <= 4;
      setIsLowPower(isMobile || isLowEnd);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenis.on('scroll', (e: any) => {
      setShowScrollTop(e.scroll > 600);
    });

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const openProject = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <CustomCursor />
      {!isModalOpen && <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />}

      <Hero lowPower={isLowPower} />
      
      <Services />

      <Projects 
        lowPower={isLowPower} 
        onOpenProject={openProject} 
      />

      <Arsenal />

      <Team lowPower={isLowPower} />

      <Contact />

      {/* Footer */}
      <footer style={{ padding: '80px 0 40px', borderTop: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '10px', color: 'var(--accent-primary)' }}>404: <span style={{ color: 'white' }}>NOT FOUND</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
              Building high-performance digital experiences and solving complex technical challenges.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <a href="mailto:dreamteamdevs@outlook.com" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
              <Mail size={18} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.9rem' }}>dreamteamdevs@outlook.com</span>
            </a>
            <a href="https://github.com/Four-O-Four-Not-Found" target="_blank" rel="noopener noreferrer" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
              <GithubIcon size={18} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem' }}>github.com/Four-O-Four-Not-Found</span>
            </a>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', opacity: 0.4 }}>
            &copy; 2026 404: Not Found Collective. Built with React, Three.js & Passion.
          </p>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && !isMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => lenisRef.current?.scrollTo(0)}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 9999,
              background: 'var(--accent-primary)',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 132, 255, 0.4)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
