import jwt from "jsonwebtoken";
import Admin from "../models/users.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};



export const isSuperAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!(admin.role === "superadmin")) {
      return res.status(401).json({
        success: false,
        message: "not superadmin",

      });
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}