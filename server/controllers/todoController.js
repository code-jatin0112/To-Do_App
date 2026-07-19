const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if(!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: todos.length,
            todos,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "server Error",
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        let todo = await Todo.findById(id);

        if(!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        if(todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        todo = await Todo.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: " Unauthorized",
            });
        }

        await Todo.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};