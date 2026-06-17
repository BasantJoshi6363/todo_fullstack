
import Todo from "../models/todos.model.js"
import moment from "moment";
import User from "../models/users.model.js";

// CREATE NEWS
export const createTodo = async (req, res) => {
  try {
    const { id } = req.user;

    const { title, description, priority } = req.body;

    const task = await Todo.create({
      title,
      description,
      priority,
      author: id
    });
    const user = await User.findById(id);
    user.todos.push(task._id);
    user.save();

    res.status(201).json({
      success: true,
      message: "task Created",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL NEWS
export const getAllTodo = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password -refreshToken").populate("todos")



    return res.status(200).json({
      success: true,
      todo: user.todos
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// GET SINGLE NEWS
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate("Todos", "name email role");

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchCompletedTask = async (req, res) => {
  try {
    const todo = await Todo.find({ isFinished: true, author: req.user.id });


    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const pendingTask = async (req, res) => {
  try {
    const todo = await Todo.find({ isFinished: false, author: req.user.id })
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE NEWS
export const updateTodo = async (req, res) => {
  try {

    const task = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.status(200).json({
      success: true,
      message: "task Updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE NEWS
export const deleteTodo = async (req, res) => {
  try {


    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "todo Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -refreshToken");
    const totalTask = await user.todos.length;

    const data = await user.populate("todos");

    const finishedTask = await data.todos.filter(val => val.isFinished).length;



    const notFinishedTask = totalTask - finishedTask;

    function calculatePercent(task, total) {
      return (task / total) * 100;
    }
    const finishedTaskPercent = calculatePercent(finishedTask, totalTask);
    const notFinishedTaskPercent = calculatePercent(notFinishedTask, totalTask);
    // const finishTaskPercent =
    //   totalTask > 0 ? (finishedTask / totalTask) * 100 : 0;

    // const unFinishTaskPercent =
    //   totalTask > 0 ? (notFinishedTask / totalTask) * 100 : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalTask,
        finishedTask,
        finishPercent: Math.ceil(finishedTaskPercent),
        notFinishPercent: Math.ceil(notFinishedTaskPercent)
      },
    });
  } catch (error) {

  }
}



export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const findNewsByCategory = await News.find({
      category: category
    })

    res.status(200).json({
      success: true,
      news: findNewsByCategory,
      message: "news fetched by category"
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

