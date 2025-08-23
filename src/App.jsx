import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Sell from './pages/Sell';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/login' || location.pathname === '/register';
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: '100vh',
        width: '100vw',
        transition: 'background 0.3s, color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Poppins, Arial, sans-serif'
      }}
    >
      {!hideNavFooter && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/products' element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path='/products/:id' element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          } />
          <Route path='/product/:id' element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/sell' element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default App;