import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, error: "Not authorized, no token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error(err);
      return res
        .status(401)
        .json({ success: false, error: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, no token" });
  }
};
