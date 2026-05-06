import { motion } from 'framer-motion';
import ThreeHero from '../ThreeHero';
import MagneticButton from '../MagneticButton';

interface HeroProps {
  lowPower: boolean;
}

const Hero = ({ lowPower }: HeroProps) => {
  return (
    <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'clip' }}>
      <ThreeHero lowPower={lowPower} />
      

      <div className="container" style={{ position: 'relative', zIndex: 5000, textAlign: 'center' }}>
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
          style={{ position: 'relative', zIndex: 5001 }}
        >
          <MagneticButton>Explore Our Work</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
