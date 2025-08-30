import { Link } from "react-router-dom";
import api from "../services/api";
import { useState, useEffect } from "react";
import { FaShoePrints, FaShoppingCart, FaFire, FaTags, FaStar } from "react-icons/fa"; 
import "./ProductCard.css";

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  const handleAddToCart = async () => {
    if (!userId || isNaN(userId)) {
      alert("⚠️ Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }

    // ✅ chọn size bất kỳ có tồn tại
    let selectedSize = null;
    if (product.sizes && product.sizes.length > 0) {
      const randomSize = product.sizes[Math.floor(Math.random() * product.sizes.length)];

      // Nếu là object (ví dụ {id: 1, name: "42"}) thì lấy name
      if (typeof randomSize === "object") {
        selectedSize = randomSize.name || randomSize.size || null;
      } else {
        // Nếu chỉ là string (ví dụ "42")
        selectedSize = randomSize;
      }
    }

    if (!selectedSize) {
      alert("❌ Sản phẩm này chưa có size khả dụng!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/cart/${userId}/add`, {
        productId: product.id,
        size: selectedSize,  // ✅ luôn là string
        quantity: 1,
      });

      console.log("🛒 Giỏ hàng sau khi thêm:", res.data);
      alert(`✅ Đã thêm "${product.name}" (size ${selectedSize}) vào giỏ hàng!`);
    } catch (err) {
      console.error("❌ Lỗi khi thêm vào giỏ:", err.response?.data || err);
      alert(err.response?.data?.message || "Có lỗi xảy ra khi thêm sản phẩm vào giỏ.");
    } finally {
      setLoading(false);
    }
  };

  // Badge
  const renderBadge = () => {
    if (product.isHot) return <span className="badge hot"><FaFire /> HOT</span>;
    if (product.isNew) return <span className="badge new"><FaStar /> NEW</span>;
    if (product.discountPercent && product.discountPercent > 0) {
      return <span className="badge sale"><FaTags /> -{product.discountPercent}%</span>;
    }
    return null;
  };

  return (
    <div className="product-card card shadow-sm h-100">
      {/* Ảnh sản phẩm + nhãn */}
      <div className="product-img-wrapper">
        {renderBadge()}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-img"
        />
      </div>

      {/* Nội dung */}
      <div className="card-body d-flex flex-column">
        <h6 className="product-name">{product.name}</h6>

        {/* Giá hiển thị */}
        <div className="price-box">
          {product.discountPercent && product.discountPercent > 0 ? (
            <>
              <span className="old-price">
                {product.price.toLocaleString()} $
              </span>
              <span className="product-price highlight">
                {product.finalPrice.toLocaleString()} $
              </span>
            </>
          ) : (
            <span className="product-price">
              {product.price.toLocaleString()} $
            </span>
          )}
        </div>

        <div className="mt-auto d-flex flex-column gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary w-100"
          >
            <FaShoePrints /> Xem chi tiết
          </Link>
          <button
            className="btn btn-success w-100"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "⏳ Đang thêm..." : <><FaShoppingCart /> Thêm vào giỏ</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
