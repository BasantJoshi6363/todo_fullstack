import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todos.controller.js";





const todoRouter = express.Router();


// CREATE NEWS
todoRouter.post(
  "/create",
  authMiddleware,
  createTodo
);


// GET ALL NEWS
todoRouter.get("/", getAllTodo);
todoRouter.put("/:id", authMiddleware, updateTodo);
todoRouter.delete("/:id", authMiddleware, deleteTodo);


export default todoRouter;