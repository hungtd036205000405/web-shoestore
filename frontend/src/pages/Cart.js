import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);

  const numericUserId = storedUserId ? Number(storedUserId) : null;

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  const fetchCart = async () => {
    if (!numericUserId) return;
    try {
      const res = await api.get(`/cart/${numericUserId}`, config);
      setCart(res.data && res.data.cartDetails ? res.data : { cartDetails: [] });
      setError(null);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err.response?.data || err.message);
      setError("Không thể tải giỏ hàng. Vui lòng thử lại sau!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [numericUserId]);

  const placeOrder = async () => {
    try {
      const res = await api.post(`/orders/place/${numericUserId}`, {}, config);
      alert("🎉 Đặt hàng thành công!");
      console.log("Chi tiết đơn hàng:", res.data);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err.response?.data || err.message);
      alert("❌ Đặt hàng thất bại!");
    }
  };

  const increaseQuantity = async (productId, size, currentQty) => {
    try {
      await api.put(
        `/cart/${numericUserId}/update`,
        { productId, size, quantity: currentQty + 1 },
        config
      );
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  const decreaseQuantity = async (productId, size, currentQty) => {
    if (currentQty > 1) {
      try {
        await api.put(
          `/cart/${numericUserId}/update`,
          { productId, size, quantity: currentQty - 1 },
          config
        );
        fetchCart();
      } catch (err) {
        console.error("Lỗi khi giảm số lượng:", err);
      }
    }
  };

  const removeItem = async (productId, size) => {
    try {
      const url =
        `/cart/${numericUserId}/remove/${productId}` +
        (size ? `?size=${encodeURIComponent(size)}` : "");
      await api.delete(url, config);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete(`/cart/${numericUserId}/clear`, config);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi xóa giỏ hàng:", err);
    }
  };

  // 👉 Đổi size
  const updateSize = async (productId, oldSize, newSize, quantity) => {
    try {
      await api.put(
        `/cart/${numericUserId}/update`,
        { productId, size: oldSize, newSize, quantity },
        config
      );
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi đổi size:", err.response?.data || err.message);
    }
  };

  if (!numericUserId) {
    return (
      <p className="text-center mt-5 text-danger">
        Vui lòng đăng nhập để xem giỏ hàng!
      </p>
    );
  }

  if (!cart) return <p className="text-center mt-5">Đang tải giỏ hàng...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  const total = cart.cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ⚠️ Tạm fix danh sách size, thực tế bạn nên load từ API productSize
  const availableSizes = ["38", "39", "40", "41", "42", "43"];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Giỏ hàng của bạn</h2>

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Sản phẩm</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartDetails.map((item) => (
                <tr key={`${item.productId}-${item.size || "default"}`}>
                  <td className="text-start">
                    <b>{item.productName}</b>
                  </td>
                  <td>
                    <select
                      value={item.size || ""}
                      onChange={(e) =>
                        updateSize(item.productId, item.size, e.target.value, item.quantity)
                      }
                      className="form-select form-select-sm"
                      style={{ width: "90px", margin: "0 auto" }}
                    >
                      {availableSizes.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() =>
                        decreaseQuantity(item.productId, item.size, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span className="badge bg-primary">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() =>
                        increaseQuantity(item.productId, item.size, item.quantity)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td className="fw-bold text-success">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.productId, item.size)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>
              Tổng cộng:{" "}
              <span className="text-danger">{total.toLocaleString()} VND</span>
            </h4>
            <div>
              <button
                className="btn btn-outline-danger me-3"
                onClick={clearCart}
              >
                Xóa giỏ hàng
              </button>
              <button className="btn btn-success btn-lg" onClick={placeOrder}>
                Đặt hàng ngay 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
