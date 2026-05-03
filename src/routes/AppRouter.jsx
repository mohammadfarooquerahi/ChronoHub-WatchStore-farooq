import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/shop"
        element={
          <Layout>
            <Shop />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductDetail />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminLayout>
            <AdminProducts />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminLayout>
            <AdminOrders />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
