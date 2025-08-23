import React from 'react';
import { Typography, Box } from '@mui/material';
import homeImg from '../../assets/home.png';
import homeImg2 from '../../assets/home2.png';

const Home = () => {
  const isMobile = window.innerWidth <= 600;
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      overflowX: 'hidden',
    }}>
      <div style={{
        width: '100%',
        display: isMobile ? 'block' : 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        padding: '32px 2vw',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}>
        {isMobile && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <img
              src={homeImg}
              alt="CollegeKart Home"
              style={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: 18, objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px', maxWidth: '100vw' }}>
          <h1 style={{ color: '#a9251d', fontWeight: 900, letterSpacing: 2, fontSize: '2.1rem', marginBottom: 10, textShadow: '0 2px 8px #e3f2fd', lineHeight: 1.1, textAlign: isMobile ? 'center' : 'left' }}>Welcome to <span style={{ color: '#0a73b0', textShadow: '0 2px 8px #a9251d' }}>CollegeKart</span>!</h1>
          <h2 style={{ color: '#0a73b0', fontWeight: 700, marginBottom: 18, fontSize: '1.2rem', lineHeight: 1.2, textShadow: '0 2px 8px #e3f2fd' }}>The marketplace for college students across Tamil Nadu to buy and sell second-hand and rare products.</h2>
          <p style={{ color: '#222', marginBottom: 18, fontSize: '1rem', fontWeight: 500, lineHeight: 1.6, background: 'rgba(227,242,253,0.25)', borderRadius: 8, padding: '10px 12px', boxShadow: '0 2px 8px #e3f2fd', maxWidth: '100vw' }}>Easily find or list items like electronics, books, and more, all within your college community. Save money, find rare items, and help others by giving unused products a new life!</p>
          <div style={{ color: '#0a73b0', fontWeight: 600, marginBottom: 18, fontSize: '1rem', lineHeight: 1.7, background: 'rgba(169,37,29,0.07)', borderRadius: 8, padding: '10px 12px', boxShadow: '0 2px 8px #a9251d', maxWidth: '100vw' }}>
            <p>CollegeKart is designed to empower students by providing a safe, easy-to-use platform for buying and selling products within their college network. Whether you’re looking for affordable electronics, rare books, or simply want to declutter your hostel room, CollegeKart makes it simple and secure.</p>
            <p>Our platform connects students from colleges across Tamil Nadu, making it easier to find what you need or reach a wider audience for your listings. With built-in search and filter features, direct messaging, and verified student accounts, you can trust every transaction.</p>
            <p>Join CollegeKart today and be part of a growing community that values sustainability, affordability, and student support. Discover deals, make new connections, and help create a greener campus by giving unused items a second life!</p>
          </div>
          <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: isMobile ? 'center' : 'flex-start', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            {/* ...existing feature cards... */}
            <div style={{ textAlign: 'center', background: 'rgba(227,242,253,0.35)', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px #e3f2fd', minWidth: 120 }}>
              <span style={{ fontSize: 28, color: '#0a73b0' }}>🔗</span>
              <div style={{ color: '#0a73b0', fontWeight: 700, marginTop: 8, fontSize: 13 }}>Connect with students</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(169,37,29,0.10)', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px #a9251d', minWidth: 120 }}>
              <span style={{ fontSize: 28, color: '#a9251d' }}>💸</span>
              <div style={{ color: '#a9251d', fontWeight: 700, marginTop: 8, fontSize: 13 }}>Affordable products</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(227,242,253,0.35)', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px #e3f2fd', minWidth: 120 }}>
              <span style={{ fontSize: 28, color: '#0a73b0' }}>🛡️</span>
              <div style={{ color: '#0a73b0', fontWeight: 700, marginTop: 8, fontSize: 13 }}>Safe marketplace</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(169,37,29,0.10)', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px #a9251d', minWidth: 120 }}>
              <span style={{ fontSize: 28, color: '#a9251d' }}>🔍</span>
              <div style={{ color: '#a9251d', fontWeight: 700, marginTop: 8, fontSize: 13 }}>Easy search & contact</div>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '18px', minWidth: 220, maxWidth: '100vw' }}>
            <img
              src={homeImg}
              alt="CollegeKart Home"
              style={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: 18, objectFit: 'cover' }}
            />
            <img
              src={homeImg2}
              alt="CollegeKart Home 2"
              style={{ width: '100%', maxWidth: 280, height: 'auto', borderRadius: 18, objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};


export default Home;
