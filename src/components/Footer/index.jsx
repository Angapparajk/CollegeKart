import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer id="footer" style={{
      background: 'linear-gradient(120deg,#e3f2fd 60%,#f7fafd 100%)',
      color: '#222',
      padding: '0.8rem 0.5rem',
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '1rem',
      letterSpacing: '1px',
      position: 'relative',
      zIndex: 1100,
      backdropFilter: 'blur(24px)',
      borderRadius: '0 0 24px 24px',
      transition: 'all 0.3s',
      overflow: 'hidden',
      maxWidth: '100vw',
    }}>
      <h2 style={{ color: '#0a73b0', fontWeight: 900, marginBottom: 8, fontSize: '1.4rem', textShadow: '0 2px 8px #e3f2fd', letterSpacing: 2 }}>Contact Us</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#a9251d', background: 'rgba(227,242,253,0.25)', borderRadius: 8, padding: '6px 10px', boxShadow: '0 2px 8px #e3f2fd', marginBottom: 4, maxWidth: '100vw' }}>
          Email: <a href="mailto:support@collegekart.com" style={{ color: '#a9251d', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>support@collegekart.com</a>
        </div>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#a9251d', background: 'rgba(227,242,253,0.25)', borderRadius: 8, padding: '6px 10px', boxShadow: '0 2px 8px #e3f2fd', maxWidth: '100vw' }}>
          Phone: <a href="tel:+919876543210" style={{ color: '#a9251d', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>+91 98765 43210</a>
        </div>
      </div>
      <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0a73b0', fontSize: '2rem', transition: 'color 0.2s, transform 0.2s', verticalAlign: 'middle', filter: 'drop-shadow(0 2px 8px #e3f2fd)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#a9251d'; e.currentTarget.style.transform = 'scale(1.15)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#0a73b0'; e.currentTarget.style.transform = 'scale(1)'; }}>
          <FacebookIcon fontSize="inherit" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0a73b0', fontSize: '2rem', transition: 'color 0.2s, transform 0.2s', verticalAlign: 'middle', filter: 'drop-shadow(0 2px 8px #e3f2fd)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#a9251d'; e.currentTarget.style.transform = 'scale(1.15)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#0a73b0'; e.currentTarget.style.transform = 'scale(1)'; }}>
          <TwitterIcon fontSize="inherit" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#a9251d', fontSize: '2rem', transition: 'color 0.2s, transform 0.2s', verticalAlign: 'middle', filter: 'drop-shadow(0 2px 8px #e3f2fd)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#0a73b0'; e.currentTarget.style.transform = 'scale(1.15)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#a9251d'; e.currentTarget.style.transform = 'scale(1)'; }}>
          <InstagramIcon fontSize="inherit" />
        </a>
      </div>
      <p style={{ marginTop: 18, fontWeight: 700, fontSize: '1rem', letterSpacing: 1 }}>&copy; {new Date().getFullYear()} <span style={{ color: '#a9251d', fontWeight: 900, fontSize: '1.1rem', textShadow: '0 2px 8px #e3f2fd' }}>CollegeKart</span>. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
