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
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          &copy; 2026 404: Not Found Collective. Built with React & Passion.
        </p>
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
