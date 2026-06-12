import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { createTodo, deleteTodo, fetchCompletedTask, getAllTodo, pendingTask, updateTodo } from "../controllers/todos.controller.js";





const todoRouter = express.Router();


// CREATE NEWS
todoRouter.post(
  "/create",
  authMiddleware,
  createTodo
);


// GET ALL NEWS
todoRouter.get("/", getAllTodo);
todoRouter.get("/completed-task", authMiddleware, fetchCompletedTask);
todoRouter.get("/pending-task", authMiddleware, pendingTask);
todoRouter.put("/:id", authMiddleware, updateTodo);
todoRouter.delete("/:id", authMiddleware, deleteTodo);


export default todoRouter;