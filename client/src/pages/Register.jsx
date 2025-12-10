import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setIsSuccess(false);

    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      

      setIsSuccess(true);
      setMsg('Đăng ký thành công! Đang chuyển sang trang đăng nhập...');
      
 
      setTimeout(() => nav('/login'), 2000); 

    } catch (err) {

      setIsSuccess(false);
      setMsg(err.response?.data?.message || 'Lỗi server, vui lòng thử lại sau.'); 
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="bg-white p-5 rounded-3 shadow-lg" style={{ width: '100%', maxWidth: '480px' }}>
        <h2 className="text-center mb-4 fw-bold text-dark">Đăng ký tài khoản</h2>
        {msg && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
            {msg}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label text-dark fw-medium">Tên hiển thị</label>
            <input 
              className="form-control form-control-lg" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
              placeholder="Nhập tên của bạn"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-dark fw-medium">Email</label>
            <input 
              type="email" 
              className="form-control form-control-lg" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              placeholder="VD: example@onluyen.vn"
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-dark fw-medium">Mật khẩu</label>
            <input 
              type="password" 
              className="form-control form-control-lg" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
              minLength={6}
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg w-100 mb-3" disabled={isSuccess}>
            Đăng ký
          </button>
          
        </form>
        
        <p className="text-center text-secondary small mt-3">
          Đã có tài khoản? <Link to="/login" className="text-decoration-none fw-semibold">Đăng nhập ngay</Link>
        </p>

      </div>
    </div>
  )
}