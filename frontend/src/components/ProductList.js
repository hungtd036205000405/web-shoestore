import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import "./ProductList.css"; // 👉 CSS riêng cho đẹp

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultCategories = [
    { id: 1, name: "Sneakers" },
    { id: 2, name: "Running Shoes" },
    { id: 3, name: "Casual Shoes" },
    { id: 4, name: "Boots" },
    { id: 5, name: "Formal Shoes" },
  ];

  const [advName, setAdvName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const pageSize = 8;

  const fetchProducts = (page = 0) => {
    api
      .get(`/products?page=${page}&size=${pageSize}`)
      .then((res) => {
        const result = res.data.result;
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setCurrentPage(result.number);
      })
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  };

  const fetchCategories = () => {
    api
      .get(`/categories`)
      .then((res) => setCategories(res.data.result || defaultCategories))
      .catch((err) => {
        console.error("Lỗi categories:", err);
        setCategories(defaultCategories);
      });
  };

  const handleAdvancedSearch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products/search", {
        params: {
          name: advName || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          categoryId: categoryId || undefined,
        },
      });
      setProducts(res.data.result || []);
      setTotalPages(0);
      setCurrentPage(0);
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetToOriginalList = () => {
    if (loading) return;
    setAdvName("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    setSearchTerm("");
    fetchProducts(0);
  };

  useEffect(() => {
    fetchProducts(0);
    fetchCategories();
    if (categories.length === 0) {
      setCategories(defaultCategories);
    }
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container product-list-wrapper">
      {/* Tiêu đề */}
      <h2 className="section-title">🔥 Sản phẩm giày nổi bật</h2>
      <p className="section-subtitle">Khám phá phong cách – Bước đi tự tin</p>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        className="form-control search-bar"
        placeholder="🔎 Tìm kiếm nhanh theo tên giày..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tìm kiếm nâng cao */}
      <div className="card p-3 mb-4 shadow-sm border-0 search-box">
        <h5 className="mb-3 fw-bold text-primary">Tìm kiếm nâng cao</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tên sản phẩm"
              value={advName}
              onChange={(e) => setAdvName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Giá từ"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Giá đến"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleAdvancedSearch}
              disabled={loading}
            >
              {loading ? "Đang tìm..." : "Tìm"}
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={resetToOriginalList}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-muted text-center mt-4">
            ❌ Không tìm thấy sản phẩm nào.
          </p>
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => fetchProducts(currentPage - 1)}
              >
                ◀ Trang trước
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${i === currentPage ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => fetchProducts(i)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => fetchProducts(currentPage + 1)}
              >
                Trang sau ▶
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default ProductList;
