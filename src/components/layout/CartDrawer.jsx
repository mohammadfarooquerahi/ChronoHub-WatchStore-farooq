import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toggleCart } from "../../store/slices/uiSlice";
import { removeFromCart, addToCart } from "../../store/slices/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.ui.cartOpen);
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => dispatch(toggleCart())}
    >
      <Box
        sx={{
          width: { xs: "100vw", sm: 420 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingCartIcon sx={{ color: "#1d4ed8" }} />
            <Typography variant="h6" fontWeight={700}>
              Your Cart
            </Typography>
            <Typography
              sx={{
                backgroundColor: "#1d4ed8",
                color: "white",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {items.length}
            </Typography>
          </Box>
          <Button
            onClick={() => dispatch(toggleCart())}
            sx={{ minWidth: "auto", color: "#6b7280" }}
          >
            <CloseIcon />
          </Button>
        </Box>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography fontSize={60}>🛒</Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                mt={2}
                sx={{ color: "#111827" }}
              >
                Your cart is empty
              </Typography>
              <Typography sx={{ color: "#6b7280", mt: 1, mb: 3 }}>
                Add some watches to get started
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/shop"
                onClick={() => dispatch(toggleCart())}
                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
              >
                Shop Now
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    backgroundColor: "#f9fafb",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  {/* Info */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontWeight={700}
                      fontSize={14}
                      sx={{ color: "#111827" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography fontSize={12} sx={{ color: "#6b7280", mb: 1 }}>
                      {item.brand}
                    </Typography>
                    <Typography fontWeight={700} sx={{ color: "#1d4ed8" }}>
                      Rs. {item.price.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Qty + Delete */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{ color: "#ef4444" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    {/* Qty Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e5e7eb",
                        borderRadius: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                      }}
                    >
                      <Button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{
                          minWidth: 28,
                          height: 28,
                          p: 0,
                          color: "#374151",
                          borderRadius: 0,
                          fontSize: 16,
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{
                          px: 1.5,
                          fontSize: 13,
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
                          minWidth: 28,
                          height: 28,
                          p: 0,
                          color: "#374151",
                          borderRadius: 0,
                          fontSize: 16,
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ color: "#6b7280" }}>Subtotal</Typography>
              <Typography fontWeight={600}>
                Rs. {totalPrice.toLocaleString()}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ color: "#6b7280" }}>Delivery</Typography>
              <Typography fontWeight={600} sx={{ color: "#16a34a" }}>
                Free
              </Typography>
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
                fontSize={18}
                sx={{ color: "#1d4ed8" }}
              >
                Rs. {totalPrice.toLocaleString()}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/cart"
              onClick={() => dispatch(toggleCart())}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                py: 1.5,
                borderRadius: 2,
                fontSize: 16,
                mb: 1.5,
                backgroundColor: "#1d4ed8",
                "&:hover": { backgroundColor: "#1e40af" },
              }}
            >
              Proceed to Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => dispatch(toggleCart())}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
                borderColor: "#e5e7eb",
                color: "#374151",
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
