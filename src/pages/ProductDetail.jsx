import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Container, Button, TextField, Box } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', college: '' });
  const token = Cookies.get('token');
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://collegekart-backend.onrender.com/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setForm({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
          college: res.data.college
        });

        try {
          const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
          setIsSeller(user && user.id === (res.data.seller?._id || res.data.seller));
        } catch {
          setIsSeller(false);
        }
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`https://collegekart-backend.onrender.com/api/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProduct({ ...product, ...form });
      setEditMode(false);
    } catch (err) {
      alert('Error updating product');
    }
    setLoading(false);
  };

  if (loading) return <Loader />;
  if (!product) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#fff', border: '2px solid #a9251d', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#a9251d', fontWeight: 700, mb: 2 }}>Product Not Found</Typography>
        <Typography variant="body1" sx={{ color: '#0a73b0', mb: 2 }}>Sorry, the product you are looking for does not exist or has been removed.</Typography>
        <Button variant="contained" sx={{ background: '#0a73b0' }} onClick={() => navigate('/')}>Go to Home</Button>
      </Paper>
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, background: '#fff', border: '2px solid #0a73b0', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#a9251d' }}>Product Details</Typography>
        {editMode ? (
          <Box>
            <TextField label="Title" fullWidth sx={{ mb: 2 }} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <TextField label="Description" fullWidth multiline rows={3} sx={{ mb: 2 }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <TextField label="Price" fullWidth type="number" sx={{ mb: 2 }} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <TextField label="Category" fullWidth sx={{ mb: 2 }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <TextField label="College" fullWidth sx={{ mb: 2 }} value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} />
            <Button variant="contained" sx={{ background: '#0a73b0', mr: 2 }} onClick={handleSave}>Save</Button>
            <Button variant="outlined" sx={{ color: '#a9251d' }} onClick={handleCancel}>Cancel</Button>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ color: '#a9251d' }}>{product.title}</Typography>
            <Typography sx={{ color: '#0a73b0' }}>₹{product.price}</Typography>
            <Typography sx={{ color: '#0a73b0' }}>{product.category} | {product.college}</Typography>
            <Typography sx={{ mt: 2 }}>{product.description}</Typography>
            {product.seller && (
              <Typography sx={{ mt: 2, color: '#0a73b0' }}>
                Contact: {product.seller.email || product.seller.contact || 'N/A'}
              </Typography>
            )}
            {product.images && product.images.length > 0 && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt="Product"
                  style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 8 }}
                />
              </Box>
            )}
            {isSeller && (
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" sx={{ background: '#0a73b0' }} onClick={handleEdit}>Edit</Button>
                <Button variant="outlined" sx={{ color: '#a9251d', borderColor: '#a9251d' }} onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this product?')) {
                    try {
                      await axios.delete(`https://collegekart-backend.onrender.com/api/products/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      alert('Product deleted successfully');
                      navigate('/sell');
                    } catch (err) {
                      alert('Error deleting product');
                    }
                  }
                }}>Delete</Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProductDetail;
