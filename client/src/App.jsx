import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Gallery from "./components/Gallery";
import Footer from "./components/footer";
import Users from "./pages/users";
import Login from "./pages/login";
import Register from "./pages/register";
import TinTuc from "./pages/news";
import KyThi from "./pages/Kythi";
import HocPhi from "./pages/Hocphi";
import Flashcard from "./pages/Flashcard";
import FlashcardDetail from "./pages/FlashcardDetail";
import Upload from "./components/Upload";
import FloatingButton from "./components/FloatingButton";
import ChatBubble from "./components/ChatBubble";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [openChat, setOpenChat] = useState(false);

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
