import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Trangchu from "./pages/Trangchu";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminManageProduct from "./pages/AdminManageProduct"; 
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist"; 
import BestSeller from "./pages/BestSeller"; // ✅ thêm BestSeller page

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route private */}
        <Route path="/" element={<PrivateRoute><Trangchu /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Shop /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/manage-products" element={<PrivateRoute><AdminManageProduct /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/bestseller" element={<PrivateRoute><BestSeller /></PrivateRoute>} /> {/* ✅ thêm route mới */}

        {/* Redirect cho các route không tồn tại */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
