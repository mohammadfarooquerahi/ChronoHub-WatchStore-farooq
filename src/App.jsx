import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store/index";
import AppRouter from "./routes/AppRouter";

const theme = createTheme({
  palette: {
    primary: { main: "#1d4ed8" },
    secondary: { main: "#f59e0b" },
    background: { default: "#f9fafb" },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
