import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText,Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import smallLogo from '../../assets/small_screen.png';
import largeLogo from '../../assets/large_screen.png';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {

  console.log('Before removal:', document.cookie);

  Cookies.remove('token');
  Cookies.remove('token', { path: '/' });
  Cookies.remove('token', { path: '/', domain: window.location.hostname });
  document.cookie = 'token=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=' + window.location.hostname + ';';
  document.cookie = 'token=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';

  setTimeout(() => {
    console.log('After removal:', document.cookie);
    navigate('/login');
    window.location.reload();
  }, 100);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #e3f2fd 0%, #f7fafd 100%)',
        color: mode === 'light' ? '#222' : '#fff',
        boxShadow: '0 4px 24px rgba(10,115,176,0.15)',
        borderBottom: '2px solid #0a73b0',
        backdropFilter: 'blur(16px)',
        zIndex: 1201,
        transition: 'all 0.3s',
        width:'100vw',
      }}
      elevation={3}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 72 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1, sm: 3 } }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: isSmallScreen ? 8 : 16 }}>
          <img
            src={largeLogo}
            alt="CollegeKart Logo"
            style={{ height: isSmallScreen ? 44 : 48, objectFit: 'contain', marginRight: isSmallScreen ? 0 : 18, transition: 'height 0.2s' }}
          />
          {!isSmallScreen && (
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0a73b0', letterSpacing: 2, lineHeight: '48px', display: 'flex', alignItems: 'center', textShadow: '0 2px 8px #e3f2fd' }}>
              CollegeKart
            </Typography>
          )}
        </div>
        {isSmallScreen ? (
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ zIndex: 2000 }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {[{ label: 'Home', to: '/', icon: <HomeIcon /> }, { label: 'Products', to: '/products', icon: <StorefrontIcon /> }, { label: 'Sell', to: '/sell', icon: <AddBoxIcon /> }, { label: 'Contact Us', to: '', icon: <ContactMailIcon /> }, { label: 'Logout', to: '', icon: <LogoutIcon /> }].map((item, idx) => (
              <Button
                key={item.label}
                color="inherit"
                component={item.to && item.label !== 'Logout' ? Link : 'button'}
                to={item.to}
                startIcon={React.cloneElement(item.icon, { sx: { verticalAlign: 'middle', mb: '2px', fontSize: 24 } })}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: isSmallScreen ? 14 : 17,
                  alignItems: 'center',
                  display: 'flex',
                  gap: 1,
                  py: isSmallScreen ? 1 : 1.5,
                  px: isSmallScreen ? 1 : 2,
                  borderRadius: 2,
                  position: 'relative',
                  color: '#0a73b0',
                  background: 'rgba(255,255,255,0.05)',
                  boxShadow: '0 1px 4px rgba(10,115,176,0.07)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: 'linear-gradient(90deg,#e3f2fd 60%,#f7fafd 100%)',
                    color: '#a9251d',
                    boxShadow: '0 2px 8px rgba(10,115,176,0.13)',
                  },
                  '&.active': {
                    color: '#a9251d',
                  },
                  '&:after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '3px',
                    background: 'linear-gradient(90deg,#0a73b0 60%,#a9251d 100%)',
                    borderRadius: '2px',
                    opacity: window.location.pathname === item.to ? 1 : 0,
                    transform: window.location.pathname === item.to ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'all 0.3s',
                  },
                }}
                onClick={
                  item.label === 'Contact Us' ? () => document.getElementById('footer').scrollIntoView({ behavior: 'smooth' }) :
                  item.label === 'Logout' ? handleLogout : undefined
                }
                className={window.location.pathname === item.to ? 'active' : ''}
              >
                {item.label}
              </Button>
            ))}
            <IconButton sx={{ ml: 2, p: 0 }} component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
              <AccountCircleIcon sx={{ fontSize: isSmallScreen ? 24 : 32, color: '#a9251d' }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
  <Drawer anchor={isSmallScreen ? "top" : "right"} open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { zIndex: 2002 } }}>
        <List sx={{ width: isSmallScreen ? '70vw' : 220, minWidth: 140 }} style={{marginTop: 50}}>
          <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)} sx={{ zIndex: 2100 }}>
            <ListItemIcon><HomeIcon sx={{ fontSize: isSmallScreen ? 28 : 24 }} /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Home</span>} />
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={() => setDrawerOpen(false)}>
            <ListItemIcon><StorefrontIcon /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Products</span>} />
          </ListItem>
          <ListItem button component={Link} to="/sell" onClick={() => setDrawerOpen(false)}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Sell</span>} />
          </ListItem>
          <ListItem button onClick={() => { document.getElementById('footer').scrollIntoView({ behavior: 'smooth' }); setDrawerOpen(false); }}>
            <ListItemIcon><ContactMailIcon /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Contact Us</span>} />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Profile</span>} />
          </ListItem>
          <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary={<span style={{ fontWeight: 700, fontSize: isSmallScreen ? 18 : 16, color: '#0a73b0' }}>Logout</span>} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
