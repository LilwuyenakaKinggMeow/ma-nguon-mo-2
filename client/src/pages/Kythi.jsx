import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

export default function KyThi() {
    const navigate = useNavigate();

    const banners = [banner1, banner2, banner3];

    const examList = [
        { id: 12, name: "Đề thi thử có đáp án – Đề số 12", file: "ETEST _ IELTS READING TEST 12.pdf" },
        { id: 11, name: "Đề thi thử có đáp án – Đề số 11", file: "ETEST _ IELTS READING TEST 11.pdf" },
        { id: 10, name: "Đề thi thử có đáp án – Đề số 10", file: "ETEST _ IELTS READING TEST 10.pdf" },
        { id: 9, name: "Đề thi thử có đáp án – Đề số 9", file: "ETEST _ IELTS READING TEST 9.pdf" },
        { id: 8, name: "Đề thi thử có đáp án – Đề số 8", file: "ETEST _ IELTS READING TEST 8.pdf" }
    ];

    const downloadPDF = async (filename) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login", {
                state: {
                    message: "Vui lòng đăng nhập để tải tài liệu. Nếu chưa có tài khoản vui lòng đăng ký."
                }
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/download/${filename}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Bạn chưa có quyền tải file hoặc file không tồn tại.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            navigate("/login", {
                state: {
                    message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại để tiếp tục tải file."
                }
            });
        }
    };

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
                        <img src={img} className="d-block w-100" alt="banner" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-muted mb-2">
                <Link to="/" className="text-primary" style={{ textDecoration: "none" }}>
                    Trang chủ
                </Link>{" "}
                » <strong>Kỳ thi</strong>
            </div>

            <div className="hot-news-box mb-4">
                <span className="hot-icon">🔥 Tin tức nóng</span>
                <span className="hot-update">
                    Here We Go Là Gì? Cách Dùng Here We Go Chi Tiết
                </span>
            </div>

            <div className="container my-5">
                <h4 className="fw-bold text-center mt-4 mb-4">ĐỀ THI THỬ IELTS</h4>

                <div className="row">
                    <div className="col-lg-9">
                        {examList.map((e) => (
                            <div
                                key={e.id}
                                className="d-flex justify-content-between align-items-center border p-3 rounded mb-3"
                            >
                                <div>
                                    <div className="fw-bold">{e.name}</div>
                                    <div className="text-muted small">
                                        50 câu • Theo cấu trúc đề thi IELTS
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => downloadPDF(e.file)}
                                >
                                    Tải ngay →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
