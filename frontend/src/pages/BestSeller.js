import React, { useEffect, useState } from "react";
import "./bestseller.css";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        // gọi API top-selling
        const res = await fetch(
          `http://localhost:8080/admin/statistics/products/top-selling?limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const topData = await res.json();

        // lấy chi tiết từng sản phẩm
        const detailedProducts = await Promise.all(
          topData.map(async (item) => {
            const detailRes = await fetch(`http://localhost:8080/products/${item.productId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const detailData = await detailRes.json();
            return { ...item, ...detailData.result }; // gộp dữ liệu
          })
        );

        setProducts(detailedProducts);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [limit]);

  if (loading) {
    return (
      <div className="bestseller-loading">
        <div className="spinner"></div>
        <p>Đang tải sản phẩm bán chạy...</p>
      </div>
    );
  }

  return (
    <div className="bestseller-container">
      <h2 className="bestseller-title">🔥 Sản phẩm bán chạy</h2>

      {/* Bộ chọn số lượng sản phẩm */}
      <div className="limit-selector">
        <label htmlFor="limit">Hiển thị: </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} sản phẩm
            </option>
          ))}
        </select>
      </div>

      <div className="bestseller-list">
        {products.map((p, index) => (
          <div key={p.id} className="bestseller-card">
            <div className="bestseller-rank">#{index + 1}</div>

            <img src={p.imageUrl} alt={p.name} className="bestseller-img" />

            <h3 className="bestseller-name">{p.name}</h3>
            <p className="bestseller-sold">Đã bán: {p.totalSold}</p>

            {/* Giá và giảm giá */}
            <div className="bestseller-prices">
              {p.discountPercent > 0 && (
                <span className="old-price">${p.price}</span>
              )}
              <span className="final-price">${p.finalPrice}</span>
              {p.discountPercent > 0 && (
                <span className="discount">-{p.discountPercent}%</span>
              )}
            </div>

            <p className="bestseller-desc">{p.description}</p>

            <button
              className="btn-view"
              onClick={() => (window.location.href = `/products/${p.id}`)}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
