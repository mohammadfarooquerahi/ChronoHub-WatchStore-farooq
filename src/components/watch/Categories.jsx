import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { categories } from "../../data/products";

function Categories() {
  return (
    <Box sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={1}
          sx={{ color: "#111827", fontWeight: "800" }}
        >
          Shop by Category
        </Typography>
        <Typography textAlign="center" sx={{ color: "#6b7280", mb: 5 }}>
          Find the perfect watch for every occasion
        </Typography>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={6} md={3} key={cat.type}>
              <Box
                component={Link}
                to={`/shop?type=${cat.type}`}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  backgroundColor: cat.color,
                  border: `2px solid ${cat.border}`,
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography fontSize="40px" mb={1}>
                  {cat.icon}
                </Typography>
                <Typography
                  fontWeight={700}
                  fontSize="16px"
                  sx={{ color: "#111827" }}
                >
                  {cat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Categories;
