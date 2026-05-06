import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ThreeHero from './components/ThreeHero';
import TiltCard from './components/TiltCard';
import ArchitectureReveal from './components/ArchitectureReveal';
import projectsData from './data/projects.json';
import teamData from './data/team.json';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, ArrowRight, Monitor, Users, BookOpen } from 'lucide-react';
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
  gallery?: {
    url: string;
    label: string;
    category: string;
  }[];
}

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Detect if the device prefers reduced motion or is potentially low spec
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (mediaQuery.matches || isMobile || (navigator as any).deviceMemory < 4) {
      setIsLowPower(true);
    }
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ThreeHero lowPower={isLowPower} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h1 
            initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPower ? 0 : 0.8 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '24px' }}
          >
            Digital Craftsmen.<br />
            <span className="neon-text">404: Not Found</span>
          </motion.h1>
          <motion.p
            initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPower ? 0 : 0.8, delay: isLowPower ? 0 : 0.2 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}
          >
            A collective of four junior developers building high-performance, 
            visually stunning, and technically robust digital solutions.
          </motion.p>
          <motion.div
            initial={isLowPower ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: isLowPower ? 0 : 0.8, delay: isLowPower ? 0 : 0.4 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MagneticButton>Explore Our Work</MagneticButton>
          </motion.div>
        </div>
        
        {/* Under the Hood Metrics */}
        {!isLowPower && (
          <div 
            className="hero-metrics"
            style={{ 
              position: 'absolute', 
              bottom: '40px', 
              right: '40px', 
              fontSize: '10px', 
              color: 'var(--accent-primary)', 
              textAlign: 'right',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              padding: '12px',
              borderRight: '2px solid var(--accent-primary)',
              background: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              pointerEvents: 'none'
            }}
          >
            <p style={{ marginBottom: '4px' }}>LOAD_TIME // 142MS</p>
            <p style={{ marginBottom: '4px' }}>FRAME_RATE // 60FPS</p>
            <p>Lighthouse // 100/100/100/100</p>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '16px' }}>Our <span className="neon-text">Expertise</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>Beyond building high-fidelity projects, we offer strategic development and educational services to empower your digital journey.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 100%, 350px), 1fr))', 
            gap: '24px' 
          }}>
            <TiltCard>
              <div className="glass-card" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Monitor size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>System Development</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Full-cycle development of robust, scalable systems. From enterprise .NET solutions to high-performance FastAPI backends and interactive React frontends.
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Custom Software', 'Web Systems', 'Mobile Apps'].map(tag => (
                    <span key={tag} style={{ fontSize: '10px', color: 'var(--accent-primary)', border: '1px solid rgba(0, 132, 255, 0.2)', padding: '4px 10px', borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="glass-card" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Users size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Free Consultation</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Not sure where to start? We provide free architectural guidance and technical strategy sessions to help you navigate the complexity of modern development.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <a href="#contact" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Session</a>
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="glass-card" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <BookOpen size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Technical Tutoring</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Personalized mentorship in the technologies we use daily. Master React, TypeScript, and Cloud Architecture through hands-on guidance from active developers.
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['React', '.NET', 'Python', 'DevOps'].map(tag => (
                    <span key={tag} style={{ fontSize: '10px', color: 'var(--accent-primary)', border: '1px solid rgba(0, 132, 255, 0.2)', padding: '4px 10px', borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding" style={{ background: '#0f0f0f' }}>
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Our <span className="neon-text">Projects</span></h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['All', 'React', '.NET', 'Mobile', 'FastAPI'].map(filter => (
                <button key={filter} className="glass-card" style={{ padding: '6px 16px', fontSize: '12px', cursor: 'pointer', color: '#ffffff' }}>{filter}</button>
              ))}
            </div>
          </div>

          <div className="projects-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 400px), 1fr))', 
            gap: '30px' 
          }}>
            {projectsData.map((project, i) => (
              <motion.div
                key={project.id}
                initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isLowPower ? 0 : i * 0.1 }}
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
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>{project.title}</h3>
                      
                      {/* Actions strictly below title */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <a href={project.links.github} className="btn-outline" style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--accent-primary)', color: 'white', border: 'none' }} onClick={(e) => e.stopPropagation()}><GithubIcon size={14} /> Code</a>
                        <a href={project.links.live} className="btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /> Demo</a>
                      </div>

                      {/* Tech Stack below buttons */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.techStack.slice(0, 3).map(tech => (
                          <span key={tech} style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--accent-primary)', border: '1px solid var(--card-border)', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>{project.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Arsenal & Methodology Section */}
      <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Our <span className="neon-text">Arsenal</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              We don't just write code; we architect solutions. Our methodology combines modern tech stacks with robust engineering principles.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr))', gap: '40px' }}>
            {/* Tech Stack */}
            <div className="glass-card" style={{ padding: '40px', borderTop: '4px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>Core Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {["React 19", ".NET 10", "TypeScript", "Flutter", "Firebase", "PostgreSQL", "Supabase", "Python", "Tailwind CSS 4", "SignalR", "Node.js", "ASP.NET Core"].map(tech => (
                  <span key={tech} style={{ padding: '6px 14px', background: 'rgba(0, 132, 255, 0.05)', border: '1px solid var(--card-border)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-primary)' }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="glass-card" style={{ padding: '40px', borderTop: '4px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>Architecture Patterns</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
                  Role-Based Access Control (RBAC)
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
                  RESTful & Real-time (SignalR) APIs
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
                  Event-Driven Microservices
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
                  Relational & NoSQL Hybrid Data
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></div>
                  CI/CD & Automated Deployment
                </li>
              </ul>
            </div>

            {/* Principles */}
            <div className="glass-card" style={{ padding: '40px', borderTop: '4px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>Engineering Principles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { title: "DRY", desc: "Don't Repeat Yourself" },
                  { title: "SOLID", desc: "Clean & Maintainable" },
                  { title: "KISS", desc: "Simple & Intuitive" },
                  { title: "QA-First", desc: "Testing-driven dev" },
                  { title: "UI/UX", desc: "User-centric design" },
                  { title: "Agile", desc: "Iterative delivery" }
                ].map(principle => (
                  <div key={principle.title} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '4px' }}>{principle.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{principle.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                initial={isLowPower ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: isLowPower ? 0 : i * 0.1 }}
              >
                <TiltCard style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--card-border)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{member.name[0]}</span>
                  </div>
                  <h3 style={{ marginBottom: '4px' }}>{member.name}</h3>
                  <p style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: '400', marginBottom: '16px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>{member.role}</p>
                  <p style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '20px', opacity: 0.7 }}>{member.bio}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                    {member.skills.map(skill => (
                      <span key={skill} style={{ fontSize: '10px', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>{skill}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <a href={member.github} className="interactive"   data-cursor-text="Profile"><GithubIcon size={18} /></a>
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
          <div className="glass-card contact-grid" style={{ 
            padding: 'clamp(20px, 5vw, 60px)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Let's <span className="neon-text">Build</span> Something.</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                Whether you have a specific project in mind or just want to chat about tech, we're all ears.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a href="mailto:dreamteamdevs@outlook.com" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  <Mail size={24} color="var(--accent-primary)" />
                  <span>dreamteamdevs@outlook.com</span>
                </a>
                <a href="https://github.com/Four-O-Four-Not-Found" target="_blank" rel="noopener noreferrer" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  <GithubIcon size={24} color="var(--accent-primary)" />
                  <span>github.com/Four-O-Four-Not-Found</span>
                </a>
              </div>
            </div>
            
            <form 
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Message sent successfully! (Demo)');
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input type="text" placeholder="Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
                <input type="email" placeholder="Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
              </div>
              <input type="text" placeholder="Subject" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
              <textarea placeholder="Message" rows={5} required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }}></textarea>
              <MagneticButton type="submit">Send Message <ArrowRight size={16} style={{ marginLeft: '8px' }} /></MagneticButton>
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
