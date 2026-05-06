import { motion } from 'framer-motion';
import ThreeHero from '../ThreeHero';
import MagneticButton from '../MagneticButton';

interface HeroProps {
  lowPower: boolean;
}

const Hero = ({ lowPower }: HeroProps) => {
  return (
    <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <ThreeHero lowPower={lowPower} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.h1 
          initial={lowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: lowPower ? 0 : 0.8 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '24px' }}
        >
          Digital Craftsmen.<br />
          <span className="neon-text">404: Not Found</span>
        </motion.h1>
        <motion.p
          initial={lowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: lowPower ? 0 : 0.8, delay: lowPower ? 0 : 0.2 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}
        >
          A collective of four junior developers building high-performance, 
          visually stunning, and technically robust digital solutions.
        </motion.p>
        <motion.div
          initial={lowPower ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: lowPower ? 0 : 0.8, delay: lowPower ? 0 : 0.4 }}
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MagneticButton>Explore Our Work</MagneticButton>
        </motion.div>
      </div>
      
      {/* Under the Hood Metrics */}
      {!lowPower && (
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
  );
};

export default Hero;
