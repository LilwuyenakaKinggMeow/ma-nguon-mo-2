import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";
import cat3 from "../assets/cat3.jpg";
import cat4 from "../assets/cat4.jpg";
import cat5 from "../assets/cat6.jpg";
import cat6 from "../assets/cat5.jpg";

export default function Flashcard() {
    const bannerImages = [banner1, banner2, banner3];

    const categories = [
        { id: 1, title: "Nâng cấp từ vựng tiếng Hàn", img: cat1 },
        { id: 2, title: "Audio Tiếng Anh", img: cat2 },
        { id: 3, title: "3000 Từ thông dụng", img: cat3 },
        { id: 4, title: "Từ vựng IELTS", img: cat4 },
        { id: 5, title: "Từ vựng Tiếng Trung", img: cat5 },
        { id: 6, title: "Từ vựng Tiếng Hàn", img: cat6 },
    ];

    return (
        <div className="flashcard-page">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className="banner-swiper"
            >
                {bannerImages.map((url, idx) => (
                    <SwiperSlide key={idx}>
                        <img src={url} alt={`banner-${idx}`} className="banner-img" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <h2 className="section-title">
                FLASHCARD HỌC TỪ VỰNG HIỆU QUẢ – NHỚ LÂU
            </h2>


            <div className="category-grid">
                {categories.map(item => (
                    <Link
                        key={item.id}
                        to={`/flashcard/${item.id}`}
                        className="category-card"
                    >
                        <img src={item.img} alt={item.title} />
                        <p>{item.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
