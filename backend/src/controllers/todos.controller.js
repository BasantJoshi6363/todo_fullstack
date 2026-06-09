
import Todo from "../models/todos.model.js"

// CREATE NEWS
export const createTodo = async (req, res) => {
  try {

    const { title, description } = req.body;



    const task = await Todo.create({
      title,
      description,
      writtenBy: req.user.id,
    });

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
    const todos = await Todo.find({}).populate("writtenBy", "name email").lean().sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      todos
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
      .populate("writtenBy", "name email role");

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


// UPDATE NEWS
export const updateTodo = async (req, res) => {
  try {

    const { title, description, isFinished } = req.body;

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

