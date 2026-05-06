import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import MagneticButton from '../MagneticButton';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [requestType, setRequestType] = useState<'inquiry' | 'appointment'>('inquiry');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    const formData = new FormData(formRef.current);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(async (res) => {
      if (res.ok) {
        setStatus('success');
        setShowPopup(true);
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send');
      }
    })
    .catch((err) => {
      console.error('API Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    });
  };
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="glass-card contact-grid" style={{ 
          padding: 'clamp(20px, 5vw, 60px)', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '60px' 
        }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Let's <span className="neon-text">Build</span> Something.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
              Whether you have a specific project in mind, want to book a <strong>Free Consultation</strong>, or need technical tutoring, we're ready to help.
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)', border: '1px solid var(--card-border)' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Send a <span className="neon-text">Message</span></h3>
            <form 
              ref={formRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              onSubmit={handleSubmit}
            >
              {/* Request Type Selection */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name="request_type" 
                    value="inquiry" 
                    checked={requestType === 'inquiry'} 
                    onChange={() => setRequestType('inquiry')}
                    style={{ accentColor: 'var(--accent-primary)' }} 
                  />
                  Inquiry
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name="request_type" 
                    value="appointment" 
                    checked={requestType === 'appointment'} 
                    onChange={() => setRequestType('appointment')}
                    style={{ accentColor: 'var(--accent-primary)' }} 
                  />
                  Appointment
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input name="user_name" type="text" placeholder="John Doe" required className="themed-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email Address</label>
                  <input name="user_email" type="email" placeholder="john@example.com" required className="themed-input" />
                </div>
              </div>

              {requestType === 'appointment' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preferred Date</label>
                    <input name="date" type="date" required className="themed-input" style={{ colorScheme: 'dark' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preferred Time</label>
                    <input name="time" type="time" required className="themed-input" style={{ colorScheme: 'dark' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Service Type</label>
                <select 
                  name="service" 
                  className="themed-select"
                  style={{ 
                    width: '100%', 
                    maxWidth: '100%',
                    background: 'var(--card-bg)', 
                    border: '1px solid var(--card-border)', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    color: 'var(--text-primary)', 
                    cursor: 'pointer',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="consultation" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>Free Consultation</option>
                  <option value="development" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>System Development</option>
                  <option value="tutoring" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>Technical Tutoring</option>
                  <option value="general" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>General Collaboration</option>
                </select>
              </div>

              <textarea name="message" placeholder="Tell us briefly about your project or learning goals..." rows={4} required className="themed-input" style={{ resize: 'vertical' }}></textarea>
              
              <div style={{ marginTop: '10px' }}>
                <MagneticButton 
                  type="submit" 
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full"
                >
                  {status === 'sending' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Loader2 size={16} className="animate-spin" /> Sending...</span>
                  ) : status === 'success' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Sent Successfully</span>
                  ) : status === 'error' ? (
                    'Error - Try Again'
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Send Message <ArrowRight size={16} /></span>
                  )}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '450px', 
                padding: '40px', 
                textAlign: 'center',
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 0 50px rgba(0, 132, 255, 0.3)'
              }}
            >
              <button 
                onClick={() => setShowPopup(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }}
              >
                <X size={20} />
              </button>

              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 132, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid var(--accent-primary)' }}>
                <CheckCircle size={40} color="var(--accent-primary)" />
              </div>

              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Message <span className="neon-text">Sent</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
                Thank you for reaching out! Your message has been received by the <strong>404: Not Found</strong> team. We will get back to you shortly.
              </p>

              <MagneticButton onClick={() => setShowPopup(false)} style={{ width: '100%' }}>
                Got it, thanks!
              </MagneticButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
