import { useRef, useState } from 'react';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Github as GithubIcon } from '../Icons';
import MagneticButton from '../MagneticButton';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [requestType, setRequestType] = useState<'inquiry' | 'appointment'>('inquiry');

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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <a href="mailto:dreamteamdevs@outlook.com" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                <Mail size={24} color="var(--accent-primary)" />
                <span>dreamteamdevs@outlook.com</span>
              </a>
              <a href="https://github.com/Four-O-Four-Not-Found" target="_blank" rel="noopener noreferrer" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                <GithubIcon size={24} style={{ color: 'var(--accent-primary)' }} />
                <span>github.com/Four-O-Four-Not-Found</span>
              </a>
            </div>
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
                  <input name="user_name" type="text" placeholder="John Doe" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email Address</label>
                  <input name="user_email" type="email" placeholder="john@example.com" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>

              {requestType === 'appointment' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preferred Date</label>
                    <input name="date" type="date" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white', colorScheme: 'dark' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preferred Time</label>
                    <input name="time" type="time" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white', colorScheme: 'dark' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Service Type</label>
                <select name="service" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                  <option value="consultation">Free Consultation</option>
                  <option value="development">System Development</option>
                  <option value="tutoring">Technical Tutoring</option>
                  <option value="general">General Collaboration</option>
                </select>
              </div>

              <textarea name="message" placeholder="Tell us briefly about your project or learning goals..." rows={4} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white', resize: 'vertical' }}></textarea>
              
              <div style={{ marginTop: '10px' }}>
                <MagneticButton 
                  type="submit" 
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full"
                >
                  {status === 'sending' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Loader2 size={16} className="animate-spin" /> Processing...</span>
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
    </section>
  );
};

export default Contact;
