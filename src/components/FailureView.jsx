import React from 'react';
import failureImg from '../assets/failure_view.png';

const FailureView = ({ message = 'Something went wrong. Please try again later.' }) => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    textAlign: 'center',
    borderRadius: 18,
  }}>
    <img
      src={failureImg}
      alt="Failure View"
      style={{ maxWidth: 320, width: '100%', marginBottom: 24,  }}
    />
    <h2 style={{
      color: '#a9251d',
      fontWeight: 900,
      fontSize: '2.1rem',
      marginBottom: 10,
      letterSpacing: 1.5,
      textShadow: '0 2px 8px #e3f2fd',
      background: 'linear-gradient(90deg,#ffe0e0 60%,#fff7f7 100%)',
      borderRadius: 8,
      padding: '8px 18px',
      boxShadow: '0 2px 8px rgba(169,37,29,0.10)'
    }}>Oops!</h2>
    <p style={{
      color: '#0a73b0',
      fontWeight: 700,
      fontSize: '1.18rem',
      marginBottom: 8,
      background: 'rgba(227,242,253,0.25)',
      borderRadius: 8,
      padding: '10px 18px',
      boxShadow: '0 2px 8px #e3f2fd',
      lineHeight: 1.6,
      maxWidth: 420,
      margin: '0 auto',
      textShadow: '0 2px 8px #e3f2fd',
    }}>{message}</p>
    <div style={{
      color: '#a9251d',
      fontWeight: 600,
      fontSize: '1rem',
      marginTop: 12,
      background: 'rgba(169,37,29,0.07)',
      borderRadius: 8,
      padding: '8px 14px',
      boxShadow: '0 2px 8px #a9251d',
      display: 'inline-block',
      textShadow: '0 2px 8px #e3f2fd',
    }}>
      If the problem persists, please check your internet connection or try again later.
    </div>
  </div>
);

export default FailureView;
