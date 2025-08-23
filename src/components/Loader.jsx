import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import smallLogo from '../assets/small_screen.png';
import largeLogo from '../assets/large_screen.png';

const Loader = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <div style={{ width: '100vw', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <img
        src={isSmallScreen ? largeLogo : largeLogo}
        alt="Loading..."
        style={{ height: 60, objectFit: 'contain' }}
      />
      <div style={{ position: 'relative', width: 220, height: 32, marginTop: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 12,
          left: 0,
          width: '100%',
          height: 8,
          background: 'linear-gradient(90deg, #343434ff 80%, #555 100%)',
          borderRadius: 8,
          boxShadow: '0 2px 8px #222',
          padding: '15px',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 'calc(100% - 24px)',
            height: 8,
            position: 'absolute',
            top: 18,
            left: 12,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              animation: 'road-move 1.2s linear infinite',
              marginTop: 4,
              marginBottom: 4,
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                  width: 45,
                  height: 6,
                  background: '#fff',
                  borderRadius: 2,
                  margin: '0 9px',
                  boxShadow: '0 1px 4px #222',
                }} />
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes road-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-54px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;
