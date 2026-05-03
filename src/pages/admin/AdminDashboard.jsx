import { Box, Container, Typography, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import { products } from "../../data/products";

const stats = [
  {
    label: "Total Revenue",
    value: "Rs. 4,85,000",
    change: "+12% this month",
    color: "#eff6ff",
    border: "#bfdbfe",
    textColor: "#1d4ed8",
    icon: <TrendingUpIcon sx={{ color: "#1d4ed8" }} />,
  },
  {
    label: "Total Orders",
    value: "124",
    change: "+8 today",
    color: "#f0fdf4",
    border: "#bbf7d0",
    textColor: "#16a34a",
    icon: <ShoppingCartIcon sx={{ color: "#16a34a" }} />,
  },
  {
    label: "Total Products",
    value: products.length,
    change: "In stock",
    color: "#fefce8",
    border: "#fde68a",
    textColor: "#d97706",
    icon: <InventoryIcon sx={{ color: "#d97706" }} />,
  },
  {
    label: "Total Customers",
    value: "340",
    change: "+23 this week",
    color: "#fdf4ff",
    border: "#e9d5ff",
    textColor: "#9333ea",
    icon: <PeopleIcon sx={{ color: "#9333ea" }} />,
  },
];

const recentOrders = [
  {
    id: "#CHR-10234",
    customer: "Ahmed Ali",
    product: "Apple Watch Series 9",
    amount: "Rs. 45,000",
    status: "Delivered",
  },
  {
    id: "#CHR-10235",
    customer: "Sara Khan",
    product: "Casio G-Shock",
    amount: "Rs. 12,000",
    status: "Processing",
  },
  {
    id: "#CHR-10236",
    customer: "Usman Tariq",
    product: "Samsung Galaxy Watch 6",
    amount: "Rs. 38,000",
    status: "Shipped",
  },
  {
    id: "#CHR-10237",
    customer: "Fatima Malik",
    product: "Seiko Presage",
    amount: "Rs. 35,000",
    status: "Processing",
  },
  {
    id: "#CHR-10238",
    customer: "Bilal Hassan",
    product: "Garmin Forerunner",
    amount: "Rs. 52,000",
    status: "Delivered",
  },
];

const statusColor = {
  Delivered: { bg: "#f0fdf4", color: "#16a34a" },
  Processing: { bg: "#fefce8", color: "#d97706" },
  Shipped: { bg: "#eff6ff", color: "#1d4ed8" },
};

function AdminDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#111827" }}>
          Dashboard
        </Typography>
        <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
          Welcome back! Here is what is happening today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.label}>
            <Box
              sx={{
                backgroundColor: stat.color,
                border: `1px solid ${stat.border}`,
                borderRadius: 3,
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  sx={{ color: "#6b7280" }}
                >
                  {stat.label}
                </Typography>
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: "#111827", mb: 0.5 }}
              >
                {stat.value}
              </Typography>
              <Typography
                fontSize={13}
                fontWeight={600}
                sx={{ color: stat.textColor }}
              >
                {stat.change}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders Table */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* Table Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ color: "#111827" }}>
            Recent Orders
          </Typography>
        </Box>

        {/* Table */}
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb" }}>
                {["Order ID", "Customer", "Product", "Amount", "Status"].map(
                  (col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      i < recentOrders.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1d4ed8",
                    }}
                  >
                    {order.id}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      color: "#111827",
                      fontWeight: 500,
                    }}
                  >
                    {order.customer}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      color: "#6b7280",
                    }}
                  >
                    {order.product}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {order.amount}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        backgroundColor: statusColor[order.status].bg,
                        color: statusColor[order.status].color,
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
