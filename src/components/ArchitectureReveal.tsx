import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureRevealProps {
  uiImage: string;
  archImage: string;
  projectName: string;
}

const ArchitectureReveal = ({ uiImage, archImage, projectName }: ArchitectureRevealProps) => {
  const [showArch, setShowArch] = useState(false);

  return (
    <div 
      className="arch-reveal-container" 
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px', cursor: 'help' }}
      onMouseEnter={() => setShowArch(true)}
      onMouseLeave={() => setShowArch(false)}
    >
      <AnimatePresence mode="wait">
        {!showArch ? (
          <motion.div
            key="ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${uiImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px'
            }}>
              <span style={{ fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                Hover to see Architecture
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="arch"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
          >
            <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
              <h4 style={{ color: 'var(--accent-teal)', marginBottom: '10px' }}>{projectName} Architecture</h4>
              <div style={{ 
                width: '100%', 
                height: '70%', 
                backgroundImage: `url(${archImage})`, 
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center',
                filter: 'grayscale(1) invert(1) opacity(0.5)' 
              }} />
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '10px' }}>System Data Flow & Backend Structure</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchitectureReveal;
