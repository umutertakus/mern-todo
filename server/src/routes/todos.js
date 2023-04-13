import express from "express";
import { TodoModel } from "../models/Todos.js";

const router = express.Router();

router.post("/addTodo", async (req, res) => {
  try {
    const { content, completed, owner } = req.body;

    const todo = new TodoModel({
      content,
      completed,
      owner,
    });
    await todo.save();

    res.status(201).json({ message: "Todo added successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTodos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const todos = await TodoModel.find({
      owner: { $in: userId },
    });

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateTodo", async (req, res) => {
  try {
    const { todoId, content, completed } = req.body;

    const todo = await TodoModel.findById(todoId);
    todo.content = content;
    todo.completed = completed;
    await todo.save();

    res.status(200).json({ message: "Todo updated successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as todoRouter };
