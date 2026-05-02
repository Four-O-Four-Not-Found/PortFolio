import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ThreeHero from './components/ThreeHero';
import PhysicsStack from './components/PhysicsStack';
import TiltCard from './components/TiltCard';
import ArchitectureReveal from './components/ArchitectureReveal';
import projectsData from './data/projects.json';
import teamData from './data/team.json';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Github as GithubIcon, Linkedin as LinkedinIcon } from './components/Icons';
import MagneticButton from './components/MagneticButton';
import ProjectModal from './components/ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  team: string[];
  contributions: Record<string, string>;
  links: {
    live: string;
    github: string;
  };
  image: string;
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ThreeHero />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '24px' }}
          >
            Digital Craftsmen.<br />
            <span className="neon-text">404: Not Found</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}
          >
            A collective of four junior developers building high-performance, 
            visually stunning, and technically robust digital solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MagneticButton>Explore Our Work</MagneticButton>
          </motion.div>
        </div>
        
        {/* Under the Hood Metrics */}
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', fontSize: '10px', color: '#333', textAlign: 'right' }}>
          <p>LOAD TIME: 142MS</p>
          <p>FPS: 60</p>
          <p>LIGHTHOUSE: 100/100/100/100</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding" style={{ background: '#0f0f0f' }}>
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Selected <span className="neon-text">Projects</span></h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['All', 'React', '.NET', 'Mobile', 'FastAPI'].map(filter => (
                <button key={filter} className="glass-card" style={{ padding: '6px 16px', fontSize: '12px', cursor: 'pointer' }}>{filter}</button>
              ))}
            </div>
          </div>

          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            {projectsData.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openProject(project)}
                className="interactive"
                data-cursor-text="Open"
              >
                <TiltCard className="project-card" style={{ padding: '24px', height: '100%', cursor: 'pointer' }}>
                  <ArchitectureReveal 
                    uiImage={project.image} 
                    archImage={project.image} 
                    projectName={project.title} 
                  />
                  <div style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.5rem' }}>{project.title}</h3>
                      <div style={{ display: 'flex', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                        <a href={project.links.github} className="interactive" data-cursor-text="Code"><GithubIcon size={20} /></a>
                        <a href={project.links.live} className="interactive" data-cursor-text="Live"><ExternalLink size={20} /></a>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.techStack.map(tech => (
                        <span key={tech} style={{ fontSize: '10px', background: 'rgba(0, 132, 255, 0.1)', border: '1px solid rgba(0, 132, 255, 0.3)', padding: '4px 8px', borderRadius: '4px', color: 'var(--accent-primary)' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Physics */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Our <span className="neon-text">Arsenal</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Grab and throw our core technologies</p>
          </div>
          <PhysicsStack />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>The <span className="neon-text">Collective</span></h2>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {teamData.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--card-border)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{member.name[0]}</span>
                  </div>
                  <h3 style={{ marginBottom: '4px' }}>{member.name}</h3>
                  <p style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase' }}>{member.role}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>{member.bio}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <a href={member.github} className="interactive" data-cursor-text="Profile"><GithubIcon size={18} /></a>
                    <a href={member.linkedin} className="interactive" data-cursor-text="Profile"><LinkedinIcon size={18} /></a>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="glass-card" style={{ padding: '60px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Let's <span className="neon-text">Build</span> Something.</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                Whether you have a specific project in mind or just want to chat about tech, we're all ears.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail color="var(--accent-primary)" />
                  <span>hello@404notfound.dev</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <GithubIcon color="var(--accent-primary)" />
                  <span>github.com/404-collective</span>
                </div>
              </div>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input type="text" placeholder="Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
                <input type="email" placeholder="Email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
              </div>
              <input type="text" placeholder="Subject" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
              <textarea placeholder="Message" rows={5} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }}></textarea>
              <MagneticButton>Send Message <ArrowRight size={16} style={{ marginLeft: '8px' }} /></MagneticButton>
            </form>
          </div>
        </div>
      </section>

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
