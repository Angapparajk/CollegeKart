import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import homeImg from '../../assets/home.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && /\d/.test(value)) {
      setSnackbarMsg('Numbers are not allowed in the name field.');
      setSnackbarOpen(true);
      return;
    }
    if (name === 'contact' && /[^0-9]/.test(value)) {
      setSnackbarMsg('Only numbers are allowed in the contact field.');
      setSnackbarOpen(true);
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const isMobile = window.innerWidth <= 600;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (!form.name || !form.college) {
      setError('Name and College are required');
      setLoading(false);
      return;
    }
    try {
      await axios.post('https://collegekart-backend.onrender.com/api/users/register', form);
      setSuccess('Registration successful!');
      setLoading(false);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

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
            <Paper elevation={6} sx={{ p: { xs: 2, sm: 5 }, borderRadius: 8, boxShadow: '0 8px 32px #a9251d33', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', border: '1.5px solid #e3f2fd', minWidth: { sm: 420, md: 520 }, maxWidth: { sm: 600, md: 680 } }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <PersonAddAltIcon sx={{ fontSize: 48, color: '#0a73b0', mb: 1, textShadow: '0 2px 8px #e3f2fd' }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#a9251d', mb: 0, textAlign: 'center', letterSpacing: 1, textShadow: '0 2px 8px #e3f2fd' }}>Register</Typography>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <TextField label="Name" name="name" fullWidth margin="normal" value={form.name} onChange={handleChange} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, background: 'rgba(227,242,253,0.25)', borderRadius: 2, boxShadow: '0 1px 4px #e3f2fd' }} />
                <TextField label="Email" name="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, background: 'rgba(227,242,253,0.25)', borderRadius: 2, boxShadow: '0 1px 4px #e3f2fd' }} />
                <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, background: 'rgba(227,242,253,0.25)', borderRadius: 2, boxShadow: '0 1px 4px #e3f2fd' }} />
                <TextField label="College" name="college" fullWidth margin="normal" value={form.college} onChange={handleChange} required sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, background: 'rgba(227,242,253,0.25)', borderRadius: 2, boxShadow: '0 1px 4px #e3f2fd' }} />
                <TextField label="Contact" name="contact" fullWidth margin="normal" value={form.contact} onChange={handleChange} sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' }, background: 'rgba(227,242,253,0.25)', borderRadius: 2, boxShadow: '0 1px 4px #e3f2fd' }} />
                {error && <Typography color="error" sx={{ fontWeight: 700, textAlign: 'center', mt: 1 }}>{error}</Typography>}
                {success && <Typography sx={{ color: '#388e3c', fontWeight: 700, textAlign: 'center', mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}><CheckCircleIcon sx={{ fontSize: 22, color: '#388e3c' }} /> {success}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.2, fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.2rem' }, borderRadius: 2, boxShadow: '0 2px 8px #a9251d', background: 'linear-gradient(90deg,#a9251d 60%,#0a73b0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }} disabled={loading}>
                  Register
                  {loading && <CircularProgress size={22} sx={{ color: '#fff', ml: 1 }} />}
                </Button>
              </form>
              <Typography sx={{ mt: 2, textAlign: 'center', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                Already have an account? <a href="/login" style={{ color: '#0a73b0', fontWeight: 700, textDecoration: 'underline' }}>Login</a>
              </Typography>
            </Paper>
          </Container>
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Register;
