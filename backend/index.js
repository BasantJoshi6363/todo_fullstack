import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import newsRouter from "./src/routes/todos.route.js";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/users.routes.js";
import todoRouter from "./src/routes/todos.route.js";


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(
));


app.use("/api/auth", userRouter);
app.use("/api/todo", todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`server listening at port ${PORT}`);

})