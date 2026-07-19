import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import StatsCards from "../components/todo/StatsCards";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import Button from "../components/common/Button";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.todos);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await createTodo(todoData);

      setTodos((prev) => [response.todo, ...prev]);

      toast.success("Todo created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create todo");
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const response = await updateTodo(id, updatedData);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? response.todo : todo
        )
      );

      setEditingTodo(null);

      toast.success("Todo updated!");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );

      if (editingTodo?._id === id) {
        setEditingTodo(null);
      }

      toast.success("Todo deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (todo) => {
    try {
      const response = await updateTodo(todo._id, {
        status:
          todo.status === "Completed"
            ? "Pending"
            : "Completed",
      });

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? response.todo : t
        )
      );

      toast.success(
        response.todo.status === "Completed"
          ? "Marked as completed!"
          : "Marked as pending!"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome back,
              <span className="text-indigo-600">
                {" "}
                {user?.name}
              </span>
            </h1>

            <p className="text-slate-500 mt-2">
              Organize your work efficiently.
            </p>
          </div>

          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <StatsCards todos={todos} />

        <div className="mt-10">
          <TodoForm
            onAddTodo={handleAddTodo}
            editingTodo={editingTodo}
            onUpdateTodo={handleUpdateTodo}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="mt-10">
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </div>
  );
}