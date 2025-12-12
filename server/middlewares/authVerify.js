import jwt from "jsonwebtoken";

export default function authVerify(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Thiếu header Authorization" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Thiếu token Bearer" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   //luu thong tin
    req.user = decoded;
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log("Verify token error:", err.message);

    return res.status(401).json({
      message:
        err.name === "TokenExpiredError"
          ? "Token đã hết hạn"
          : "Token không hợp lệ",
    });
  }
}
