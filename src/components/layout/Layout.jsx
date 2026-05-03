import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
