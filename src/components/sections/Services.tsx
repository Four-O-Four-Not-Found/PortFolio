import TiltCard from '../TiltCard';
import { Monitor, Users, BookOpen } from 'lucide-react';

const Services = () => {
  return (
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
          {/* System Development */}
          <TiltCard style={{ background: 'transparent' }}>
            <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <Monitor size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>System Development</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Full-cycle development of robust, scalable systems. From enterprise .NET solutions to high-performance FastAPI backends and interactive React frontends.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Custom Software', 'Web Systems', 'Mobile Apps'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', border: '1px solid rgba(0, 132, 255, 0.2)', padding: '4px 10px', borderRadius: '6px', background: 'rgba(0, 132, 255, 0.05)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Free Consultation */}
          <TiltCard style={{ background: 'transparent' }}>
            <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Free Consultation</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Not sure where to start? We provide free architectural guidance and technical strategy sessions to help you navigate the complexity of modern development.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Strategy', 'Architecture', 'Guidance'].map(tag => (
                    <span key={tag} style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', border: '1px solid rgba(0, 132, 255, 0.2)', padding: '4px 10px', borderRadius: '6px', background: 'rgba(0, 132, 255, 0.05)' }}>{tag}</span>
                  ))}
                </div>
                <a href="#contact" className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '12px' }}>Book Session</a>
              </div>
            </div>
          </TiltCard>

          {/* Technical Tutoring */}
          <TiltCard style={{ background: 'transparent' }}>
            <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Technical Tutoring</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Comprehensive mentorship spanning modern full-stack development. Master core languages, frameworks, and architectural patterns through hands-on guidance from the team.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['React', '.NET', 'Python', 'TypeScript', 'Node.js', 'SQL', 'DevOps', '+ MORE'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', border: '1px solid rgba(0, 132, 255, 0.2)', padding: '4px 10px', borderRadius: '6px', background: 'rgba(0, 132, 255, 0.05)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Services;
