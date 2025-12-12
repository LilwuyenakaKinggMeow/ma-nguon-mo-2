import React, { useState } from "react";

export default function AdminPost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [category, setCategory] = useState("hot");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("category", category);
        if (image) formData.append("image", image);

        const res = await fetch("http://localhost:5000/tintuc", {
            method: "POST",
            body: formData,
        });

        setLoading(false);
        alert("🎉 Đăng bài thành công!");

        setTitle("");
        setSummary("");
        setCategory("hot");
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "800px" }}>
            <div className="p-4 rounded-4 shadow-sm mb-4"
                 style={{
                     background: "linear-gradient(135deg, #007bff, #6610f2)",
                     color: "white"
                 }}>
                <h2 className="fw-bold mb-1">📝 Đăng bài viết mới</h2>
                <p className="opacity-75 m-0">Trang dành riêng cho quản trị viên</p>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Tiêu đề</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Tóm tắt</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Chuyên mục</label>
                            <select
                                className="form-select form-select-lg"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="hot">🔥 Tin nổi bật</option>
                                <option value="week">📅 Giáo dục tuần qua</option>
                                <option value="edtech">💡 Xu hướng</option>
                                <option value="idea">✨ Sáng kiến giáo dục</option>
                                <option value="view">👀 Góc nhìn</option>
                                <option value="update">📘 Cập nhật nội dung</option>
                                <option value="blog">✍️ Blog học tập</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Ảnh minh họa</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                            />
                        </div>

                        {preview && (
                            <div className="mb-4 text-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="img-fluid rounded-3 shadow-sm"
                                    style={{ maxHeight: "260px", objectFit: "cover" }}
                                />
                            </div>
                        )}

                        <button
                            className="btn btn-primary btn-lg w-100 fw-bold py-2"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "⏳ Đang đăng bài..." : "📤 Đăng bài"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
