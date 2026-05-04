import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { toggleCart, setSearch } from "../../store/slices/uiSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const totalQty = useSelector((state) => state.cart.totalQty);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchVal));
    navigate("/shop");
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Smart Watches", path: "/shop?type=smart" },
    { label: "Luxury", path: "/shop?type=luxury" },
    { label: "Sport", path: "/shop?type=sport" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ backgroundColor: "white", color: "#111827" }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ height: 64, gap: 2 }}>
            {/* Logo */}
            <Typography
              component={Link}
              to="/"
              variant="h6"
              fontWeight={800}
              sx={{
                color: "#111827",
                textDecoration: "none",
                mr: 3,
                fontWeight: "700",
              }}
            >
              Chrono<span style={{ color: "#1d4ed8" }}>Hub</span>
            </Typography>

            {/* Nav Links — hidden on mobile */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color:
                      location.pathname === link.path ? "#1d4ed8" : "#6b7280",
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                      color: "#1d4ed8",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Push everything to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Search Box — hidden on mobile */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="Search watches..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                sx={{ width: 320 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  minWidth: "auto",
                  px: 2,
                  py: 1.4,
                }}
              >
                <SearchIcon fontSize="small" />
              </Button>
            </Box>

            {/* Cart Button */}
            <Badge badgeContent={totalQty} color="warning">
              <Button
                variant="contained"
                onClick={() => dispatch(toggleCart())}
                startIcon={<ShoppingCartIcon />}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Cart
              </Button>
            </Badge>

            {/* Login Button */}
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                display: { xs: "none", md: "flex" },
                borderColor: "#d1d5db",
                color: "#374151",
                "&:hover": {
                  borderColor: "#1d4ed8",
                  color: "#1d4ed8",
                },
              }}
            >
              Login
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                minWidth: "auto",
                color: "#374151",
              }}
            >
              <MenuIcon />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 280, p: 3 }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Menu
            </Typography>
            <Button
              onClick={() => setMobileOpen(false)}
              sx={{ minWidth: "auto", color: "#374151" }}
            >
              <CloseIcon />
            </Button>
          </Box>

          {/* Mobile Search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ mb: 3, display: "flex", gap: 1 }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search watches..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: "auto", px: 2 }}
            >
              <SearchIcon fontSize="small" />
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Mobile Nav Links */}
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding sx={{ mb: 1 }}>
                <Button
                  component={Link}
                  to={link.path}
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "15px",
                    color:
                      location.pathname === link.path ? "#1d4ed8" : "#374151",
                    backgroundColor:
                      location.pathname === link.path
                        ? "#eff6ff"
                        : "transparent",
                    "&:hover": { backgroundColor: "#f3f4f6" },
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                  }}
                >
                  {link.label}
                </Button>
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            <ListItem disablePadding>
              <Button
                component={Link}
                to="/login"
                fullWidth
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#374151",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,
                }}
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
