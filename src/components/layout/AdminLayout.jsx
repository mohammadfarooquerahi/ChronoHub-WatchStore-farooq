import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <InventoryIcon fontSize="small" />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBagIcon fontSize="small" />,
  },
];

function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          backgroundColor: "#111827",
          color: "white",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: "1px solid #1f2937" }}>
          <Typography variant="h6" fontWeight={800}>
            Chrono<span style={{ color: "#3b82f6" }}>Hub</span>
          </Typography>
          <Typography fontSize={12} sx={{ color: "#6b7280", mt: 0.5 }}>
            Admin Panel
          </Typography>
        </Box>

        {/* Nav Links */}
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography
            fontSize={11}
            fontWeight={600}
            sx={{
              color: "#6b7280",
              letterSpacing: 1,
              textTransform: "uppercase",
              px: 1,
              mb: 1,
            }}
          >
            Main Menu
          </Typography>
          {adminLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              fullWidth
              startIcon={link.icon}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: 600,
                fontSize: 14,
                py: 1.2,
                px: 2,
                mb: 0.5,
                borderRadius: 2,
                color: location.pathname === link.path ? "white" : "#9ca3af",
                backgroundColor:
                  location.pathname === link.path ? "#1d4ed8" : "transparent",
                "&:hover": {
                  backgroundColor:
                    location.pathname === link.path ? "#1e40af" : "#1f2937",
                  color: "white",
                },
              }}
            >
              {link.label}
            </Button>
          ))}

          <Divider sx={{ borderColor: "#1f2937", my: 2 }} />

          <Button
            component={Link}
            to="/"
            fullWidth
            startIcon={<HomeIcon fontSize="small" />}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
              py: 1.2,
              px: 2,
              borderRadius: 2,
              color: "#9ca3af",
              "&:hover": { backgroundColor: "#1f2937", color: "white" },
            }}
          >
            Back to Store
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
    </Box>
  );
}

export default AdminLayout;
