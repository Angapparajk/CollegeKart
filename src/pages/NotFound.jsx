import React from 'react';
import notFoundImg from '../assets/not_found.png';

const NotFound = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    textAlign: 'center',
    borderRadius: 18,
  }}>
    <img
      src={notFoundImg}
      alt="Not Found"
      style={{ maxWidth: 380, width: '100%', marginBottom: 32,  }}
    />
    <h1 style={{
      color: '#a9251d',
      fontWeight: 900,
      fontSize: '2.6rem',
      marginBottom: 12,
      letterSpacing: 2,
      textShadow: '0 2px 8px #e3f2fd',
      background: 'linear-gradient(90deg,#ffe0e0 60%,#fff7f7 100%)',
      borderRadius: 8,
      padding: '10px 22px',
      boxShadow: '0 2px 8px rgba(169,37,29,0.10)'
    }}>Page Not Found</h1>
    <p style={{
      color: '#0a73b0',
      fontWeight: 700,
      fontSize: '1.22rem',
      marginBottom: 10,
      background: 'rgba(227,242,253,0.25)',
      borderRadius: 8,
      padding: '12px 20px',
      boxShadow: '0 2px 8px #e3f2fd',
      lineHeight: 1.7,
      maxWidth: 440,
      margin: '0 auto',
      textShadow: '0 2px 8px #e3f2fd',
    }}>
      Sorry, the page you are looking for does not exist.<br />
      Please check the URL or return to the home page.<br />
    </p>
    <div style={{
      color: '#a9251d',
      fontWeight: 600,
      fontSize: '1.08rem',
      marginTop: 14,
      background: 'rgba(169,37,29,0.07)',
      borderRadius: 8,
      padding: '8px 16px',
      boxShadow: '0 2px 8px #a9251d',
      display: 'inline-block',
      textShadow: '0 2px 8px #e3f2fd',
    }}>
      Need help? Go back to <a href="/" style={{ color: '#0a73b0', textDecoration: 'underline', fontWeight: 700 }}>Home</a> or contact support.
    </div>
  </div>
);

export default NotFound;
