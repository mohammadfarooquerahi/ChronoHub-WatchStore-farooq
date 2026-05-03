import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  Drawer,
  Chip,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import WatchCard from "../components/watch/WatchCard";
import FilterPanel from "../components/watch/FilterPanel";
import { products } from "../data/products";
import {
  setProducts,
  setSortBy,
  setFilters,
} from "../store/slices/productSlice";

function Shop() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { filters, sortBy } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.ui.searchQuery);

  // Load products into redux on mount
  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch]);

  // Read type from URL query
  useEffect(() => {
    const type = searchParams.get("type") || "";
    dispatch(setFilters({ type }));
  }, [searchParams, dispatch]);

  // Filter logic
  let filtered = [...products];

  if (filters.type) {
    filtered = filtered.filter((p) => p.type === filters.type);
  }

  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter((p) => filters.brands.includes(p.brand));
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // Sort logic
  if (sortBy === "price_low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    filtered.sort((a, b) => b.id - a.id);
  }

  const activeFiltersCount =
    (filters.type ? 1 : 0) + (filters.brands?.length || 0);

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#111827", fontWeight: "800" }}
          >
            All Watches
          </Typography>
          <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
            {filtered.length} products found
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Sidebar Filter — desktop only */}
          <Box
            sx={{
              width: 260,
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              backgroundColor: "white",
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              height: "fit-content",
              position: "sticky",
              top: 80,
            }}
          >
            <FilterPanel />
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Toolbar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
                backgroundColor: "white",
                p: 2,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              {/* Left: Filter button (mobile) + Active filters */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={() => setMobileFilterOpen(true)}
                  startIcon={<TuneIcon />}
                  variant="outlined"
                  size="small"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#e5e7eb",
                    color: "#374151",
                  }}
                >
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>

                {filters.type && (
                  <Chip
                    label={filters.type}
                    onDelete={() => dispatch(setFilters({ type: "" }))}
                    size="small"
                    sx={{
                      backgroundColor: "#eff6ff",
                      color: "#1d4ed8",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  />
                )}

                {filters.brands?.map((brand) => (
                  <Chip
                    key={brand}
                    label={brand}
                    onDelete={() => {
                      const updated = filters.brands.filter((b) => b !== brand);
                      dispatch(setFilters({ brands: updated }));
                    }}
                    size="small"
                    sx={{
                      backgroundColor: "#eff6ff",
                      color: "#1d4ed8",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>

              {/* Right: Sort */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FilterListIcon sx={{ color: "#6b7280", fontSize: 20 }} />
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel sx={{ fontSize: 14 }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    sx={{ fontSize: 14 }}
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Top Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Products Grid */}
            {filtered.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 10,
                  backgroundColor: "white",
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                }}
              >
                <Typography fontSize={40}>⌚</Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  mt={2}
                  sx={{ color: "#111827" }}
                >
                  No watches found
                </Typography>
                <Typography sx={{ color: "#6b7280", mt: 1 }}>
                  Try changing your filters or search query
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filtered.map((product) => (
                  <Grid item xs={12} sm={6} lg={4} key={product.id}>
                    <WatchCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      >
        <Box sx={{ width: 280 }}>
          <FilterPanel onClose={() => setMobileFilterOpen(false)} />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Shop;
