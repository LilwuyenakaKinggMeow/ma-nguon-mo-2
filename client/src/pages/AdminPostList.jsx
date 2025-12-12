import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPostList() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await fetch("http://localhost:5000/tintuc");
        const data = await res.json();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;

        await fetch(`http://localhost:5000/tintuc/${id}`, {
            method: "DELETE",
        });

        alert("Đã xóa bài viết!");
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container mt-5">

            <div
                className="p-4 mb-4 rounded-4 shadow-sm d-flex justify-content-between align-items-center"
                style={{
                    background: "linear-gradient(135deg, #20c997, #0d6efd)",
                    color: "white",
                }}
            >
                <div>
                    <h2 className="fw-bold mb-1">📚 Quản lý bài viết</h2>
                </div>

                <Link
                    to="/admin/post"
                    className="btn btn-light fw-semibold px-4 py-2 shadow-sm"
                    style={{ borderRadius: "12px" }}
                >
                    ➕ Đăng bài mới
                </Link>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">

                    {/* Bảng */}
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Chuyên mục</th>
                                <th>Ngày đăng</th>
                                <th className="text-center">Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        Chưa có bài viết nào!
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post._id}>
                                        <td>
                                            <img
                                                src={post.image}
                                                alt="thumb"
                                                style={{
                                                    width: "80px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </td>
                                        <td className="fw-semibold">{post.title}</td>
                                        <td>{post.category}</td>
                                        <td>{new Date(post.createdAt).toLocaleString()}</td>

                                        <td className="text-center">
                                            <Link
                                                to={`/admin/post/edit/${post._id}`}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                Sửa
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(post._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
