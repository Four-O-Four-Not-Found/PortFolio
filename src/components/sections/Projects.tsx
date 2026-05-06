import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Github as GithubIcon } from '../Icons';
import TiltCard from '../TiltCard';
import ArchitectureReveal from '../ArchitectureReveal';
import projectsData from '../../data/projects.json';

interface ProjectsProps {
  lowPower: boolean;
  onOpenProject: (project: any) => void;
}

const Projects = ({ lowPower, onOpenProject }: ProjectsProps) => {
  return (
    <section id="projects" className="section-padding" style={{ background: '#0f0f0f' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Our <span className="neon-text">Projects</span></h2>
        </div>

        <div className="projects-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 400px), 1fr))', 
          gap: '30px' 
        }}>
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={lowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: lowPower ? 0 : i * 0.1 }}
              onClick={() => onOpenProject(project)}
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
  );
};

export default Projects;
