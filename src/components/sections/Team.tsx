import { motion } from 'framer-motion';
import { Github as GithubIcon } from '../Icons';
import TiltCard from '../TiltCard';
import teamData from '../../data/team.json';

interface TeamProps {
  lowPower: boolean;
}

const Team = ({ lowPower }: TeamProps) => {
  return (
    <section id="team" className="section-padding">
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>The <span className="neon-text">Collective</span></h2>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {teamData.map((member, i) => (
            <motion.div
              key={member.id}
              initial={lowPower ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: lowPower ? 0 : i * 0.1 }}
              style={{ height: '100%' }}
            >
              <TiltCard style={{ padding: '40px 30px', textAlign: 'center', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Neon Avatar Container */}
                <div style={{ 
                  width: '90px', 
                  height: '90px', 
                  borderRadius: '20px', 
                  background: 'rgba(0, 132, 255, 0.05)', 
                  border: '1px solid var(--accent-primary)',
                  margin: '0 auto 25px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(0, 132, 255, 0.2)',
                  transform: 'rotate(45deg)'
                }}>
                  <div style={{ transform: 'rotate(-45deg)' }}>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent-primary)' }}>{member.name[0]}</span>
                  </div>
                </div>

                <h3 style={{ marginBottom: '8px', fontSize: '1.4rem' }}>{member.name}</h3>
                <p style={{ 
                  color: 'var(--accent-primary)', 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  marginBottom: '20px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em' 
                }}>
                  {member.role}
                </p>
                
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '24px', 
                  lineHeight: '1.6',
                  flexGrow: 1
                }}>
                  {member.bio}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                  {member.skills.map(skill => (
                    <span key={skill} style={{ 
                      fontSize: '9px', 
                      fontWeight: '600',
                      color: 'var(--text-primary)', 
                      background: 'rgba(255,255,255,0.03)', 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(255,255,255,0.08)',
                      textTransform: 'uppercase'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <a 
                    href={member.github} 
                    className="interactive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-text="View GitHub"
                    style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}
                  >
                    <GithubIcon size={20} />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
