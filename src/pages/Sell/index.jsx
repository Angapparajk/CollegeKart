import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FailureView from '../../components/FailureView';
import { Typography, Paper, Container, Button, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../components/Loader';

const Sell = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    college: '',
    images: null,
    newCollege: ''
  });
  const [showNewCollegeInput, setShowNewCollegeInput] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const token = Cookies.get('token');
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          axios.get('https://collegekart-backend.onrender.com/api/products?user=' + decoded.id, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => setProducts(res.data))
          .catch(() => setError('Failed to fetch your products.'));
          axios.get(`https://collegekart-backend.onrender.com/api/sold/user/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => setSoldProducts(res.data))
          .catch(() => {});
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setProducts([]);
        setSoldProducts([]);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    // Fetch colleges for dropdown
    axios.get('https://collegekart-backend.onrender.com/api/colleges')
      .then(res => setColleges(res.data))
      .catch(() => setError('Failed to fetch colleges.'));
  }, [token]);

  // Get user from token
  let user = null;
  try {
    user = token ? jwtDecode(token) : null;
  } catch (e) {
    user = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    let collegeName = form.college;
    if (form.college === 'Other' && form.newCollege.trim()) {
      collegeName = form.newCollege.trim();
    }
    if (!form.title || !form.price || !collegeName || !user?.id) {
      alert('Please fill all required fields: Title, Price, College, and make sure you are logged in.');
      return;
    }
    setLoading(true);
    try {
      // If 'Other' is selected, add new college to backend and use that name
      if (form.college === 'Other' && form.newCollege.trim()) {
        await axios.post('https://collegekart-backend.onrender.com/api/colleges', { name: form.newCollege.trim() }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        collegeName = form.newCollege.trim();
      }
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('college', collegeName);
      formData.append('seller', user?.id);
      if (form.images) {
        formData.append('images', form.images);
      }
      // Debug: log FormData values before sending
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }
      const res = await axios.post('https://collegekart-backend.onrender.com/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      setProducts([res.data, ...products]);
      setModalOpen(false);
      setForm({ title: '', description: '', price: '', category: '', college: '', images: null, newCollege: '' });
      setShowNewCollegeInput(false);
      setImagePreview(null);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Error publishing product';
      alert(errorMsg);
    }
    setLoading(false);
  };

  if (error) {
    return <FailureView message={error} />;
  }
  return (
    loading ? <Loader /> : (
      <Container maxWidth="sm" sx={{ mt: { xs: 2, sm: 4 }, fontFamily: 'Poppins, Arial, sans-serif' }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, background: '#fff', border: '2px solid #0a73b0', borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#a9251d' }}>Sell Product</Typography>
          <Typography variant="h6" sx={{ color: '#0a73b0', fontWeight: 700, mb: 2 }}>Your Published Products</Typography>
          {loading ? <Loader /> : products.length === 0 ? (
            <Typography sx={{ color: '#0a73b0' }}>You have not published any products yet.</Typography>
          ) : (
            <>
              <Typography sx={{ color: '#0a73b0' }}>Your Published Products:</Typography>
              {products.map(product => (
                <Paper
                  key={product._id}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    mt: { xs: 1, sm: 2 },
                    border: '1px solid #a9251d',
                    borderRadius: 2,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(10,115,176,0.10)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(10,115,176,0.18)',
                      transform: 'translateY(-2px) scale(1.02)',
                    },
                  }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.images && product.images.length > 0 && (
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={
                          product.images[0]?.startsWith('http')
                            ? product.images[0]
                            : `data:image/jpeg;base64,${product.images[0]}`
                        }
                        alt="Product"
                        style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 12, boxShadow: '0 2px 8px rgba(169,37,29,0.10)' }}
                      />
                    </Box>
                  )}
                  <Typography variant="h6" sx={{ color: '#a9251d', fontWeight: 600, fontSize: { xs: 15, sm: 18 } }}>{product.title}</Typography>
                  <Typography sx={{ color: '#0a73b0', fontWeight: 500, fontSize: { xs: 14, sm: 16 } }}>₹{product.price}</Typography>
                  <Typography sx={{ color: '#0a73b0', fontSize: { xs: 13, sm: 15 } }}>{product.category} | {product.college}</Typography>
                  <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await axios.post(`https://collegekart-backend.onrender.com/api/sold/sell/${product._id}`, {}, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      setProducts(products.filter(p => p._id !== product._id));
                      const res = await axios.get(`https://collegekart-backend.onrender.com/api/sold/user/${user.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      setSoldProducts(res.data);
                      setLoading(true);
                      alert('Product marked as sold!');
                    } catch (err) {
                      alert(err?.response?.data?.message || 'Failed to mark as sold');
                    }
                  }}>Mark as Sold</Button>
                </Paper>
              ))}
            </>
          )}
          {/* Sold Products Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ color: '#0a73b0', fontWeight: 700, mb: 2 }}>Your Sold Products</Typography>
            {loading ? <Loader /> : soldProducts.length === 0 ? (
              <Typography>No products sold yet.</Typography>
            ) : (
              <>
                {soldProducts.map(product => (
                  <Paper
                    key={product._id}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      mt: { xs: 1, sm: 2 },
                      border: '1px solid #0a73b0',
                      borderRadius: 2,
                      boxShadow: '0 4px 16px rgba(10,115,176,0.10)',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(10,115,176,0.18)',
                        transform: 'translateY(-2px) scale(1.02)',
                      },
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.images && product.images.length > 0 && (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={
                            product.images[0]?.startsWith('http')
                              ? product.images[0]
                              : `data:image/jpeg;base64,${product.images[0]}`
                          }
                          alt="Product"
                          style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 12, boxShadow: '0 2px 8px rgba(10,115,176,0.10)' }}
                        />
                      </Box>
                    )}
                    <Typography variant="h6" sx={{ color: '#0a73b0', fontWeight: 600, fontSize: { xs: 15, sm: 18 } }}>{product.title}</Typography>
                    <Typography sx={{ color: '#a9251d', fontWeight: 500, fontSize: { xs: 14, sm: 16 } }}>₹{product.price}</Typography>
                    <Typography sx={{ color: '#a9251d', fontSize: { xs: 13, sm: 15 } }}>{product.category} | {product.college}</Typography>
                  </Paper>
                ))}
              </>
            )}
          </Box>
          <Button variant="contained" sx={{ mt: 3, background: '#0a73b0' }} onClick={() => setModalOpen(true)}>Publish New Product</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 2, sm: 4 },
                background: '#fff',
                borderRadius: 3,
                maxWidth: { xs: '95vw', sm: 400 },
                mx: 'auto',
                mt: { xs: 2, sm: 8 },
                maxHeight: '80vh',
                overflowY: 'auto',
                boxSizing: 'border-box',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#a9251d' }}>Publish Product</Typography>
              <TextField label="Title" fullWidth required sx={{ mb: 2 }} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <TextField label="Description" fullWidth required multiline rows={3} sx={{ mb: 2 }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <TextField label="Price" fullWidth required type="number" sx={{ mb: 2 }} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select value={form.category} label="Category" onChange={e => setForm({ ...form, category: e.target.value })}>
                  <MenuItem value="Books">Books</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Hostel">Hostel</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>College</InputLabel>
                <Select
                  value={form.college}
                  label="College"
                  onChange={e => {
                    const value = e.target.value;
                    setForm({ ...form, college: value });
                    setShowNewCollegeInput(value === 'Other');
                  }}
                >
                  {colleges.map(college => (
                    <MenuItem key={college._id} value={college.name}>{college.name}</MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              {showNewCollegeInput && (
                <TextField
                  label="Enter College Name"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={form.newCollege}
                  onChange={e => setForm({ ...form, newCollege: e.target.value })}
                />
              )}
              <Button variant="contained" component="label" sx={{ mb: 2, background: '#0a73b0' }}>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    setForm({ ...form, images: file });
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
              </Button>
              {form.images && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">Selected: {form.images.name}</Typography>
                  {imagePreview && (
                    <Box sx={{ mt: 1 }}>
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
                    </Box>
                  )}
                </Box>
              )}
              <Button variant="contained" sx={{ background: '#a9251d' }} fullWidth type="submit">Submit</Button>
            </Box>
          </Modal>
        </Paper>
      </Container>
    )
  );
};

export default Sell;
