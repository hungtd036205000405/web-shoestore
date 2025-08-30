import React from 'react';
import Poster from '../components/Poster';

function Trangchu() {
  return (
    <div className="home-page">
      {/* Hero Section với Poster */}
      <Poster />

      {/* About Us Section */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title display-4 fw-bold mb-3">
                Về SHOES STORE
              </h2>
              <div className="title-underline mb-4"></div>
              <p className="lead text-muted">
                Đam mê và chất lượng là DNA của chúng tôi
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-medal fa-3x text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Chất Lượng Hàng Đầu</h3>
                <p className="text-muted">
                  Chúng tôi cam kết mang đến những sản phẩm chất lượng cao từ các thương hiệu uy tín hàng đầu thế giới.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-tags fa-3x text-danger"></i>
                </div>
                <h3 className="h4 mb-3">Giá Cả Cạnh Tranh</h3>
                <p className="text-muted">
                  Chính sách giá linh hoạt và nhiều ưu đãi hấp dẫn giúp khách hàng tiếp cận sản phẩm chất lượng với mức giá tốt nhất.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card text-center p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-headset fa-3x text-success"></i>
                </div>
                <h3 className="h4 mb-3">Dịch Vụ Tận Tâm</h3>
                <p className="text-muted">
                  Đội ngũ tư vấn chuyên nghiệp, nhiệt tình sẵn sàng hỗ trợ bạn 24/7 để tìm được đôi giày phù hợp nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="row g-4 stats-section py-5">
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <h3 className="display-4 fw-bold text-primary mb-2">10+</h3>
                <p className="text-muted mb-0">Năm Kinh Nghiệm</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <h3 className="display-4 fw-bold text-danger mb-2">50k+</h3>
                <p className="text-muted mb-0">Khách Hàng Hài Lòng</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <h3 className="display-4 fw-bold text-success mb-2">100+</h3>
                <p className="text-muted mb-0">Thương Hiệu</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <h3 className="display-4 fw-bold text-info mb-2">500+</h3>
                <p className="text-muted mb-0">Mẫu Giày</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="row align-items-center mt-5">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3"
                alt="Store Interior" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="h2 mb-4">Tại sao chọn SHOES STORE?</h3>
              <div className="why-choose-item d-flex align-items-center mb-3">
                <i className="fas fa-check-circle text-success me-3"></i>
                <p className="mb-0">Sản phẩm chính hãng 100%, bảo hành toàn quốc</p>
              </div>
              <div className="why-choose-item d-flex align-items-center mb-3">
                <i className="fas fa-check-circle text-success me-3"></i>
                <p className="mb-0">Đổi trả trong 30 ngày nếu không hài lòng</p>
              </div>
              <div className="why-choose-item d-flex align-items-center mb-3">
                <i className="fas fa-check-circle text-success me-3"></i>
                <p className="mb-0">Miễn phí vận chuyển cho đơn hàng từ 500k</p>
              </div>
              <div className="why-choose-item d-flex align-items-center mb-3">
                <i className="fas fa-check-circle text-success me-3"></i>
                <p className="mb-0">Tích điểm đổi quà với ưu đãi hấp dẫn</p>
              </div>
              <div className="why-choose-item d-flex align-items-center">
                <i className="fas fa-check-circle text-success me-3"></i>
                <p className="mb-0">Cập nhật xu hướng mới nhất thường xuyên</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-column">
              <div className="footer-logo">
                <i className="fas fa-shoe-prints"></i>
                <h3>SHOES STORE</h3>
              </div>
              <p className="company-desc">
                Cung cấp những sản phẩm giày chất lượng cao, 
                mang đến trải nghiệm tuyệt vời cho khách hàng.
              </p>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4>Thông tin liên hệ</h4>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>0123 456 789</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>contact@shoesstore.com</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>8:00 - 22:00, Thứ 2 - Chủ nhật</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Liên kết nhanh</h4>
              <ul className="quick-links">
                <li><a href="/about">Về chúng tôi</a></li>
                <li><a href="/shipping">Chính sách vận chuyển</a></li>
                <li><a href="/return">Chính sách đổi trả</a></li>
                <li><a href="/privacy">Chính sách bảo mật</a></li>
                <li><a href="/faq">Câu hỏi thường gặp</a></li>
              </ul>
            </div>

            {/* Social Media & Newsletter */}
            <div className="footer-column">
              <h4>Kết nối với chúng tôi</h4>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link facebook" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://tiktok.com" className="social-link tiktok" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://youtube.com" className="social-link youtube" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              
              <div className="newsletter">
                <h4>Đăng ký nhận tin</h4>
                <p>Nhận thông tin mới nhất về sản phẩm và khuyến mãi</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Email của bạn" />
                  <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2025 SHOES STORE. Tất cả quyền được bảo lưu.
            </p>
            <div className="payment-methods">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS cho các component */}
      <style jsx>{`
        .title-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #dc3545, #0d6efd);
          margin: 0 auto;
        }

        .feature-card {
          border-radius: 10px;
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f8f9fa;
        }

        .stats-section {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 2rem;
        }

        .stat-card h3 {
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .why-choose-item {
          transition: transform 0.2s ease;
        }

        .why-choose-item:hover {
          transform: translateX(10px);
        }

        .why-choose-item i {
          font-size: 1.5rem;
        }

        @media (max-width: 768px) {
          .feature-card {
            margin-bottom: 1rem;
          }
        }

        /* Footer Styles */
        .footer-section {
          background: #1a1a1a;
          color: #fff;
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .footer-column {
          padding: 0 1rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .footer-logo i {
          font-size: 2rem;
          color: #dc3545;
        }

        .footer-logo h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #fff;
        }

        .company-desc {
          color: #999;
          line-height: 1.6;
        }

        .footer-column h4 {
          color: #fff;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-column h4::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background: #dc3545;
        }

        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .contact-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: #999;
        }

        .contact-list i {
          color: #dc3545;
          width: 20px;
        }

        .quick-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .quick-links li {
          margin-bottom: 0.5rem;
        }

        .quick-links a {
          color: #999;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .quick-links a:hover {
          color: #dc3545;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .facebook {
          background: #1877f2;
        }

        .instagram {
          background: #e4405f;
        }

        .tiktok {
          background: #000;
        }

        .youtube {
          background: #ff0000;
        }

        .social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .newsletter {
          margin-top: 2rem;
        }

        .newsletter p {
          color: #999;
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-form input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 4px;
          background: #222;
          color: #fff;
        }

        .newsletter-form button {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 4px;
          background: #dc3545;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-form button:hover {
          background: #c82333;
        }

        .footer-bottom {
          border-top: 1px solid #333;
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          color: #999;
          margin: 0;
        }

        .payment-methods {
          display: flex;
          gap: 1rem;
          font-size: 1.5rem;
        }

        .payment-methods i {
          color: #999;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Trangchu;
