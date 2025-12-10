import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Chọn file trước");

    const formData = new FormData();
    formData.append("image", file); // phải trùng key "image" với backend

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setImgUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>
        Upload
      </button>

      {imgUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Ảnh đã upload:</p>
          <img src={imgUrl} alt="uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}
