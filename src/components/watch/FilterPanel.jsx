import {
  Box,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/slices/productSlice";

const brands = [
  "Apple",
  "Samsung",
  "Casio",
  "Rolex",
  "Garmin",
  "Fossil",
  "Seiko",
];
const types = ["smart", "luxury", "sport", "casual"];

function FilterPanel({ onClose }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const handleBrandChange = (brand) => {
    const current = filters.brands || [];
    const updated = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];
    dispatch(setFilters({ brands: updated }));
  };

  const handleTypeChange = (type) => {
    dispatch(setFilters({ type: filters.type === type ? "" : type }));
  };

  const handlePriceChange = (e, value) => {
    dispatch(setFilters({ maxPrice: value }));
  };

  const handleReset = () => {
    dispatch(setFilters({ brands: [], type: "", maxPrice: 300000 }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography fontWeight={700} fontSize={18}>
          Filters
        </Typography>
        <Button
          onClick={handleReset}
          size="small"
          sx={{ textTransform: "none", color: "#ef4444", fontWeight: 600 }}
        >
          Reset All
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={600} fontSize={15} mb={2}>
          Price Range
        </Typography>
        <Slider
          value={filters.maxPrice || 300000}
          min={0}
          max={300000}
          step={1000}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `Rs. ${v.toLocaleString()}`}
          sx={{ color: "#1d4ed8" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            Rs. 0
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            Rs. {(filters.maxPrice || 300000).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Watch Type */}
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={600} fontSize={15} mb={1}>
          Watch Type
        </Typography>
        <RadioGroup value={filters.type || ""}>
          {types.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: "#1d4ed8",
                    "&.Mui-checked": { color: "#1d4ed8" },
                  }}
                  onChange={() => handleTypeChange(type)}
                />
              }
              label={
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {type}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Brand */}
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={600} fontSize={15} mb={1}>
          Brand
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  size="small"
                  checked={(filters.brands || []).includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  sx={{
                    color: "#1d4ed8",
                    "&.Mui-checked": { color: "#1d4ed8" },
                  }}
                />
              }
              label={
                <Typography fontSize="14px" sx={{ color: "#374151" }}>
                  {brand}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>

      {/* Apply Button on Mobile */}
      {onClose && (
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
            mt: 1,
          }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );
}

export default FilterPanel;
