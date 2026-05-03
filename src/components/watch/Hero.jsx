import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Hero() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            margin: "20px 120px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Content */}
          <Box sx={{ maxWidth: 560 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#93c5fd",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: 2,
              }}
            >
              Pakistan's Best Watch Store
            </Typography>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                fontSize: { xs: "36px", md: "52px" },
                lineHeight: 1.15,
                mt: 1,
                mb: 2,
              }}
            >
              Find Your
              <br />
              Perfect Watch
              <br />
              <span style={{ color: "#fbbf24", fontWeight: "800" }}>
                At Best Price
              </span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#bfdbfe",
                fontSize: "16px",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Explore 500+ watches from top brands like Apple, Samsung, Casio,
              Rolex and more. Smart, Luxury, Sport - all at affordable prices
              with free delivery across Pakistan.
            </Typography>

            <Stack direction="row" gap={2} flexWrap="wrap">
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: "#fbbf24",
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: "15px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 1,
                  marginRight: 2,
                  "&:hover": {
                    backgroundColor: "#f59e0b",
                  },
                }}
              >
                Shop Now
              </Button>

              <Button
                component={Link}
                to="/shop?type=smart"
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "15px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": {
                    borderColor: "#bfdbfe",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Smart Watches
              </Button>
            </Stack>

            {/* Stats */}
            <Stack
              direction="row"
              gap={4}
              mt={5}
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "30px",
              }}
            >
              {[
                { value: "500+", label: "Products" },
                { value: "20+", label: "Brands" },
                { value: "10k+", label: "Happy Customers" },
              ].map((stat) => (
                <Box key={stat.label}>
                  <Typography fontWeight={800} fontSize="24px">
                    {stat.value}
                  </Typography>
                  <Typography fontSize="13px" sx={{ color: "#93c5fd" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right Image */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 400,
                height: 400,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"
                alt="Featured Watch"
                style={{
                  width: "320px",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "6px solid rgba(255,255,255,0.2)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
