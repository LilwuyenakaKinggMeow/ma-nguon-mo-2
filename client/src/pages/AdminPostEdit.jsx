import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminPostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/tintuc/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setSummary(data.summary);
                setCategory(data.category);
                setOldImage(data.image);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("category", category);

        if (image) {
            formData.append("image", image);
        }

        await fetch(`http://localhost:5000/tintuc/${id}`, {
            method: "PUT",
            body: formData,
        });

        alert("Cập nhật thành công!");
        navigate("/admin/posts");
    };

    return (
        <div className="container mt-4">
            <h2>✏️ Chỉnh sửa bài viết</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Tiêu đề</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Tóm tắt</label>
                    <textarea
                        className="form-control"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Chuyên mục</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="hot">Tin nổi bật</option>
                        <option value="week">Giáo dục tuần qua</option>
                        <option value="edtech">Xu hướng</option>
                        <option value="idea">Sáng kiến giáo dục</option>
                        <option value="view">Góc nhìn</option>
                        <option value="update">Cập nhật nội dung</option>
                        <option value="blog">Blog học tập</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Ảnh hiện tại</label><br />
                    {oldImage && (
                        <img
                            src={oldImage}
                            width="150"
                            className="mb-2"
                            style={{ borderRadius: "8px" }}
                        />
                    )}
                </div>

                <div className="mb-3">
                    <label>Ảnh mới (nếu có)</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <button className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
}
