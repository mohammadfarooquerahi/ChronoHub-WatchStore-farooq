import { useState } from "react";
import { Box, Typography, Button, TextField, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { products as initialProducts } from "../../data/products";

function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
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
            Products
          </Typography>
          <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
            {products.length} total products
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1.2,
            backgroundColor: "#1d4ed8",
            "&:hover": { backgroundColor: "#1e40af" },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Search */}
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
        }}
      >
        <SearchIcon sx={{ color: "#9ca3af" }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search products by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ fontSize: 14 }}
        />
      </Box>

      {/* Products Table */}
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
                {["Product", "Brand", "Type", "Price", "Stock", "Actions"].map(
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
              {filtered.map((product, i) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  {/* Product */}
                  <td style={{ padding: "16px 20px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <Typography
                        fontSize={14}
                        fontWeight={600}
                        sx={{ color: "#111827" }}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </td>

                  {/* Brand */}
                  <td style={{ padding: "16px 20px" }}>
                    <Typography fontSize={14} sx={{ color: "#6b7280" }}>
                      {product.brand}
                    </Typography>
                  </td>

                  {/* Type */}
                  <td style={{ padding: "16px 20px" }}>
                    <Chip
                      label={product.type}
                      size="small"
                      sx={{
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        fontSize: 12,
                      }}
                    />
                  </td>

                  {/* Price */}
                  <td style={{ padding: "16px 20px" }}>
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      sx={{ color: "#111827" }}
                    >
                      Rs. {product.price.toLocaleString()}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{ color: "#9ca3af", textDecoration: "line-through" }}
                    >
                      Rs. {product.originalPrice.toLocaleString()}
                    </Typography>
                  </td>

                  {/* Stock */}
                  <td style={{ padding: "16px 20px" }}>
                    <Chip
                      label={product.inStock ? "In Stock" : "Out of Stock"}
                      size="small"
                      sx={{
                        backgroundColor: product.inStock
                          ? "#f0fdf4"
                          : "#fef2f2",
                        color: product.inStock ? "#16a34a" : "#ef4444",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "16px 20px" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<EditIcon fontSize="small" />}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          color: "#1d4ed8",
                          backgroundColor: "#eff6ff",
                          "&:hover": { backgroundColor: "#dbeafe" },
                          borderRadius: 1.5,
                          px: 1.5,
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon fontSize="small" />}
                        onClick={() => handleDelete(product.id)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          color: "#ef4444",
                          backgroundColor: "#fef2f2",
                          "&:hover": { backgroundColor: "#fee2e2" },
                          borderRadius: 1.5,
                          px: 1.5,
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
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

export default AdminProducts;
