import { Box, Typography, Button, Rating, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../store/slices/cartSlice";

function WatchCard({ product }) {
  const dispatch = useDispatch();

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />

        {/* Badge */}
        <Chip
          label={product.badge}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#1d4ed8",
            color: "white",
            fontWeight: 700,
            fontSize: "11px",
          }}
        />

        {/* Discount */}
        <Chip
          label={`-${discount}%`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: 700,
            fontSize: "11px",
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        {/* Brand */}
        <Typography
          variant="caption"
          sx={{
            color: "#6b7280",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {product.brand}
        </Typography>

        {/* Name */}
        <Typography
          component={Link}
          to={`/product/${product.id}`}
          variant="h6"
          fontWeight={700}
          sx={{
            display: "block",
            color: "#111827",
            textDecoration: "none",
            fontSize: "16px",
            mt: 0.5,
            mb: 1,
            "&:hover": { color: "#1d4ed8" },
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            ({product.reviews})
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Typography
            fontWeight={800}
            fontSize="20px"
            sx={{ color: "#111827" }}
          >
            Rs. {product.price.toLocaleString()}
          </Typography>
          <Typography
            sx={{
              color: "#9ca3af",
              textDecoration: "line-through",
              fontSize: "14px",
            }}
          >
            Rs. {product.originalPrice.toLocaleString()}
          </Typography>
        </Box>

        {/* Add to Cart Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={() => dispatch(addToCart(product))}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
            backgroundColor: "#1d4ed8",
            "&:hover": { backgroundColor: "#1e40af" },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}

export default WatchCard;
