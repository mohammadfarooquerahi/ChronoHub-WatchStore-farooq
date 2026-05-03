import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WatchCard from "./WatchCard";
import { products } from "../../data/products";

function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <Box sx={{ py: 8, backgroundColor: "#f9fafb" }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#111827", fontWeight: "800" }}
            >
              Featured Watches
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
              Handpicked top sellers just for you
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/shop"
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#1d4ed8",
            }}
          >
            View All
          </Button>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {featured.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <WatchCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturedProducts;
