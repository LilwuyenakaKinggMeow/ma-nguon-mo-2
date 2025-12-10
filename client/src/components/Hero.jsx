import React, { useState, useEffect } from "react";

import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import bg4 from "../assets/bg4.png";
import bg5 from "../assets/bg5.png";
import bg6 from "../assets/bg6.png";
import bg7 from "../assets/bg7.png";
import bg8 from "../assets/bg8.png";
import bg9 from "../assets/bg9.png";
import bg10 from "../assets/bg10.png";

import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import thumb5 from "../assets/thumb5.png";
import thumb6 from "../assets/thumb6.png";
import thumb7 from "../assets/thumb7.png";
import thumb8 from "../assets/thumb8.png";
import thumb9 from "../assets/thumb9.png";
import thumb10 from "../assets/thumb10.png";

const backgroundImages = [
  bg1, bg2, bg3, bg4, bg5,
  bg6, bg7, bg8, bg9, bg10
];

const thumbs = [
  thumb1, thumb2, thumb3, thumb4, thumb5,
  thumb6, thumb7, thumb8, thumb9, thumb10
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= backgroundImages.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="row align-items-center">
          <div className="col-lg-6 text-white">
            <h1 className="hero-title">
              Giải Pháp <span className="text-accent">Chuyển Đổi Số</span><br />
              Giáo Dục Toàn Diện
            </h1>

            <p className="hero-subtext">
              Nền tảng học tập toàn diện dành cho giáo viên & học sinh
            </p>
          </div>

          <div className="col-lg-6 text-end text-white d-none d-lg-block">
            <div className="hero-stat-number">+50,000</div>
            <div className="hero-stat-text">giáo viên</div>
          </div>
        </div>

 
        <div className="row mt-5">
          <div className="col-12 d-flex gap-3 pt-3 gallery-scroll">
            {thumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentIndex(index)}
                className={`gallery-thumb ${
                  index === currentIndex ? "active-thumb" : ""
                }`}
                style={{ cursor: "pointer" }}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
