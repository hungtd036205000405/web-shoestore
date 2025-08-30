import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductDetail.css"; // import CSS riêng cho component này
import "@fortawesome/fontawesome-free/css/all.min.css"; // import FontAwesome

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.result));
  }, [id]);

  useEffect(() => {
    if (product?.sizes?.length && !selectedSize) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product, selectedSize]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/product/${id}`);
      setReviews(res.data.result || []);
    } catch (error) {
      console.error("Lỗi lấy review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Bạn cần đăng nhập để đánh giá!");
        return;
      }

      const payload = {
        userId: parseInt(userId),
        productId: parseInt(id),
        rating: newReview.rating,
        comment: newReview.comment,
      };

      await api.post("/reviews", payload);
      setNewReview({ rating: 5, comment: "" });
      fetchReviews();
    } catch (error) {
      console.error("Lỗi gửi review:", error.response?.data || error);
    }
  };

  // 🛒 Hàm thêm vào giỏ
  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Bạn cần đăng nhập để thêm vào giỏ!");
        return;
      }

      if (product?.sizes?.length > 0 && !selectedSize) {
        alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
        return;
      }

      const payload = {
        productId: parseInt(id),
        quantity: 1,
        ...(selectedSize ? { size: selectedSize } : {}),
      };

      await api.post(`/cart/${userId}/add`, payload);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi thêm giỏ:", error.response?.data || error);
      alert("Có lỗi khi thêm vào giỏ hàng!");
    }
  };

  // ❤️ Hàm thêm vào yêu thích
  const handleAddToFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Bạn cần đăng nhập để thêm vào yêu thích!");
        return;
      }

      await api.post(`/api/favorites/${userId}/${id}`);
      alert("Đã thêm sản phẩm vào danh mục yêu thích!");
    } catch (error) {
      console.error("Lỗi thêm yêu thích:", error.response?.data || error);
      alert("Có lỗi khi thêm vào yêu thích!");
    }
  };

  if (!product) return <p className="text-center mt-4">Đang tải...</p>;

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;
  const selectedSizeStock =
    product?.sizes?.find((s) => s.size === selectedSize)?.stock ?? 0;

  return (
    <div className="container mt-5">
      {/* Thông tin sản phẩm */}
      <div className="row mb-5">
        <div className="col-md-5">
          <div className="position-relative">
            <img
              src={product.imageUrl}
              className="img-fluid rounded-3 shadow-lg"
              alt={product.name}
              style={{ transition: "transform 0.3s ease" }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
            <div className="position-absolute top-0 start-0 m-3">
              <span className="badge bg-success fs-6 px-3 py-2">
                <i className="fas fa-check-circle me-2"></i>
                Còn hàng
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-center">
          <div className="ps-md-4">
            <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
              {product.name}
            </h2>
            <p className="text-muted fs-5 mb-4">{product.description}</p>

            <div className="mb-4">
              <span className="text-muted text-decoration-line-through fs-5 me-3">
                ${(product.price * 1.2).toFixed(0)}
              </span>
              <span className="text-danger fw-bold fs-1">
                ${product.price}
              </span>
              <span className="badge bg-danger ms-2 fs-6">-20%</span>
            </div>

            {/* Chọn size */}
            {product?.sizes?.length > 0 && (
              <div className="mb-4">
                <label className="form-label d-block mb-3 fw-bold fs-5">
                  Chọn size
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isActive = selectedSize === s.size;
                    const isOut = s.stock <= 0;
                    return (
                      <button
                        type="button"
                        key={s.size}
                        className={`btn btn-lg ${
                          isActive
                            ? "btn-dark shadow-sm"
                            : "btn-outline-dark border-2"
                        } position-relative fw-bold`}
                        style={{
                          minWidth: "60px",
                          transition: "all 0.3s ease",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                        }}
                        disabled={isOut}
                        onClick={() => setSelectedSize(s.size)}
                        title={isOut ? "Hết hàng" : `Còn ${s.stock} sản phẩm`}
                      >
                        {s.size}
                        <span
                          className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                            isOut ? "bg-secondary" : "bg-success"
                          } fs-6`}
                        >
                          {s.stock}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedSize && (
                  <div className="mt-3 p-3 bg-light rounded-3 border-start border-4 border-success">
                    <small className="text-success fw-bold">
                      <i className="fas fa-check-circle me-2"></i>
                      Còn {selectedSizeStock} sản phẩm cho size {selectedSize}
                    </small>
                  </div>
                )}
              </div>
            )}

            <div className="d-grid gap-3">
              <button
                className="btn btn-primary btn-lg py-3 fw-bold fs-5 shadow"
                style={{
                  background: "linear-gradient(45deg, #007bff, #0056b3)",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onClick={handleAddToCart}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                🛒 Thêm vào giỏ hàng
              </button>
               <button
                  className="btn btn-outline-dark btn-lg py-3 fw-bold fs-5"
                  style={{ transition: "all 0.3s ease" }}
                  onClick={handleAddToFavorites} // ✅ Gọi API yêu thích
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                    (e.target.style.transform = "translateY(0)")
                    }
                    >
                    <i className="fas fa-heart me-2"></i>
                    Thêm vào yêu thích
                  </button>
            </div>
          </div>
        </div>
      </div>

          {/* Chính sách sản phẩm */}
<div className="policy-section">
  <h4 className="policy-title">
    <i className="fas fa-shield-alt text-primary"></i>
    Dịch vụ & Chính sách
  </h4>
  <div className="row g-4">
    <div className="col-md-4">
      <div className="policy-card">
        <div className="policy-icon text-primary">
          <i className="fas fa-truck"></i>
        </div>
        <h6>Miễn phí vận chuyển</h6>
        <p>
          Áp dụng cho đơn hàng từ{" "}
          <span className="policy-highlight">1 triệu đồng</span>
        </p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="policy-card">
        <div className="policy-icon text-success">
          <i className="fas fa-sync-alt"></i>
        </div>
        <h6>Đổi trả dễ dàng</h6>
        <p>
          Miễn phí đổi trả trong vòng{" "}
          <span className="policy-highlight">30 ngày</span>
        </p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="policy-card">
        <div className="policy-icon text-warning">
          <i className="fas fa-shield-virus"></i>
        </div>
        <h6>Bảo hành chính hãng</h6>
        <p>
          Thời gian bảo hành lên đến{" "}
          <span className="policy-highlight">12 tháng</span>
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Đánh giá */}
      <div className="card border-0 shadow-lg mt-5">
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-4">
            <h4 className="mb-0 me-3" style={{ color: "#2c3e50" }}>
              <i className="fas fa-star text-warning me-2"></i>
              Đánh giá sản phẩm
            </h4>
            <span className="badge bg-primary fs-6 px-3 py-2">
              {totalReviews}
            </span>
            <span className="badge bg-warning text-dark fs-6 px-3 py-2 ms-2">
              ⭐ {avgRating}
            </span>
          </div>

          {totalReviews > 0 ? (
            <div className="mb-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="card border-0 shadow-sm mb-3"
                  style={{ background: "#f8f9fa" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <i className="fas fa-user text-primary"></i>
                        </div>
                        <strong className="fs-6">{r.username}</strong>
                      </div>
                      <div className="text-warning fs-5">
                        {"⭐".repeat(r.rating)}
                      </div>
                    </div>
                    <p className="mb-2 fs-6">{r.comment}</p>
                    <small className="text-muted">
                      <i className="fas fa-clock me-1"></i>
                      {new Date(r.createdAt).toLocaleString("vi-VN")}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="fas fa-comments fa-3x text-muted mb-3"></i>
              <p className="text-muted fs-5">Chưa có đánh giá nào.</p>
            </div>
          )}

          {/* Form gửi đánh giá */}
          <div className="border-top pt-4">
            <form onSubmit={handleSubmitReview}>
              <h5 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>
                <i className="fas fa-edit me-2 text-primary"></i>
                Gửi đánh giá của bạn
              </h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Chọn số sao</label>
                  <select
                    className="form-select form-select-lg border-2"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <option key={s} value={s}>
                        {"⭐".repeat(s)} {s} sao
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label fw-bold">Nhận xét của bạn</label>
                  <textarea
                    className="form-control border-2"
                    rows="3"
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg px-4 py-2 fw-bold"
                style={{
                  background: "linear-gradient(45deg, #28a745, #20c997)",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                <i className="fas fa-paper-plane me-2"></i>
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
