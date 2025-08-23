import React, { useEffect, useState } from 'react';
import FailureView from '../../components/FailureView';
import { Container, Typography, Paper, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../components/Loader';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          axios.get('https://collegekart-backend.onrender.com/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            const foundUser = res.data.find(u => u._id === decoded.id);
            setUser(foundUser);
          })
          .catch(() => setError('Failed to fetch user profile.'));
          axios.get('https://collegekart-backend.onrender.com/api/products?user=' + decoded.id, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => setUserProducts(res.data))
          .catch(() => setUserProducts([]))
          .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } catch (e) {
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <Loader />;
  if (error) return <FailureView message={error} />;
  if (!user) return <FailureView message="User not found." />;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '16px 2vw',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', maxWidth: '100vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <span style={{
                position: 'absolute',
                top: -40,
                left: -40,
                width: 360,
                height: 360,
                borderRadius: '50%',
                zIndex: 0,
              }}></span>
              <span style={{ position: 'relative', zIndex: 1,width: 360, height: 360, }}>
                <Avatar
                  src={user?.avatarUrl || ''}
                  alt={user?.name || 'Profile'}
                  sx={{ width: 250, height: 250, border: '4px solid #a9251d', boxShadow: '0 6px 24px #e3f2fd', background: '#fff', fontSize: 54, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {user?.avatarUrl ? (user?.name ? user.name[0] : 'U') : <PersonIcon sx={{ fontSize: 150, color: '#a9251d' }} />}
                </Avatar>
              </span>
            </div>
           </div>
        </div>
        <div style={{ flex: 2, minWidth: 220, display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '100vw' }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4, background: 'rgba(227,242,253,0.45)', boxShadow: '0 2px 8px #e3f2fd' }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#a9251d', mb: 2, fontSize: { xs: '2rem', sm: '2.2rem' }, letterSpacing: 1, textShadow: '0 2px 8px #e3f2fd', textAlign: 'center' }}>Account Details</Typography>
            <Typography variant="body1" sx={{ color: '#0a73b0', fontWeight: 800, mb: 1.5, fontSize: { xs: '1.3rem', sm: '1.5rem' }, letterSpacing: 0.7, background: 'rgba(227,242,253,0.25)', borderRadius: 8, px: 2, py: 1, boxShadow: '0 2px 8px #e3f2fd', textAlign: 'center' }}>
              <span style={{ color: '#a9251d', fontWeight: 900, fontSize: '1.1em', marginRight: 8 }}>Name:</span> {user?.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#0a73b0', fontWeight: 800, mb: 1.5, fontSize: { xs: '1.3rem', sm: '1.5rem' }, letterSpacing: 0.7, background: 'rgba(227,242,253,0.25)', borderRadius: 8, px: 2, py: 1, boxShadow: '0 2px 8px #e3f2fd', textAlign: 'center' }}>
              <span style={{ color: '#a9251d', fontWeight: 900, fontSize: '1.1em', marginRight: 8 }}>Email:</span> {user?.email}
            </Typography>
            <Typography variant="body1" sx={{ color: '#0a73b0', fontWeight: 800, mb: 1.5, fontSize: { xs: '1.3rem', sm: '1.5rem' }, letterSpacing: 0.7, background: 'rgba(227,242,253,0.25)', borderRadius: 8, px: 2, py: 1, boxShadow: '0 2px 8px #e3f2fd', textAlign: 'center' }}>
              <span style={{ color: '#a9251d', fontWeight: 900, fontSize: '1.1em', marginRight: 8 }}>College:</span> {user?.college}
            </Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Profile;