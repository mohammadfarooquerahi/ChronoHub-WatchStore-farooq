import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { setUser } from "../store/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      dispatch(
        setUser({
          user: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
          },
          token: "fake-token-123",
        }),
      );
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            p: { xs: 3, sm: 5 },
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#111827" }}>
              Create Account
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1 }}>
              Join ChronoHub and start shopping
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  sx={{ color: "#374151", mb: 0.8 }}
                >
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  sx={{ color: "#374151", mb: 0.8 }}
                >
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
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
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
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
                  Phone Number
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

              <Grid item xs={12}>
                <Typography
                  fontWeight={600}
                  fontSize={14}
                  sx={{ color: "#374151", mb: 0.8 }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
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
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: 16,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#1d4ed8",
                    "&:hover": { backgroundColor: "#1e40af" },
                    mt: 1,
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography sx={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "#1d4ed8",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Login here
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
