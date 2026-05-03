import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { setUser } from "../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(
        setUser({
          user: { name: "John Doe", email: form.email },
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
        {/* Card */}
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
              Welcome Back
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1 }}>
              Login to your ChronoHub account
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
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
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.8,
                  }}
                >
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                    sx={{ color: "#374151" }}
                  >
                    Password
                  </Typography>
                  <Typography
                    component={Link}
                    to="/forgot-password"
                    fontSize={14}
                    sx={{
                      color: "#1d4ed8",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>

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
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography fontSize={13} sx={{ color: "#9ca3af" }}>
              OR
            </Typography>
          </Divider>

          {/* Register Link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#6b7280" }}>
              Don't have an account?{" "}
              <Typography
                component={Link}
                to="/register"
                sx={{
                  color: "#1d4ed8",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create one free
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
