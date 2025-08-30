import { useEffect, useRef, useState } from "react";
import "./Poster.css";

function Poster() {
  // Hiệu ứng nghiêng theo chuột + slideshow
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);
  const heroImages = [
  "/shoe1.png",
  "/shoe4.png",
  "/shoe3.png",
  
];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const maxRotation = 10;
    const yRotation = ((relativeX - centerX) / centerX) * maxRotation;
    setRotate({ x: 0, y: yRotation });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setPaused(false);
  };
  const handleMouseEnter = () => setPaused(true);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % heroImages.length);
    }, 1000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="py-5 hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Text content */}
          <div className="col-md-6 reveal-up">
            <span className="badge bg-danger mb-2 hero-badge">Bộ sưu tập mới 2025</span>
            <h1 className="display-5 fw-bold hero-title text-gradient">
              <span className="hero-line">Nâng tầm phong cách</span>
              <span className="hero-line">Vượt mọi giới hạn</span>
            </h1>
            <p className="text-muted mb-4">
              Khám phá bộ sưu tập giày thể thao mới nhất với công nghệ tiên tiến,
              thiết kế hiện đại và sự thoải mái vượt trội.
            </p>
            <div className="d-flex gap-3 mb-4">
              <button className="btn btn-danger btn-lg btn-cta btn-cta-primary">Mua ngay</button>
              <button className="btn btn-outline-dark btn-lg btn-cta btn-cta-secondary">
                Khám phá bộ sưu tập
              </button>
            </div>
            <div className="d-flex gap-4">
              <div className="metric">
                <h4 className="fw-bold">500+</h4>
                <p className="text-muted">Mẫu giày</p>
              </div>
              <div className="metric">
                <h4 className="fw-bold">100+</h4>
                <p className="text-muted">Thương hiệu</p>
              </div>
              <div className="metric">
                <h4 className="fw-bold">50k+</h4>
                <p className="text-muted">Khách hàng</p>
              </div>
            </div>
          </div>

          {/* Image với hiệu ứng nghiêng + slideshow */}
          <div className="col-md-6 text-center reveal-up">
            <div
              className="shoe-wrapper float-anim"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={wrapperRef}
            >
              <div className="slide-stack">
                {heroImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className={`slide-image ${idx === currentSlide ? "active" : ""}`}
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${rotate.y}deg) ${
                        idx === currentSlide ? "scale(1)" : "scale(0.98)"
                      }`,
                    }}
                  />
                ))}
              </div>
              <div className="ground-shadow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Poster;

