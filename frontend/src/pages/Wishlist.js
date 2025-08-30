import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/favorites/${userId}`)
      .then(res => res.json())
      .then(data => {
        // Transform API data to match our UI requirements
        const transformedItems = data.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          originalPrice: item.product.price, // Assuming original price is same if no discount
          image: item.product.imageUrl,
          brand: item.product.category.name,
          inStock: item.product.inStock,
          description: item.product.description,
          quantity: item.product.quantity,
          rating: 4.5, // Default rating if not provided by API
        }));
        setWishlistItems(transformedItems);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
        alert('Có lỗi khi tải danh sách yêu thích!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const removeFromWishlist = (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    fetch(`http://localhost:8080/api/favorites/${userId}/${productId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 204 || res.ok) {
          setWishlistItems(prev => prev.filter(item => item.id !== productId));
          alert('Đã xóa sản phẩm khỏi danh sách yêu thích!');
        } else {
          throw new Error('Không thể xóa sản phẩm');
        }
      })
      .catch(error => {
        console.error('Error removing from wishlist:', error);
        alert('Có lỗi khi xóa sản phẩm khỏi danh sách yêu thích!');
      });
  };

  const addToCart = (item) => {
    // TODO: Call API to add item to cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('storage')); // Update cart badge
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  if (loading) {
    return (
      <div className="wishlist-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>Sản Phẩm Yêu Thích</h1>
        <p className="text-muted">
          {wishlistItems.length} sản phẩm trong danh sách yêu thích
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <i className="fas fa-heart-broken"></i>
          <h3>Danh sách yêu thích trống</h3>
          <p>Hãy thêm những sản phẩm bạn yêu thích vào đây</p>
          <Link to="/products" className="btn btn-primary">
            <i className="fas fa-shopping-bag"></i> Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {!item.inStock && (
                  <div className="out-of-stock">
                    Hết hàng
                  </div>
                )}
                {item.discount > 0 && (
                  <div className="discount-badge">
                    -{item.discount}%
                  </div>
                )}
                <button
                  className="remove-button"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="item-info">
                <Link to={`/products/${item.id}`} className="item-name">
                  {item.name}
                </Link>
                <div className="item-brand">{item.brand}</div>
                
                <div className="item-rating">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${
                        index < Math.floor(item.rating) ? 'filled' : ''
                      }`}
                    ></i>
                  ))}
                  <span>({item.rating})</span>
                </div>

                <div className="item-price">
                  {item.discount > 0 && (
                    <span className="original-price">
                      {item.originalPrice.toLocaleString()}₫
                    </span>
                  )}
                  <span className="current-price">
                    {item.price.toLocaleString()}₫
                  </span>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                >
                  <i className="fas fa-shopping-cart"></i>
                  {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
