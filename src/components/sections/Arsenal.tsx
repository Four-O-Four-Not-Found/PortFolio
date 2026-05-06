const Arsenal = () => {
  return (
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
              {[
                { title: 'Microservices', desc: 'Distributed systems for scalability' },
                { title: 'Clean Architecture', desc: 'Separation of concerns & testability' },
                { title: 'Event-Driven', desc: 'Asynchronous communication via SignalR/RabbitMQ' },
                { title: 'Domain Driven Design', desc: 'Aligning software with business complexity' }
              ].map(item => (
                <li key={item.title} style={{ marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                  {item.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Development Principles */}
          <div className="glass-card" style={{ padding: '40px', borderTop: '4px solid var(--accent-primary)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>Our Philosophy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                "Performance-First Optimization",
                "Accessibility (a11y) Standards",
                "Continuous Integration & Deployment",
                "Mobile-First Responsive Engineering"
              ].map(principle => (
                <div key={principle} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arsenal;
