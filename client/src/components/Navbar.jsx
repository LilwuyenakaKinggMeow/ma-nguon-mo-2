import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OnluyenLogo from '../assets/logo_new.svg';

// 🔥 Lấy token + username thật từ localStorage
const useAuth = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // 👈 Lấy tên người dùng

    return {
        isLoggedIn: !!token,
        userName: username || 'Người Dùng'
    };
};

export default function Navbar() {
    const { isLoggedIn, userName } = useAuth();
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // 👈 Xóa tên khỏi localStorage
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setScrolled(currentScrollY > 50);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-top'} ${hidden ? 'navbar-hidden' : ''}`}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={OnluyenLogo} alt="Onluyen Logo" className="navbar-logo" />
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                    aria-controls="navMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                        <li className="nav-item"><Link className="nav-link" to="/tintuc">Tin tức</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/kythi">Kỳ thi</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/hocphi">Học phí</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/flashcard">Flashcard</Link></li>
                    </ul>

                    <div className="d-flex ms-3 align-items-center">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white me-3 fw-medium">Chào, {userName}!</span>
                                <button onClick={handleLogout} className="btn btn-outline-light">Đăng xuất</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light me-2">Đăng nhập</Link>
                                <Link to="/register" className="btn btn-light">Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
