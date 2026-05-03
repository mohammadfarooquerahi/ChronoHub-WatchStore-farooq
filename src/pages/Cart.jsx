import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  removeFromCart,
  addToCart,
  clearCart,
} from "../store/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography fontSize={80}>🛒</Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            mt={2}
            sx={{ color: "#111827" }}
          >
            Your cart is empty
          </Typography>
          <Typography sx={{ color: "#6b7280", mt: 1, mb: 4 }}>
            Looks like you have not added any watches yet
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            Start Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ color: "#111827" }}>
              Shopping Cart
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
              {items.length} item(s) in your cart
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/shop"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: "none", color: "#6b7280", fontWeight: 600 }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              {items.map((item, index) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      p: 3,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 150 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6b7280",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.brand}
                      </Typography>
                      <Typography
                        fontWeight={700}
                        fontSize={16}
                        sx={{ color: "#111827", mt: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        fontWeight={700}
                        sx={{ color: "#1d4ed8", mt: 1 }}
                      >
                        Rs. {item.price.toLocaleString()}
                      </Typography>
                    </Box>

                    {/* Qty Controls */}
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
                        onClick={() => dispatch(removeFromCart(item.id))}
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
                          px: 2,
                          fontWeight: 700,
                          borderLeft: "1px solid #e5e7eb",
                          borderRight: "1px solid #e5e7eb",
                        }}
                      >
                        {item.qty}
                      </Typography>
                      <Button
                        onClick={() => dispatch(addToCart(item))}
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

                    {/* Item Total */}
                    <Typography
                      fontWeight={800}
                      fontSize={16}
                      sx={{ minWidth: 120, textAlign: "right" }}
                    >
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </Typography>

                    {/* Delete */}
                    <Button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{ minWidth: "auto", color: "#ef4444", p: 1 }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                  {index < items.length - 1 && <Divider />}
                </Box>
              ))}

              {/* Clear Cart */}
              <Box
                sx={{
                  p: 3,
                  borderTop: "1px solid #e5e7eb",
                  textAlign: "right",
                }}
              >
                <Button
                  onClick={() => dispatch(clearCart())}
                  sx={{
                    textTransform: "none",
                    color: "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  Clear Cart
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                p: 3,
                position: "sticky",
                top: 80,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
                sx={{ color: "#111827" }}
              >
                Order Summary
              </Typography>

              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography fontSize={14} sx={{ color: "#6b7280" }}>
                    {item.name} x{item.qty}
                  </Typography>
                  <Typography fontSize={14} fontWeight={600}>
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Subtotal</Typography>
                <Typography fontWeight={600}>
                  Rs. {totalPrice.toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Delivery</Typography>
                <Typography fontWeight={600} sx={{ color: "#16a34a" }}>
                  Free
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#6b7280" }}>Tax (0%)</Typography>
                <Typography fontWeight={600}>Rs. 0</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography fontWeight={700} fontSize={18}>
                  Total
                </Typography>
                <Typography
                  fontWeight={800}
                  fontSize={20}
                  sx={{ color: "#1d4ed8" }}
                >
                  Rs. {totalPrice.toLocaleString()}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/checkout"
                size="large"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: 16,
                  backgroundColor: "#1d4ed8",
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}
              >
                {[
                  "✅ 100% Secure Checkout",
                  "🚚 Free Delivery Across Pakistan",
                  "↩️ 7 Day Easy Returns",
                ].map((badge) => (
                  <Typography
                    key={badge}
                    fontSize={13}
                    sx={{ color: "#6b7280" }}
                  >
                    {badge}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cart;
