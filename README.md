# 🛍️ ShoeStore - Fullstack E-commerce Website  

## 🚀 Giới thiệu  
**ShoeStore** là một hệ thống bán giày trực tuyến được xây dựng theo mô hình **Fullstack** với **Spring Boot (Backend)** và **React (Frontend)**.  
Dự án không chỉ dừng lại ở các chức năng cơ bản của một website thương mại điện tử, mà còn áp dụng nhiều công nghệ hiện đại để tối ưu trải nghiệm người dùng và tăng cường bảo mật.  

---

## ✨ Các tính năng chính  

### 👤 Quản lý người dùng & phân quyền  
- Đăng ký / Đăng nhập bằng **Spring Security + JWT Token**.  
- Mã hóa mật khẩu bằng **BCrypt** để đảm bảo an toàn.  
- Phân quyền 3 cấp độ rõ ràng:  
  - 👑 **Admin**: quản lý sản phẩm, đơn hàng, người dùng.  
  - 🧑‍💼 **Nhân viên**: xử lý đơn hàng, hỗ trợ khách hàng.  
  - 👤 **User**: mua hàng, đánh giá sản phẩm, chat AI.  

### 🛒 Hệ thống bán hàng  
- Quản lý **Giỏ hàng, Đơn hàng, Thanh toán online**.  
- **Tìm kiếm & lọc sản phẩm nâng cao** theo danh mục, size giày, giá.  
- **Review + Favorite**: người dùng có thể đánh giá và lưu sản phẩm yêu thích.  
- **Gợi ý sản phẩm tương tự** dựa trên lịch sử mua hàng.  
- **Các chương trình Khuyến mãi** (discount).
### 🤖 Chat AI (OpenAI API)  
- Tích hợp **AI Chatbot** để hỗ trợ khách hàng.  
- **Gợi ý sản phẩm phù hợp** theo nhu cầu.  
- Lưu lại **lịch sử hội thoại** (Conversation + Message).  

### 📊 Dashboard quản trị
- **Thống kê** doanh thu theo ngày, tháng, năm.
- **Biểu đồ** trực quan: sản phẩm bán chạy, doanh thu theo thời gian.
- Quản lý sản phẩm, đơn hàng, người dùng.

### 🔐 Bảo mật & kỹ thuật backend  
- **Spring Security + JWT**: Authentication & Authorization.  
- **CORS Config** để bảo vệ API.  
- Xây dựng **RESTful API chuẩn hoá**.  

---

## 🛠️ Công nghệ sử dụng  

### Backend  
- Java Spring Boot (REST API).  
- Spring Security + JWT (xác thực & phân quyền).  
- MySQL (CSDL quan hệ).  
- Hibernate / JPA (ORM).  

### Frontend  
- React + React Router (SPA).  
- Axios (gọi API).  
- TailwindCSS / CSS Modules (UI/UX).  

### Khác  
- Docker (triển khai).  
- Ngrok (test API).  
- OpenAI API (AI Chatbot).  

---

## 📸 Demo giao diện  
👉 (Thêm ảnh chụp màn hình hoặc gif demo dự án tại đây để gây ấn tượng hơn)  

---

## ⚡ Điểm nổi bật gây ấn tượng  
✅ Áp dụng **Spring Security + JWT** để bảo mật toàn bộ hệ thống.  
✅ Xây dựng phân quyền nhiều cấp độ (**Admin / Staff / User**).  
✅ Tích hợp **AI Chatbot** gợi ý sản phẩm bằng **OpenAI**.  
✅ Đầy đủ tính năng **Cart + Order + Payment + Review + Favorite**.  
✅ Thiết kế **Frontend bằng React** hiện đại, dễ mở rộng.  
✅ **Clean Architecture** & **RESTful API** chuẩn mực.  
✅ Dashboard Admin quản lý **sản phẩm, người dùng, đơn hàng, doanh thu**.  

---

## 🔮 Hướng phát triển trong tương lai

- Thanh toán Online: tích hợp VNPay / PayPal / Stripe.
- AI Recommendation nâng cao: gợi ý dựa trên lịch sử mua hàng + hành vi người dùng.
- ElasticSearch: tìm kiếm sản phẩm cực nhanh.
- Mobile App (React Native): mang trải nghiệm Shoestore lên di động.

## 🚀 Cài đặt & chạy dự án  

### Backend (Spring Boot)  
```bash
cd backend
mvn spring-boot:run
