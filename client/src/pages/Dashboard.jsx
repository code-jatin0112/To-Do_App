import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import ConfirmModal from "../components/common/ConfirmModal";

import StatsCards from "../components/todo/StatsCards";
import ProgressCard from "../components/todo/ProgressCard";
import DueDateCard from "../components/todo/DueDateCard";
import TodoFilters from "../components/todo/TodoFilters";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import TaskChart from "../components/todo/TaskChart";
import ActivityChart from "../components/todo/ActivityChart";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const formRef = useRef(null);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingTodo, setEditingTodo] = useState(null);

  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

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
      toast.error("Failed to update todo");
    }
  };

  const confirmDelete = (id) => {
    setDeleteTodoId(id);
  };

  const handleDeleteTodo = async () => {
    if (!deleteTodoId) return;

    try {
      setDeleteLoading(true);

      await deleteTodo(deleteTodoId);

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== deleteTodoId)
      );

      if (editingTodo?._id === deleteTodoId) {
        setEditingTodo(null);
      }

      toast.success("Todo deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
      setDeleteTodoId(null);
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
          ? "Task Completed 🎉"
          : "Task marked Pending"
      );
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
    const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (todo.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        todo.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        todo.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [todos, search, statusFilter, priorityFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />

          <h2 className="text-2xl font-bold text-slate-700 dark:text-white">
            Loading your workspace...
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-[1700px]">

          <Header
            user={user}
            onLogout={handleLogout}
            search={search}
            setSearch={setSearch}
          />

          {/* Stats */}
          <section className="mt-8">
            <StatsCards todos={filteredTodos} />
          </section>

          {/* Progress + Summary */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
            <ProgressCard todos={filteredTodos} />
            <DueDateCard todos={filteredTodos} />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <TodoFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
            />
          </section>

          {/* Todo List */}
          <section className="mt-8">
            <TodoList
              todos={filteredTodos}
              onDelete={confirmDelete}
              onEdit={handleEditTodo}
              onToggleStatus={handleToggleStatus}
            />
          </section>

          {/* Charts */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
            <TaskChart todos={filteredTodos} />
            <ActivityChart todos={filteredTodos} />
          </section>

          {/* Create / Edit Task */}
          <section
            ref={formRef}
            className="mt-8 scroll-mt-24"
          >
            <TodoForm
              onAddTodo={handleAddTodo}
              editingTodo={editingTodo}
              onUpdateTodo={handleUpdateTodo}
              onCancelEdit={handleCancelEdit}
            />
          </section>
                    <ConfirmModal
            open={deleteTodoId !== null}
            title="Delete Todo?"
            message="This action cannot be undone."

            loading={deleteLoading}

            onConfirm={handleDeleteTodo}
            onCancel={() => setDeleteTodoId(null)}
          />

        </div>
      </main>
    </div>
  );
}