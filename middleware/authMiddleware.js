import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from header: Authorization: Bearer <token>
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to req.user
    req.user = { id: decoded.id, role: decoded.role };

    next(); // go to controller
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};