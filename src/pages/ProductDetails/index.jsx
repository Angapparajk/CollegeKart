import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import FailureView from '../../components/FailureView';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios.get(`https://collegekart-backend.onrender.com/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    loading ? <Loader /> :
    error ? <FailureView message="Unable to fetch product details. Please try again later." /> :
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 6 } }}>
      <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, boxShadow: '0 8px 32px rgba(10,115,176,0.15)' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, sm: 4 }, alignItems: 'stretch' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: { xs: '100%', sm: 320 } }}>
            {product.images && product.images.length > 0 ? (
              <img
                src={
                  product.images[0]?.startsWith('http')
                    ? product.images[0]
                    : `data:image/jpeg;base64,${product.images[0]}`
                }
                alt={product.title}
                style={{ width: '100%', maxWidth: 420, height: 'auto', maxHeight: 320, objectFit: 'cover', borderRadius: 20 }}
              />
            ) : (
              <img
                src={
                  typeof product.images === 'string' && product.images.startsWith('http')
                    ? product.images
                    : typeof product.images === 'string' && product.images.length > 30
                      ? `data:image/jpeg;base64,${product.images}`
                      : ''
                }
                alt={product.title}
                style={{ width: '100%', maxWidth: 420, height: 'auto', maxHeight: 320, objectFit: 'cover', borderRadius: 20 }}
              />
            )}
          </Box>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 320 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ color: '#a9251d', mb: 2, fontWeight: 700, fontSize: { xs: 20, sm: 28 } }}>{product.title}</Typography>
            <Typography variant="body1" sx={{ color: '#0a73b0', mb: 2, fontSize: { xs: 15, sm: 18 } }}>{product.description}</Typography>
            <Typography variant="h5" sx={{ color: '#a9251d', mb: 2, fontWeight: 700, background: 'linear-gradient(90deg,#ffe0e0 60%,#fff7f7 100%)', px: 2, py: 1, borderRadius: 2, boxShadow: '0 2px 8px rgba(169,37,29,0.10)', fontSize: { xs: 17, sm: 22 } }}>₹{product.price}</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: '#0a73b0', fontWeight: 500, fontSize: { xs: 13, sm: 16 } }}>Category: {product.category}</Typography>
              <Typography variant="body2" sx={{ color: '#a9251d', fontWeight: 500, fontSize: { xs: 13, sm: 16 } }}>College: {product.college}</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: '#0a73b0', mt: 3, mb: 1, fontWeight: 700, fontSize: { xs: 16, sm: 20 } }}>Seller Details</Typography>
            <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 2, background: '#f7fafd', mb: 2 }}>
              <Typography variant="body1" sx={{ color: '#a9251d', fontWeight: 700, fontSize: { xs: 15, sm: 18 }, background: 'linear-gradient(90deg,#e3f2fd 60%,#f7fafd 100%)', px: 2, py: 1, borderRadius: 2,mb: 1 }}>Name: {product.seller?.name}</Typography>
              <Typography variant="body2" sx={{ color: '#0a73b0', fontWeight: 700, fontSize: { xs: 15, sm: 18 }, background: 'linear-gradient(90deg,#ffe0e0 60%,#fff7f7 100%)', px: 2, py: 1, borderRadius: 2,mb: 1 }}>College: {product.seller?.college}</Typography>
              <Typography variant="body1" sx={{ color: '#a9251d', fontWeight: 700, fontSize: { xs: 15, sm: 18 }, background: 'linear-gradient(90deg,#e3f2fd 60%,#f7fafd 100%)', px: 2, py: 1, borderRadius: 2, mb: 1 }}>Contact: {product.seller?.contact}</Typography>
            </Paper>
            {/* <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="outlined" sx={{ color: '#a9251d', borderColor: '#a9251d' }}>Add to Wishlist</Button>
            </Box> */}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
