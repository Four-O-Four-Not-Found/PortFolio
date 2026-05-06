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
