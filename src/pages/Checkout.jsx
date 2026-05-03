import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { clearCart } from "../store/slices/cartSlice";

const steps = ["Delivery Info", "Payment", "Confirmation"];

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleDeliveryNext = (e) => {
    e.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    setActiveStep(1);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(clearCart());
      setLoading(false);
      setActiveStep(2);
    }, 1500);
  };

  // Empty cart check
  if (items.length === 0 && activeStep !== 2) {
    navigate("/shop");
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: "#111827", mb: 1 }}
        >
          Checkout
        </Typography>
        <Typography sx={{ color: "#6b7280", mb: 4 }}>
          Complete your order
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1 — Delivery Info */}
        {activeStep === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                component="form"
                onSubmit={handleDeliveryNext}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  p: { xs: 3, md: 4 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <LocalShippingIcon sx={{ color: "#1d4ed8" }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#111827" }}
                  >
                    Delivery Information
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      First Name *
                    </Typography>
                    <TextField
                      fullWidth
                      name="firstName"
                      placeholder="Farooq"
                      value={form.firstName}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      Last Name *
                    </Typography>
                    <TextField
                      fullWidth
                      name="lastName"
                      placeholder="Rahi"
                      value={form.lastName}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="farooqrahi828@.com"
                      value={form.email}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      Phone Number *
                    </Typography>
                    <TextField
                      fullWidth
                      name="phone"
                      placeholder="03XX-XXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      City *
                    </Typography>
                    <TextField
                      fullWidth
                      name="city"
                      placeholder="Karachi"
                      value={form.city}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      Full Address *
                    </Typography>
                    <TextField
                      fullWidth
                      name="address"
                      placeholder="Street address, house number, area"
                      value={form.address}
                      onChange={handleChange}
                      size="small"
                      multiline
                      rows={2}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      sx={{ color: "#374151", mb: 0.8 }}
                    >
                      Province
                    </Typography>
                    <TextField
                      fullWidth
                      name="province"
                      placeholder="Sindh"
                      value={form.province}
                      onChange={handleChange}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: 16,
                        py: 2,
                        borderRadius: 1,
                        backgroundColor: "#1d4ed8",
                        "&:hover": { backgroundColor: "#1e40af" },
                        mt: 1,
                      }}
                    >
                      Continue to Payment
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <OrderSummary items={items} totalPrice={totalPrice} />
            </Grid>
          </Grid>
        )}

        {/* Step 2 — Payment */}
        {activeStep === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  p: { xs: 3, md: 4 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <PaymentIcon sx={{ color: "#1d4ed8" }} />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#111827" }}
                  >
                    Payment Method
                  </Typography>
                </Box>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {[
                    {
                      value: "cod",
                      label: "Cash on Delivery",
                      desc: "Pay when your order arrives",
                      icon: "💵",
                    },
                    {
                      value: "jazzcash",
                      label: "JazzCash",
                      desc: "Pay via JazzCash mobile wallet",
                      icon: "📱",
                    },
                    {
                      value: "easypaisa",
                      label: "EasyPaisa",
                      desc: "Pay via EasyPaisa mobile wallet",
                      icon: "💚",
                    },
                    {
                      value: "card",
                      label: "Credit / Debit Card",
                      desc: "Visa, Mastercard accepted",
                      icon: "💳",
                    },
                  ].map((method) => (
                    <Box
                      key={method.value}
                      sx={{
                        border:
                          paymentMethod === method.value
                            ? "2px solid #1d4ed8"
                            : "1.5px solid #e5e7eb",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                        cursor: "pointer",
                        backgroundColor:
                          paymentMethod === method.value ? "#eff6ff" : "white",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setPaymentMethod(method.value)}
                    >
                      <FormControlLabel
                        value={method.value}
                        control={
                          <Radio
                            sx={{
                              color: "#1d4ed8",
                              "&.Mui-checked": { color: "#1d4ed8" },
                            }}
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Typography fontSize={24}>{method.icon}</Typography>
                            <Box>
                              <Typography
                                fontWeight={700}
                                fontSize={15}
                                sx={{ color: "#111827" }}
                              >
                                {method.label}
                              </Typography>
                              <Typography
                                fontSize={13}
                                sx={{ color: "#6b7280" }}
                              >
                                {method.desc}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ m: 0, width: "100%" }}
                      />
                    </Box>
                  ))}
                </RadioGroup>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setActiveStep(0)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: "#e5e7eb",
                      color: "#374151",
                      flex: 1,
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: 16,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: "#1d4ed8",
                      "&:hover": { backgroundColor: "#1e40af" },
                      flex: 2,
                    }}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <OrderSummary items={items} totalPrice={totalPrice} />
            </Grid>
          </Grid>
        )}

        {/* Step 3 — Confirmation */}
        {activeStep === 2 && (
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              p: { xs: 4, md: 8 },
              textAlign: "center",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#16a34a", mb: 2 }} />

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#111827", mb: 1 }}
            >
              Order Placed!
            </Typography>

            <Typography sx={{ color: "#6b7280", fontSize: 16, mb: 4 }}>
              Thank you for shopping with ChronoHub. Your order has been placed
              successfully and will be delivered within 3-5 business days.
            </Typography>

            <Box
              sx={{
                backgroundColor: "#f0fdf4",
                borderRadius: 2,
                p: 3,
                mb: 4,
                border: "1px solid #bbf7d0",
              }}
            >
              <Typography fontWeight={600} sx={{ color: "#16a34a" }}>
                Order ID: #CHR-{Math.floor(Math.random() * 90000) + 10000}
              </Typography>
              <Typography fontSize={14} sx={{ color: "#6b7280", mt: 0.5 }}>
                You will receive a confirmation SMS shortly
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/shop")}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#1d4ed8",
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: "#e5e7eb",
                  color: "#374151",
                }}
              >
                Go to Home
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

// Reusable Order Summary Component
function OrderSummary({ items, totalPrice }) {
  return (
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 56,
                height: 56,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                fontWeight={600}
                fontSize={13}
                sx={{ color: "#111827" }}
              >
                {item.name}
              </Typography>
              <Typography fontSize={12} sx={{ color: "#6b7280" }}>
                Qty: {item.qty}
              </Typography>
            </Box>
            <Typography fontWeight={700} fontSize={13}>
              Rs. {(item.price * item.qty).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Typography sx={{ color: "#6b7280" }}>Subtotal</Typography>
        <Typography fontWeight={600}>
          Rs. {totalPrice.toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Typography sx={{ color: "#6b7280" }}>Delivery</Typography>
        <Typography fontWeight={600} sx={{ color: "#16a34a" }}>
          Free
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={700} fontSize={18}>
          Total
        </Typography>
        <Typography fontWeight={800} fontSize={18} sx={{ color: "#1d4ed8" }}>
          Rs. {totalPrice.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Checkout;
