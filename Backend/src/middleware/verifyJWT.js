import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);


    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT Error:", error.name);
    console.log("Message:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
