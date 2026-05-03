import { useState } from "react";
import { Box, Typography, Chip, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const orders = [
  {
    id: "#CHR-10234",
    customer: "Ahmed Ali",
    phone: "0300-1234567",
    product: "Apple Watch Series 9",
    amount: 45000,
    status: "Delivered",
    date: "2 May 2026",
    payment: "COD",
  },
  {
    id: "#CHR-10235",
    customer: "Sara Khan",
    phone: "0311-9876543",
    product: "Casio G-Shock GA-2100",
    amount: 12000,
    status: "Processing",
    date: "2 May 2026",
    payment: "JazzCash",
  },
  {
    id: "#CHR-10236",
    customer: "Usman Tariq",
    phone: "0321-4567890",
    product: "Samsung Galaxy Watch 6",
    amount: 38000,
    status: "Shipped",
    date: "1 May 2026",
    payment: "EasyPaisa",
  },
  {
    id: "#CHR-10237",
    customer: "Fatima Malik",
    phone: "0333-7654321",
    product: "Seiko Presage",
    amount: 35000,
    status: "Processing",
    date: "1 May 2026",
    payment: "COD",
  },
  {
    id: "#CHR-10238",
    customer: "Bilal Hassan",
    phone: "0345-2345678",
    product: "Garmin Forerunner 255",
    amount: 52000,
    status: "Delivered",
    date: "30 Apr 2026",
    payment: "Card",
  },
  {
    id: "#CHR-10239",
    customer: "Ayesha Noor",
    phone: "0301-8765432",
    product: "Fossil Gen 6",
    amount: 28000,
    status: "Cancelled",
    date: "30 Apr 2026",
    payment: "COD",
  },
];

const statusConfig = {
  Delivered: { bg: "#f0fdf4", color: "#16a34a" },
  Processing: { bg: "#fefce8", color: "#d97706" },
  Shipped: { bg: "#eff6ff", color: "#1d4ed8" },
  Cancelled: { bg: "#fef2f2", color: "#ef4444" },
};

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#111827" }}>
          Orders
        </Typography>
        <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
          {orders.length} total orders
        </Typography>
      </Box>

      {/* Filters Row */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          p: 3,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flex: 1,
            minWidth: 200,
          }}
        >
          <SearchIcon sx={{ color: "#9ca3af" }} />
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search by customer or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
        </Box>

        {/* Status Filter Buttons */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {statuses.map((status) => (
            <Button
              key={status}
              onClick={() => setStatusFilter(status)}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                fontSize: 13,
                backgroundColor:
                  statusFilter === status ? "#1d4ed8" : "#f3f4f6",
                color: statusFilter === status ? "white" : "#374151",
                "&:hover": {
                  backgroundColor:
                    statusFilter === status ? "#1e40af" : "#e5e7eb",
                },
              }}
            >
              {status}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Orders Table */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb" }}>
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Amount",
                  "Payment",
                  "Date",
                  "Status",
                ].map((col) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1d4ed8",
                    }}
                  >
                    {order.id}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      sx={{ color: "#111827" }}
                    >
                      {order.customer}
                    </Typography>
                    <Typography fontSize={12} sx={{ color: "#9ca3af" }}>
                      {order.phone}
                    </Typography>
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
                    Rs. {order.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <Chip
                      label={order.payment}
                      size="small"
                      sx={{
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 13,
                      color: "#6b7280",
                    }}
                  >
                    {order.date}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        backgroundColor: statusConfig[order.status].bg,
                        color: statusConfig[order.status].color,
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography sx={{ color: "#6b7280" }}>No orders found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AdminOrders;
