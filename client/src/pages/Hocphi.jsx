import React from "react";

import PencilIcon from "../assets/pencil.png";
import GraduationIcon from "../assets/hat.png";
import BrainIcon from "../assets/artificial-intelligence-ico.png";
import TestIcon from "../assets/checklist.png";
import VideoIcon from "../assets/video.png";
import BgImage from "../assets/demo.png";

export default function HocPhi() {
    return (
        <div className="w-100 py-5 bg-light">
            <div className="container text-center">

                <h1 className="fw-bold mb-2">Học phí siêu chất, thành thơi học tập</h1>
                <p className="text-secondary mb-5">
                    Không giới hạn môn học và lượt học
                </p>

                <div className="row g-4 justify-content-center">

                    <div className="col-md-5">
                        <div
                            className="p-4 rounded-4 shadow-sm h-100 price-box"
                            style={{ background: "#e9f0ff", transition: "0.3s" }}
                        >
                            <div
                                className="rounded-4 d-flex align-items-center justify-content-between px-4 py-3 mb-4"
                                style={{ background: "#1e5bff", color: "white" }}
                            >
                                <div className="text-start">
                                    <div className="fw-bold fs-5">Gói cơ bản</div>
                                    <div className="fw-bold fs-3">1.290.000 VND/Năm</div>
                                </div>

                                <img
                                    src={PencilIcon}
                                    width={50}
                                    alt="pencil"
                                    style={{ objectFit: "contain" }}
                                />
                            </div>

                            <div className="text-start px-3">
                                <PriceItem
                                    icon={BrainIcon}
                                    title="Học tập thích ứng"
                                    desc="Hệ thống câu hỏi trắc nghiệm thích ứng giúp nắm vững kiến thức từng chuyên đề"
                                />
                                <PriceItem
                                    icon={TestIcon}
                                    title="Bài kiểm tra mẫu"
                                    desc="Làm quen dạng bài giúp học sinh nắm phương pháp giải nhanh"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div
                            className="p-4 rounded-4 shadow-sm h-100 price-box"
                            style={{ background: "#fff7d6", transition: "0.3s" }}
                        >
                            <div
                                className="rounded-4 d-flex align-items-center justify-content-between px-4 py-3 mb-4"
                                style={{ background: "#ffc107", color: "white" }}
                            >
                                <div className="text-start">
                                    <div className="fw-bold fs-5">Gói đầy đủ</div>
                                    <div className="fw-bold fs-3">1.890.000 VND/Năm</div>
                                </div>

                                <img
                                    src={GraduationIcon}
                                    width={124}
                                    alt="graduation"
                                    style={{ objectFit: "contain" }}
                                />
                            </div>

                            <div className="text-start px-3">
                                <PriceItem
                                    icon={BrainIcon}
                                    title="Học tập thích ứng"
                                    desc="Hệ thống bài giảng thích ứng giúp học sinh nắm kiến thức tốt hơn"
                                />
                                <PriceItem
                                    icon={TestIcon}
                                    title="Bài kiểm tra mẫu"
                                    desc="Làm quen dạng bài và cấu trúc đề thi"
                                />
                                <PriceItem
                                    icon={VideoIcon}
                                    title="Video bài giảng"
                                    desc="Hướng dẫn phương pháp giải bài tập nâng cao"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container mt-5 pt-4">
                    <div className="row align-items-center">

                        <div className="col-md-6 text-start">

                            <h2 className="fw-bold mb-3">
                                Tải App ngay,<br />
                                <span className="text-warning">Ônluyện mọi nơi mọi lúc</span>
                            </h2>

                            <p className="text-secondary">
                                15 ngày học thử miễn phí, Cài đặt nhanh chóng, Đầy đủ tính năng
                            </p>

                            <div className="d-flex gap-3 my-3">
                                <a href="https://play.google.com/store/apps/details?id=vn.onluyen.app" target="_blank">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt="Google Play"
                                        height="48"
                                        style={{ cursor: "pointer" }}
                                    />
                                </a>

                                <a href="https://apps.apple.com/us/app/onluyen/id1506873010" target="_blank">
                                    <img
                                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                        alt="App Store"
                                        height="48"
                                        style={{ cursor: "pointer" }}
                                    />
                                </a>
                            </div>

                            <p className="text-secondary small mt-3">
                                Hỗ trợ các phiên bản từ Android 4.4 và iOS 10.0 trở lên
                            </p>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src={BgImage}
                                alt="App Devices"
                                className="img-fluid"
                                style={{ maxWidth: "100%" }}
                            />
                        </div>

                    </div>
                </div>

            </div>

            <style>{`
        .price-box {
          border-radius: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1);
          transform: translateY(0);
        }
        .price-box:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
        }
      `}</style>
        </div>
    );
}

function PriceItem({ icon, title, desc }) {
    return (
        <div className="mb-4 d-flex align-items-start">
            <img
                src={icon}
                width="48"
                className="me-3"
                style={{ objectFit: "contain" }}
                alt=""
            />
            <div>
                <h5 className="fw-bold">{title}</h5>
                <p className="text-secondary m-0">{desc}</p>
            </div>
        </div>
    );
}
