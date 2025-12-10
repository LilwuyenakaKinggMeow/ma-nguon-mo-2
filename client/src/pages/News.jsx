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

    const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9];

    const categories = [
        { key: "hot", label: "Tin nổi bật" },
        { key: "week", label: "Giáo dục tuần qua" },
        { key: "edtech", label: "Xu hướng" },
        { key: "idea", label: "Sáng kiến giáo dục" },
        { key: "view", label: "Góc nhìn" },
        { key: "update", label: "Cập nhật nội dung" },
        { key: "blog", label: "Blog học tập" },
    ];

    const sampleNews = [
        {
            id: 1,
            title: "Hàng chục trường áp dụng AI hỗ trợ giảng dạy từ 2025",
            summary: "Công nghệ AI đang được triển khai tại nhiều trường học nhằm cải thiện chất lượng giảng dạy.",
            date: "03/03/2025",
            author: "Onluyen Team",
            category: "hot",
            image: "https://i.imgur.com/o6Y7Kgs.jpeg"
        },
        {
            id: 2,
            title: "Kỳ thi THPTQG 2025 thay đổi cấu trúc đề thi",
            summary: "Bộ GD&ĐT vừa công bố cấu trúc đề thi THPTQG 2025 với nhiều điểm mới, học sinh cần lưu ý.",
            date: "02/03/2025",
            author: "Onluyen Team",
            category: "hot",
            image: "https://i.imgur.com/bkaDj12.jpeg"
        },
        {
            id: 3,
            title: "AI tạo nội dung học tập cá nhân hóa có thực sự hiệu quả?",
            summary: "Các chuyên gia đánh giá tiềm năng và hạn chế của việc ứng dụng AI trong học tập cá nhân.",
            date: "28/02/2025",
            author: "Onluyen Team",
            category: "edtech",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 4,
            title: "Top 5 công cụ học online được học sinh dùng nhiều nhất",
            summary: "Bảng xếp hạng các công cụ học online năm 2025 với đánh giá chi tiết.",
            date: "25/02/2025",
            author: "Onluyen Team",
            category: "edtech",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 5,
            title: "Nhiều học sinh đạt giải khoa học kỹ thuật cấp quốc gia",
            summary: "Các dự án sáng tạo được triển khai tại nhiều trường đã đạt giải cao trong kỳ thi quốc gia.",
            date: "20/02/2025",
            author: "Onluyen Team",
            category: "week",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 6,
            title: "Bộ GD&ĐT ra hướng dẫn mới cho nội dung tự học",
            summary: "Hướng dẫn mới giúp học sinh tự học hiệu quả và giáo viên có thể tham khảo dễ dàng.",
            date: "18/02/2025",
            author: "Onluyen Team",
            category: "week",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 7,
            title: "Giáo viên trẻ sáng tạo mô hình dạy học bằng Flashcard",
            summary: "Sáng kiến giúp học sinh tiếp thu từ vựng nhanh chóng và hứng thú hơn.",
            date: "15/02/2025",
            author: "Onluyen Team",
            category: "idea",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 8,
            title: "Ứng dụng công nghệ giúp học sinh nắm vững từ vựng",
            summary: "Các app học từ vựng với AI đang trở nên phổ biến và hỗ trợ học sinh ghi nhớ lâu.",
            date: "12/02/2025",
            author: "Onluyen Team",
            category: "idea",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 9,
            title: "Học sinh có nên phụ thuộc quá nhiều vào chatbot AI?",
            summary: "Bài viết phân tích lợi ích và rủi ro khi học sinh sử dụng chatbot AI trong học tập.",
            date: "10/02/2025",
            author: "Onluyen Team",
            category: "view",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        },
        {
            id: 10,
            title: "Phụ huynh nên đồng hành cùng con trong việc học như thế nào?",
            summary: "Hướng dẫn chi tiết giúp phụ huynh hỗ trợ con học hiệu quả mà không áp lực.",
            date: "08/02/2025",
            author: "Onluyen Team",
            category: "view",
            image: "https://i.imgur.com/3qgBpXV.jpeg"
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setNewsList(sampleNews);
            setLoading(false);
        }, 500);
    }, []);

    const filteredNews = category === "all"
        ? newsList
        : newsList.filter((n) => n.category === category);

    return (
        <div className="news-page container my-4">


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
                <span className="hot-update">
                    Danh sách nội dung cập nhật mới nhất
                </span>
            </div>

            <div className="row">

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
                                    color: category === "all" ? "#007bff" : "#333",
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
                                        color: category === c.key ? "#007bff" : "#333",
                                    }}
                                >
                                    {c.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-md-9">
                    {loading && <p>Đang tải tin tức...</p>}
                    {!loading && filteredNews.map((news) => (
                        <div key={news.id} className="news-item d-flex mb-4 p-3" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
                            <img
                                src={news.image}
                                alt={news.title}
                                className="news-img"
                                style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                            />
                            <div className="ms-3">
                                <h5 className="fw-bold">{news.title}</h5>
                                <div className="text-muted small mb-2">
                                    {news.date} • {news.author || "Admin"}
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
        </div>
    );
}
