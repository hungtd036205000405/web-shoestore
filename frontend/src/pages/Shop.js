import React, { useState, useEffect, useRef } from "react";
import "./Shop.css";
import ProductList from "../components/ProductList";
import ChatBox from "../components/ChatBox";
import { FaShippingFast, FaExchangeAlt, FaMedal } from "react-icons/fa"; // 🟢 Icon chuyên nghiệp

function Shop() {
  const [scrolled, setScrolled] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const productSectionRef = useRef(null); // 👉 ref cho ProductList

  const heroSlides = [
  {
    id: 1,
    title: "TĂNG TỐC MỌI CUNG ĐƯỜNG",
    subtitle: "Giày thể thao siêu nhẹ với khả năng bứt phá tốc độ vượt trội",
    image: "/shoe1.png",
  },
  {
    id: 2,
    title: "ÊM MƯỢT TỪNG BƯỚC CHÂN",
    subtitle: "Công nghệ đệm tiên tiến cho cảm giác thoải mái suốt cả ngày",
    image: "/shoe2.png",
    cta: "Khám phá",
  },
  {
    id: 3,
    title: "PHONG CÁCH KHÔNG GIỚI HẠN",
    subtitle: "Thiết kế thời thượng, tái hiện biểu tượng kinh điển cho 2025",
    image: "/shoe3.png",
    cta: "Xem bộ sưu tập",
  },
  {
    id: 4,
    title: "ĐỘ BỀN VƯỢT THỜI GIAN",
    subtitle: "Chất liệu cao cấp, đồng hành cùng bạn qua mọi thử thách",
    image: "/shoe4.png",
    cta: "Khám phá ngay",
  },
  {
    id: 5,
    title: "TỰ DO KHẲNG ĐỊNH BẢN THÂN",
    subtitle: "Gam màu độc đáo, thiết kế cá tính – đậm dấu ấn riêng",
    image: "/shoe5.png",
    cta: "Mua sắm liền tay",
  },
];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrolled(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () =>
    setActiveSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const handleNext = () =>
    setActiveSlide((s) => (s + 1) % heroSlides.length);

  // 👉 Scroll tới danh sách sản phẩm
  const scrollToProducts = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="shop-container">
      {/* Progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrolled}%` }}
      />

      {/* New Hero UI */}
      <header className="hero-new">
        <div className="hero-inner container">
          <div className="hero-left">
            <div className="label">Bứt phá thời trang – Dẫn đầu xu hướng</div>

            <h1 className="hero-new-title">Lumos Sneaker</h1>
            <p className="hero-lead">
              Khám phá đẳng cấp mới cùng Lumos Sneaker — nơi thiết kế tối giản
              gặp công nghệ hiện đại. Mỗi bước chân không chỉ là di chuyển, mà
              còn là tuyên ngôn phong cách. Hãy chọn ngay đôi giày khiến bạn khác
              biệt và dẫn đầu xu hướng.
            </p>
            <div className="hero-actions">
              <button className="cta primary" onClick={scrollToProducts}>
                Mua ngay
              </button>
              
            </div>
            <ul className="trust-list">
              <li><FaShippingFast /> Freeship toàn quốc</li>
              <li><FaExchangeAlt /> Đổi trả 30 ngày</li>
              <li><FaMedal /> Cam kết chính hãng</li>
            </ul>
          </div>

          <div className="hero-right">
            <div className="carousel" ref={carouselRef}>
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`carousel-slide ${
                    idx === activeSlide ? "active" : ""
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url(${slide.image})`,
                  }}
                >
                  <div className="slide-info">
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
                    {slide.cta && (
                      <button className="cta small">{slide.cta}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button
                className="nav prev"
                onClick={handlePrev}
                aria-label="Previous"
              >
                ‹
              </button>
              <div className="dots">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === activeSlide ? "active" : ""}`}
                    onClick={() => setActiveSlide(i)}
                  />
                ))}
              </div>
              <button
                className="nav next"
                onClick={handleNext}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product List Section */}
      <section className="products-section" ref={productSectionRef}>
        <div className="container">
          <ProductList />
        </div>
      </section>

      {/* ChatBox */}
      <ChatBox />
    </div>
  );
}

export default Shop;
