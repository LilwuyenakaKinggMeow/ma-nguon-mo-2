import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Gallery from "./components/Gallery";
import Footer from "./components/footer";
import FloatingButton from "./components/FloatingButton";
import ChatBubble from "./components/ChatBubble";
import Upload from "./components/Upload";

// Pages
import Users from "./pages/users";
import Login from "./pages/login";
import Register from "./pages/register";
import TinTuc from "./pages/news";
import KyThi from "./pages/Kythi";
import HocPhi from "./pages/Hocphi";
import Flashcard from "./pages/Flashcard";
import FlashcardDetail from "./pages/FlashcardDetail";

// Admin pages
import AdminPost from "./pages/AdminPost";
import AdminPostList from "./pages/AdminPostList";
import AdminPostEdit from "./pages/AdminPostEdit";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [openChat, setOpenChat] = useState(false);

    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
                .get("http://localhost:5000/api/users/me")
                .then((res) => setCurrentUser(res.data))
                .catch(() => {
                    localStorage.removeItem("token");
                    delete axios.defaults.headers.common["Authorization"];
                });
        }
    }, []);

    const ProtectedRoute = ({ children }) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return (
                <Navigate
                    to="/login"
                    replace
                    state={{
                        message:
                            "Vui lòng đăng nhập, hoặc nếu chưa có tài khoản xin hãy đăng ký.",
                    }}
                />
            );
        }
        return children;
    };

    const AdminRoute = ({ children }) => {
        const token = localStorage.getItem("token");
        if (!token) return <Navigate to="/login" replace />;

        if (!currentUser) return null;

        if (currentUser.role !== "admin") {
            return (
                <Navigate
                    to="/"
                    replace
                    state={{ message: "Bạn không có quyền truy cập trang quản trị!" }}
                />
            );
        }

        return children;
    };

    return (
        <>
            <Navbar user={currentUser} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <Gallery />
                        </>
                    }
                />

                <Route path="/tintuc" element={<TinTuc />} />

                {/* ADMIN - ĐĂNG BÀI */}
                <Route
                    path="/admin/post"
                    element={
                        <AdminRoute>
                            <AdminPost />
                        </AdminRoute>
                    }
                />

                {/* ADMIN - DANH SÁCH BÀI VIẾT */}
                <Route
                    path="/admin/posts"
                    element={
                        <AdminRoute>
                            <AdminPostList />
                        </AdminRoute>
                    }
                />

                {/* ✔ ADMIN - SỬA BÀI VIẾT (ĐÃ SỬA ROUTE) */}
                <Route
                    path="/admin/post/edit/:id"
                    element={
                        <AdminRoute>
                            <AdminPostEdit />
                        </AdminRoute>
                    }
                />

                {/* Other pages */}
                <Route path="/kythi" element={<KyThi />} />
                <Route path="/hocphi" element={<HocPhi />} />
                <Route path="/flashcard" element={<Flashcard />} />

                <Route
                    path="/flashcard/:id"
                    element={
                        <ProtectedRoute>
                            <FlashcardDetail />
                        </ProtectedRoute>
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload" element={<Upload />} />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Footer />

            <FloatingButton onClick={() => setOpenChat(!openChat)} />
            {openChat && <ChatBubble onClose={() => setOpenChat(false)} />}
        </>
    );
}
