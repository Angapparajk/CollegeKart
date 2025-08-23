import React, { useEffect, useState } from 'react';
import FailureView from '../../components/FailureView';
import Loader from '../../components/Loader';
import {Typography, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [college, setCollege] = useState('');
  const [colleges, setColleges] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [collegesLoaded, setCollegesLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('https://collegekart-backend.onrender.com/api/colleges')
      .then(res => setColleges(res.data))
      .catch(() => setError('Failed to fetch colleges.'))
      .finally(() => setCollegesLoaded(true));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (college) params.college = college;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    axios.get('https://collegekart-backend.onrender.com/api/products', { params })
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to fetch products.'))
      .finally(() => setProductsLoaded(true));
  }, [search, category, college, sortBy, sortOrder]);
  const allLoaded = collegesLoaded && productsLoaded;
  if (error) {
    return <FailureView message={error} />;
  }
  return (
    <div style={{ width: '100%', marginTop: 32, fontFamily: 'Poppins, Arial, sans-serif' }}>
      <Typography variant="h4" gutterBottom sx={{ px: { xs: 1, sm: 2 }, color: '#a9251d', fontSize: { xs: 24, sm: 32 } }} style={{ textAlign: 'center' }}>Products</Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }} style={{margin: '0 auto'}} sx={{ mb: 2, px: { xs: 'auto', sm: 4 }, justifyContent: 'center', maxWidth: { xs: 340, sm: 1400 }, margin: '0 auto' }}>
        <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField label="Search" fullWidth sx={{ minWidth: { xs: 240, sm: 220, md: 500 }, maxWidth: { xs: 300, sm: 400, md: 600 }, mx: { xs: 0.5, sm: 1 } }} value={search} onChange={e => setSearch(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ minWidth: { xs: 240, sm: 120, md: 200 }, maxWidth: { xs: 300, sm: 300, md: 400 }, mx: { xs: 0.5, sm: 1 } }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={e => setCategory(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Books">Books</MenuItem>
              <MenuItem value="Stationery">Stationery</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ minWidth: { xs: 240, sm: 140, md: 200 }, maxWidth: { xs: 300, sm: 300, md: 400 }, mx: { xs: 0.5, sm: 1 } }}>
            <InputLabel>College</InputLabel>
            <Select value={college} label="College" onChange={e => setCollege(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {colleges.map(c => <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ minWidth: { xs: 240, sm: 140, md: 200 }, maxWidth: { xs: 300, sm: 200, md: 220 }, mx: { xs: 'auto', sm: 1 }, alignSelf: { xs: 'center', sm: 'stretch' } }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={e => setSortBy(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} sx={{ mt: 1, width: '100%', mx: { xs: 0.5, sm: 1 } }}>
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </Button>
        </Grid>
      </Grid>
      {!allLoaded ? <Loader /> : (
        <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ px: { xs: 1, sm: 3 } }}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} sx={{ width: { xs: '100%', sm: 310 } }}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 1.5, sm: 2.5 },
                  cursor: 'pointer',
                  height: { xs: 340, sm: 370 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'linear-gradient(135deg, #f7fafd 60%, #e3f2fd 100%)',
                  borderRadius: 6,
                  boxShadow: '0 6px 24px rgba(10,115,176,0.13)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(10,115,176,0.22)',
                    transform: 'translateY(-4px) scale(1.04)',
                  },
                }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <img
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? (product.images[0]?.startsWith('http')
                          ? product.images[0]
                          : `data:image/jpeg;base64,${product.images[0]}`)
                      : (typeof product.images === 'string' && product.images.startsWith('http')
                          ? product.images
                          : typeof product.images === 'string' && product.images.length > 30
                            ? `data:image/jpeg;base64,${product.images}`
                            : '')
                  }
                  alt={product.title}
                  style={{ width: '98%', height: 'auto', maxHeight: 200, objectFit: 'cover', marginBottom: 16, borderRadius: 12, background: '#f7fafd', boxShadow: '0 2px 12px rgba(169,37,29,0.13)' }}
                />
                <Typography variant="h6" align="center" sx={{ color: '#a9251d', fontWeight: 700, fontSize: { xs: 16, sm: 20 } }}>{product.title}</Typography>
                <Typography variant="body2" align="center" sx={{ color: '#0a73b0', fontWeight: 500, fontSize: { xs: 13, sm: 16 } }}>{product.category} | {product.college}</Typography>
                <Typography variant="body1" align="center" sx={{ mt: 1, color: '#a9251d', fontWeight: 800, fontSize: { xs: 15, sm: 18 }, background: 'linear-gradient(90deg,#ffe0e0 60%,#fff7f7 100%)', px: 2, py: 0.5, borderRadius: 2, boxShadow: '0 2px 8px rgba(169,37,29,0.10)' }}>₹{product.price}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Products;
