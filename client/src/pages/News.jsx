import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/hinh1.png";
import banner2 from "../assets/hinh2.png";
import banner3 from "../assets/hinh3.png";
import banner4 from "../assets/hinh4.png";
import banner5 from "../assets/hinh5.png";
import banner6 from "../assets/hinh6.png";
import banner7 from "../assets/hinh7.png";
import banner8 from "../assets/hinh8.png";
import banner9 from "../assets/hinh9.png";

export default function TinTuc() {
    const [newsList, setNewsList] = useState([]);
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    // ⭐ Modal state
    const [selectedNews, setSelectedNews] = useState(null);

    const openModal = (news) => setSelectedNews(news);
    const closeModal = () => setSelectedNews(null);

    const banners = [
        banner1, banner2, banner3, banner4, banner5,
        banner6, banner7, banner8, banner9
    ];

    const categories = [
        { key: "hot", label: "Tin nổi bật" },
        { key: "week", label: "Giáo dục tuần qua" },
        { key: "edtech", label: "Xu hướng" },
        { key: "idea", label: "Sáng kiến giáo dục" },
        { key: "view", label: "Góc nhìn" },
        { key: "update", label: "Cập nhật nội dung" },
        { key: "blog", label: "Blog học tập" }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("http://localhost:5000/tintuc");
                const data = await res.json();
                setNewsList(data);
            } catch (err) {
                console.error("Lỗi load tin:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const filteredNews =
        category === "all"
            ? newsList
            : newsList.filter((n) => n.category === category);

    return (
        <div className="news-page container my-4">

            {/* Banner */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="mb-4"
            >
                {banners.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} className="d-block w-100" alt={`banner-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-muted mb-2">
                <Link to="/" className="text-primary" style={{ textDecoration: "none" }}>
                    Trang chủ
                </Link>{" "}
                » <strong>Blog học tập</strong>
            </div>

            <div className="hot-news-box mb-4">
                <span className="hot-icon">🔥 Tin tức nóng</span>
                <span className="hot-update">Danh sách nội dung cập nhật mới nhất</span>
            </div>

            <div className="row">

                {/* Sidebar */}
                <div className="col-md-3 mb-4">
                    <div className="sidebar p-3">
                        <h5 className="fw-bold mb-3">CHUYÊN MỤC</h5>
                        <ul className="sidebar-list">
                            <li
                                key="all"
                                onClick={() => setCategory("all")}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: category === "all" ? "bold" : "normal",
                                    color: category === "all" ? "#007bff" : "#333"
                                }}
                            >
                                Tất cả
                            </li>

                            {categories.map((c) => (
                                <li
                                    key={c.key}
                                    onClick={() => setCategory(c.key)}
                                    style={{
                                        cursor: "pointer",
                                        fontWeight: category === c.key ? "bold" : "normal",
                                        color: category === c.key ? "#007bff" : "#333"
                                    }}
                                >
                                    {c.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* News List */}
                <div className="col-md-9">
                    {loading && <p>Đang tải tin tức...</p>}

                    {!loading &&
                        filteredNews.map((news) => (
                            <div
                                key={news._id}
                                className="news-item d-flex mb-4 p-3"
                                style={{
                                    border: "1px solid #eee",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                                onClick={() => openModal(news)}
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    style={{
                                        width: "150px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />

                                <div className="ms-3">
                                    <h5 className="fw-bold">{news.title}</h5>
                                    <div className="text-muted small mb-2">
                                        {news.date} • {news.author}
                                    </div>
                                    <p className="mb-0">{news.summary}</p>
                                </div>
                            </div>
                        ))}

                    {!loading && filteredNews.length === 0 && (
                        <p className="text-muted">Không có tin tức nào trong chuyên mục này.</p>
                    )}
                </div>
            </div>

            {selectedNews && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="p-4"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "60%",
                            maxWidth: "800px",
                            background: "white",
                            borderRadius: "10px",
                            maxHeight: "90vh",
                            overflowY: "auto"
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold">{selectedNews.title}</h4>
                            <button className="btn" onClick={closeModal}>
                                X
                            </button>
                        </div>

                        <img
                            src={selectedNews.image}
                            style={{
                                width: "50%",
                                borderRadius: "10px",
                                margin: "15px 0"
                            }}
                            alt=""
                        />

                        <div className="text-muted mb-2">
                            {selectedNews.date} • {selectedNews.author}
                        </div>

                        <p style={{ whiteSpace: "pre-line" }}>
                            {selectedNews.summary}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
