import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Lấy username và giỏ hàng khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartItemCount(totalQuantity);
  }, []);

  // Lắng nghe storage event để cập nhật realtime
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("username");
      setUsername(storedUser);

      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartItemCount(totalQuantity);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Lắng nghe scroll để thay đổi style navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <i className="fas fa-shoe-prints"></i>
            </div>
            <div className="logo-text">
              <span className="logo-main">SHOES</span>
              <span className="logo-sub">STORE</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            <span>Trang chủ</span>
          </Link>
          
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>
            <span>Cửa hàng</span>
          </Link>
          
          <Link to="/wishlist" className="nav-link" onClick={() => setIsOpen(false)}>
            <span>Yêu thích</span>
          </Link>
          
          <Link to="/sale" className="nav-link sale-link" onClick={() => setIsOpen(false)}>
            <span>Khuyến mãi</span>
          </Link>

          <Link to="/bestseller" className="nav-link bestseller-link" onClick={() => setIsOpen(false)}>
              <i className="fas fa-fire"></i>
              <span>Best Seller</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
            <div className="cart-icon-wrapper">
              <i className="fas fa-shopping-bag"></i>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
            <span>Giỏ hàng</span>
          </Link>

          {/* User Menu */}
          {!username ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login" onClick={() => setIsOpen(false)}>
                <span>Đăng nhập</span>
              </Link>
              <Link to="/register" className="btn-register" onClick={() => setIsOpen(false)}>
                <span>Đăng ký</span>
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <div className="user-info">
                <i className="fas fa-user"></i>
                <span className="username">{username}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                  <i className="fas fa-user"></i>
                  <span>Hồ sơ cá nhân</span>
                </Link>
                <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
                  <i className="fas fa-shopping-bag"></i>
                  <span>Lịch sử đơn hàng</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}

          {/* Admin / Shop Manage Link */}
          <Link to="/admin" className="nav-link admin-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-cog"></i>
              <span>Shop Manage</span>
          </Link>

        </div>

        {/* Mobile Toggle */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
