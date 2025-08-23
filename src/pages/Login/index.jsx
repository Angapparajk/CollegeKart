import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import homeImg from '../../assets/home.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      setSnackbarMsg('Invalid email format');
      setSnackbarOpen(true);
      setLoading(false);
      console.log('Snackbar: Invalid email format');
      return;
    }
    if (password.length < 6) {
      setSnackbarMsg('Password must be at least 6 characters');
      setSnackbarOpen(true);
      setLoading(false);
      console.log('Snackbar: Password too short');
      return;
    }
    try {
      const res = await axios.post('https://collegekart-backend.onrender.com/api/users/login', { email, password });
      Cookies.set('token', res.data.token);
      setSuccess('Login successful!');
      setLoading(false);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setSnackbarMsg(err.response?.data?.message || 'Login failed');
      setSnackbarOpen(true);
      setLoading(false);
      console.log('Snackbar:', err.response?.data?.message || 'Login failed');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const isMobile = window.innerWidth <= 600;
  return (
    <>
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 2vw' }}>
          {isMobile ? (
            <img src={homeImg} alt="CollegeKart Home" style={{ width: '100%', maxWidth: 340, height: 'auto', borderRadius: 18, objectFit: 'cover', margin: '0 auto 8px auto' }} />
          ) : (
            <img src={homeImg} alt="CollegeKart Home" style={{ width: '100%', maxWidth: 440, height: 'auto', borderRadius: 18, objectFit: 'cover', marginRight: 32 }} />
          )}
          <Container maxWidth="md" sx={{ px: { xs: 1, sm: 0 }, width: isMobile ? '100%' : 520, mb: { xs: 2, sm: 4 } }}>
            <Paper elevation={4} sx={{ p: { xs: 2, sm: 5 }, borderRadius: 4, boxShadow: '0 4px 24px #e3f2fd', minWidth: { sm: 420, md: 520 }, maxWidth: { sm: 600, md: 680 } }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#a9251d', mb: 2, textAlign: 'center', letterSpacing: 1, textShadow: '0 2px 8px #e3f2fd' }}>Login</Typography>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }} />
                <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }} />
                {/* Error message now shown via Snackbar */}
                {success && <Typography sx={{ color: '#388e3c', fontWeight: 700, textAlign: 'center', mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}><CheckCircleIcon sx={{ fontSize: 22, color: '#388e3c' }} /> {success}</Typography>}
                {/* <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2, fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.2rem' }, borderRadius: 2, boxShadow: '0 2px 8px #a9251d', background: 'linear-gradient(90deg,#a9251d 60%,#0a73b0 100%)' }}>Login</Button> */}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2, fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.2rem' }, borderRadius: 2, boxShadow: '0 2px 8px #a9251d', background: 'linear-gradient(90deg,#a9251d 60%,#0a73b0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }} disabled={loading}>
                  Login
                  {loading && <CircularProgress size={22} sx={{ color: '#fff', ml: 1 }} />}
                </Button>
              </form>
              <Typography sx={{ mt: 2, textAlign: 'center', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                Don't have an account? <a href="/register" style={{ color: '#0a73b0', fontWeight: 700, textDecoration: 'underline' }}>Register</a>
              </Typography>
            </Paper>
          </Container>
        </div>
      </div>
  <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Login;
