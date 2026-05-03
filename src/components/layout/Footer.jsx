import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
