import express from "express";

import {
    register,
    login,
    logout,
    getProfile,
    deleteUser,
    updateUser,
    forgotPassword,
    resetPassword,
} from "../controllers/users.controller.js";
import { authMiddleware, isSuperAdmin } from "../middlewares/auth.middleware.js";


const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetpassword/:token", resetPassword);


userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/profile", authMiddleware, getProfile);
// userRouter.get("/all", authMiddleware, getAllAdmin);
userRouter.put("/updateuser", authMiddleware, updateUser);

userRouter.delete("/deleteuser", authMiddleware, deleteUser);


export default userRouter;