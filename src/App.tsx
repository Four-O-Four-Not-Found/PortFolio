import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
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
      <Navbar />

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

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
            <a href="https://github.com/Four-O-Four-Not-Found" className="interactive" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>GitHub</a>
            <a href="mailto:dreamteamdevs@outlook.com" className="interactive" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>Email</a>
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
    </div>
  );
}

export default App;
