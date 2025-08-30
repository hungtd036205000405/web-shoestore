import React, { useEffect, useState } from "react";
import "./AdminManageProduct.css"; // 👉 tạo file css để style modal

const AdminManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
    categoryId: ""
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 👉 modal state

  // Fetch sản phẩm khi load trang
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/admin/products");
      const data = await res.json();
      setProducts(data.result || []);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      alert("Không thể tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý nhập form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit thêm / sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `http://localhost:8080/admin/products/${form.id}`
        : "http://localhost:8080/admin/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Lỗi khi lưu sản phẩm!");

      alert(form.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
      setForm({
        id: null,
        name: "",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
        categoryId: ""
      });
      setIsModalOpen(false); // 👉 đóng modal sau khi lưu
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi lưu sản phẩm!");
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`http://localhost:8080/admin/products/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Lỗi khi xóa!");
      alert("Xóa thành công!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi xóa sản phẩm!");
    }
  };

  // Chỉnh sửa sản phẩm (mở modal và đổ dữ liệu)
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      imageUrl: product.imageUrl,
      categoryId: product.category?.id || ""
    });
    setIsModalOpen(true); // 👉 mở modal
  };

  return (
    <div className="container my-4">

          {/* Nút thêm sản phẩm */}
  <div className="mb-3">
    <button
      className="btn btn-primary"
      onClick={() => {
        setForm({
          id: null,
          name: "",
          price: "",
          quantity: "",
          description: "",
          imageUrl: "",
          categoryId: ""
        });
        setIsModalOpen(true); // 👉 mở modal thêm mới
      }}
    >
      ➕ Thêm sản phẩm
    </button>
  </div>


      <h2>📦 Quản lý sản phẩm</h2>

      {/* Danh sách sản phẩm */}
      <div className={`card ${isModalOpen ? "blurred" : ""}`}>
        <div className="card-header">📋 Danh sách sản phẩm</div>
        <div className="card-body">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Danh mục</th>
                  <th>Hình ảnh</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price.toLocaleString()} đ</td>
                    <td>{p.quantity}</td>
                    <td>{p.category?.name || "Không có"}</td>
                    <td>
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{form.id ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}</h4>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Giá</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Số lượng</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Hình ảnh (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Danh mục (ID)</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Mô tả</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success" type="submit">
                  {form.id ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageProduct;
