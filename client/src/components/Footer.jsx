import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/logo-oke.svg";


export default function Footer() {
    return (
        <footer className="pt-5 pb-3" style={{ background: "#0A144A", color: "#e8e9f2" }}>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-4 mb-4">
                        <img src={FooterLogo} alt="logo" style={{ height: 70 }} />
                        <p className="mt-3 small">
                            Nền tảng giáo dục số hỗ trợ học sinh và giáo viên phát triển toàn diện.
                        </p>
                    </div>


                    <div className="col-md-4 mb-4">
                        <h5 className="text-light mb-3">Liên kết nhanh</h5>
                        <ul className="list-unstyled small">
                            <li><Link className="text-decoration-none text-light" to="/">Giới thiệu</Link></li>
                            <li><Link className="text-decoration-none text-light" to="/">Tin tức</Link></li>
                            <li><Link className="text-decoration-none text-light" to="/">Hỗ trợ</Link></li>
                            <li><Link className="text-decoration-none text-light" to="/">Chính sách bảo mật</Link></li>
                        </ul>
                    </div>


                    <div className="col-md-4">
                        <h5 className="text-light mb-3">Liên hệ</h5>
                        <p className="small">Email: nguyendeptraikhongbaogiosai@onluyen.vn</p>
                        <p className="small">Hotline: 037.329.7705</p>
                        <div className="mt-3 d-flex gap-3">
                            <i className="fab fa-facebook text-light fs-4"></i>
                            <i className="fab fa-youtube text-light fs-4"></i>
                            <i className="fab fa-instagram text-light fs-4"></i>
                        </div>
                    </div>
                </div>


                <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />


                <div className="text-center small mt-3">
                    © {new Date().getFullYear()} Onluyen – Edmicro. All rights reserved.
                </div>
            </div>
        </footer>
    );
}