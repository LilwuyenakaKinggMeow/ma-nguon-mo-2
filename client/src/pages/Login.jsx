import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectMsg = location.state?.message;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsError(false);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ⭐ Lưu token
      localStorage.setItem("token", res.data.token);

      // ⭐ Lưu username
      localStorage.setItem("username", res.data.user.name);

      // ⭐ LƯU ROLE - QUAN TRỌNG
      localStorage.setItem("role", res.data.user.role);

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      navigate("/");
    } catch (err) {
      setIsError(true);
      setError(
        err.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra Email/Mật khẩu."
      );
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div
        className="bg-white p-5 rounded-3 shadow-lg"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Đăng nhập</h2>

        {redirectMsg && (
          <div className="alert alert-warning text-center my-2">{redirectMsg}</div>
        )}

        {error && (
          <div
            className={`alert ${
              isError ? "alert-danger" : "alert-success"
            } text-center`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="VD: example@gmail.com"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium">Mật khẩu</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-secondary small mt-3">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-decoration-none fw-semibold">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
