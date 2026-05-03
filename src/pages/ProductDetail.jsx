import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Chip,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import CachedIcon from "@mui/icons-material/Cached";
import { addToCart } from "../store/slices/cartSlice";
import { products } from "../data/products";
import WatchCard from "../components/watch/WatchCard";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={600}>
          Product not found
        </Typography>
        <Button
          component={Link}
          to="/shop"
          sx={{ mt: 2, textTransform: "none" }}
        >
          Back to Shop
        </Button>
      </Container>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const related = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(product));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Back Button */}
        <Button
          component={Link}
          to="/shop"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
            color: "#6b7280",
            fontWeight: 600,
            mb: 3,
            "&:hover": { color: "#1d4ed8" },
          }}
        >
          Back to Shop
        </Button>

        {/* Main Product Section */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Grid container>
            {/* Product Image */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 300, md: "100%" },
                  minHeight: 400,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Chip
                  label={product.badge}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "#1d4ed8",
                    color: "white",
                    fontWeight: 700,
                  }}
                />
                <Chip
                  label={`-${discount}%`}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                {/* Brand + Type */}
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip
                    label={product.brand}
                    size="small"
                    sx={{
                      backgroundColor: "#eff6ff",
                      color: "#1d4ed8",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={product.type}
                    size="small"
                    sx={{
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  />
                </Box>

                {/* Name */}
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: "#111827", mb: 2 }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography fontWeight={600} sx={{ color: "#111827" }}>
                    {product.rating}
                  </Typography>
                  <Typography sx={{ color: "#6b7280" }}>
                    ({product.reviews} reviews)
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Price */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{ color: "#111827" }}
                  >
                    Rs. {product.price.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: "#9ca3af", textDecoration: "line-through" }}
                  >
                    Rs. {product.originalPrice.toLocaleString()}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#16a34a", fontWeight: 600, mb: 3 }}>
                  You save Rs.{" "}
                  {(product.originalPrice - product.price).toLocaleString()} (
                  {discount}% off)
                </Typography>

                {/* Quantity Selector */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Typography fontWeight={600} sx={{ color: "#374151" }}>
                    Quantity:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      sx={{
                        minWidth: 40,
                        height: 40,
                        color: "#374151",
                        fontWeight: 700,
                        fontSize: 18,
                        borderRadius: 0,
                      }}
                    >
                      -
                    </Button>
                    <Typography
                      sx={{
                        px: 2.5,
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#111827",
                        borderLeft: "1px solid #e5e7eb",
                        borderRight: "1px solid #e5e7eb",
                      }}
                    >
                      {qty}
                    </Typography>
                    <Button
                      onClick={() => setQty((q) => q + 1)}
                      sx={{
                        minWidth: 40,
                        height: 40,
                        color: "#374151",
                        fontWeight: 700,
                        fontSize: 18,
                        borderRadius: 0,
                      }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>

                {/* Add to Cart */}
                {added && (
                  <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                    Added to cart successfully!
                  </Alert>
                )}

                <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: 16,
                      flex: 1,
                      backgroundColor: "#1d4ed8",
                      "&:hover": { backgroundColor: "#1e40af" },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/cart"
                    onClick={handleAddToCart}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: 16,
                      flex: 1,
                      backgroundColor: "#f59e0b",
                      color: "#111827",
                      "&:hover": { backgroundColor: "#d97706" },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Features */}
                <Grid container spacing={2}>
                  {[
                    {
                      icon: <LocalShippingIcon sx={{ color: "#1d4ed8" }} />,
                      title: "Free Delivery",
                      desc: "On all orders in Pakistan",
                    },
                    {
                      icon: <VerifiedIcon sx={{ color: "#16a34a" }} />,
                      title: "Original Product",
                      desc: "100% authentic guaranteed",
                    },
                    {
                      icon: <CachedIcon sx={{ color: "#f59e0b" }} />,
                      title: "Easy Returns",
                      desc: "7 day return policy",
                    },
                  ].map((item) => (
                    <Grid item xs={12} sm={4} key={item.title}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                          p: 2,
                          backgroundColor: "#f9fafb",
                          borderRadius: 2,
                        }}
                      >
                        {item.icon}
                        <Box>
                          <Typography
                            fontWeight={700}
                            fontSize={13}
                            sx={{ color: "#111827" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography fontSize={12} sx={{ color: "#6b7280" }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Related Products */}
        {related.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#111827", mb: 3 }}
            >
              Related Watches
            </Typography>
            <Grid container spacing={3}>
              {related.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
                  <WatchCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ProductDetail;
