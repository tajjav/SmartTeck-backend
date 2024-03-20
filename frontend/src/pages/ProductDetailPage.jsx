import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Paper, Box, IconButton, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@mui/material/LinearProgress';
import { useStore } from '../contexts/StoreContext';


const fetchProductDetails = async (productId) => {
  try {
    //  TODO use env for this localhost
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    console.error("Fetching product details failed:", error);
    return null;
  }
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useStore(); 

  useEffect(() => {
    const getProductDetails = async () => {
      const productDetails = await fetchProductDetails(productId);
      setProduct(productDetails);
    };

    getProductDetails();
  }, [productId]);

  // Navigate back to the product's category list
  const handleBack = () => {
    navigate(-1); // Goes back one step in the browser's history
  };



  const increaseQuantity = () => setQuantity(qty => qty + 1);
  const decreaseQuantity = () => setQuantity(qty => Math.max(qty - 1, 1));
  
    const handleAddToCart = () => {
      if (product) {
        addToCart({ 
          product_Id: product.id,
          name: product.name,
          price: parseFloat(product.price_cents) / 100, // Convert price from cents to dollars if needed
          imageUrl: product.image_1,
          quantity
        });
        
      }
    };

  if (!product) {
    return    <Box sx={{ width: '100%' }}>
    <LinearProgress color="success" />
</Box>

  };

  return (
    <Grid container spacing={4} justifyContent="center" style={{ margin: '0 auto', maxWidth: '1280px', padding: '20px' }}>
      <Grid item xs={12}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back to Products
        </Button>
      </Grid>
      <Grid item md={6} sm={12}>
        {/* Product image and additional images */}
        <img src={import.meta.env.VITE_API_BASE_URL + product.image_1} alt={product.name} style={{ width: '100%' }} />
        {/* Rest of your product detail UI */}
        <img src={import.meta.env.VITE_API_BASE_URL + product.image_2} alt={product.name} style={{ width: '100%' }} />
        <img src={import.meta.env.VITE_API_BASE_URL + product.image_3} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item md={6} sm={12}>
        <Typography variant="h4">{product.name}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5">Price: ${product.price_cents / 100}</Typography> {/* price is in cents */}
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        {/* Quantity and add to cart button */}
        <div>
          <Button onClick={decreaseQuantity}>-</Button>
          <Typography component="span" sx={{ margin: '0 20px' }}>{quantity}</Typography>
          <Button onClick={increaseQuantity}>+</Button>
        </div>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            sx={{ padding: '10px 50px' }}
            onClick={handleAddToCart} 
          >
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;
