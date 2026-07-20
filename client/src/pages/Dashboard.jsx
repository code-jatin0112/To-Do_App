import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  const [deleteTodoId, setDeleteTodoId] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  /* ---------------- Filters ---------------- */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const [labelFilter, setLabelFilter] =
    useState("All");

  const [showFavorites, setShowFavorites] =
    useState(false);

  const [showArchived, setShowArchived] =
    useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ---------------- API ---------------- */

  const fetchTodos = async () => {
    try {
      const response = await getTodos();

      setTodos(response.todos || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await createTodo(todoData);

      setTodos((prev) => [
        response.todo,
        ...prev,
      ]);

      toast.success("Todo created!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create todo.");
    }
  };

  const handleUpdateTodo = async (
    id,
    updatedData
  ) => {
    try {
      const response = await updateTodo(
        id,
        updatedData
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id
            ? response.todo
            : todo
        )
      );

      setEditingTodo(null);

      toast.success("Todo updated!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update todo.");
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
        prev.filter(
          (todo) =>
            todo._id !== deleteTodoId
        )
      );

      if (
        editingTodo?._id === deleteTodoId
      ) {
        setEditingTodo(null);
      }

      toast.success("Todo deleted!");
    } catch (error) {
      console.error(error);

      toast.error("Delete failed.");
    } finally {
      setDeleteLoading(false);
      setDeleteTodoId(null);
    }
  };

  const handleToggleStatus = async (
    todo
  ) => {
    try {
      const response = await updateTodo(
        todo._id,
        {
          status:
            todo.status === "Completed"
              ? "Pending"
              : "Completed",
        }
      );

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id
            ? response.todo
            : t
        )
      );

      toast.success(
        response.todo.status ===
          "Completed"
          ? "Task Completed 🎉"
          : "Task marked Pending"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Status update failed."
      );
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  /* ---------------- Labels ---------------- */

  const labels = useMemo(() => {
    const unique = new Set();

    todos.forEach((todo) =>
      todo.labels?.forEach((label) =>
        unique.add(label)
      )
    );

    return [...unique].sort();
  }, [todos]);

  /* ---------------- Filtering ---------------- */

  const filteredTodos = useMemo(() => {
    let filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (todo.description || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (todo.notes || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        todo.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        todo.priority ===
          priorityFilter;

      const matchesLabel =
        labelFilter === "All" ||
        todo.labels?.includes(
          labelFilter
        );

      const matchesFavorite =
        !showFavorites ||
        todo.favorite;

      const matchesArchived =
        !showArchived ||
        todo.archived;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesLabel &&
        matchesFavorite &&
        matchesArchived
      );
    });

    switch (sortBy) {
      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "Priority":
        {
          const order = {
            High: 3,
            Medium: 2,
            Low: 1,
          };

          filtered.sort(
            (a, b) =>
              order[b.priority] -
              order[a.priority]
          );
        }
        break;

      case "DueDate":
        filtered.sort(
          (a, b) =>
            new Date(
              a.dueDate ||
                8640000000000000
            ) -
            new Date(
              b.dueDate ||
                8640000000000000
            )
        );
        break;

      case "AZ":
        filtered.sort((a, b) =>
          a.title.localeCompare(
            b.title
          )
        );
        break;

      case "ZA":
        filtered.sort((a, b) =>
          b.title.localeCompare(
            a.title
          )
        );
        break;

      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return filtered;
  }, [
    todos,
    search,
    statusFilter,
    priorityFilter,
    labelFilter,
    sortBy,
    showFavorites,
    showArchived,
  ]);

    /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F2ECE4]
          dark:bg-[#242527]
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex flex-col items-center"
        >
          <div
            className="
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
              border-stone-400
              border-t-transparent
              dark:border-stone-300
              dark:border-t-transparent
            "
          />

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-[#242527]
              dark:text-[#F7F4EF]
            "
          >
            Loading your workspace...
          </h2>

          <p
            className="
              mt-2
              text-[#6F6558]
              dark:text-[#BCB9AC]
            "
          >
            Preparing your tasks.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ---------------- Dashboard ---------------- */

  return (
    <div
      className="
        min-h-screen
        bg-[#F2ECE4]
        dark:bg-[#242527]
      "
    >
      <Sidebar />

      <main
        className="
          lg:ml-72
          min-h-screen
          px-5
          py-6
          sm:px-8
          lg:px-10
        "
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <Header
            user={user}
            onLogout={handleLogout}
            search={search}
            setSearch={setSearch}
          />

          {/* Welcome */}

          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8"
          >
            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
                text-[#242527]
                dark:text-[#F7F4EF]
              "
            >
              Welcome back,
              <span className="ml-2">
                {user?.name || "User"}
              </span>
              👋
            </h1>

            <p
              className="
                mt-2
                text-lg
                text-[#6F6558]
                dark:text-[#BCB9AC]
              "
            >
              Here's an overview of your productivity today.
            </p>
          </motion.section>

          {/* Stats */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .05,
            }}
            className="mt-8"
          >
            <StatsCards
              todos={filteredTodos}
            />
          </motion.section>

          {/* Progress Cards */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .1,
            }}
            className="
              mt-8
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            <ProgressCard
              todos={filteredTodos}
            />

            <DueDateCard
              todos={filteredTodos}
            />
          </motion.section>

                    {/* Filters */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="mt-10"
          >
            <TodoFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              labelFilter={labelFilter}
              setLabelFilter={setLabelFilter}
              labels={labels}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
              showArchived={showArchived}
              setShowArchived={setShowArchived}
            />
          </motion.section>

          {/* Todo List */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mt-10"
          >
            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                  Your Tasks
                </h2>

                <p className="mt-1 text-[#6F6558] dark:text-[#BCB9AC]">
                  {filteredTodos.length}{" "}
                  {filteredTodos.length === 1
                    ? "task"
                    : "tasks"}{" "}
                  available
                </p>

              </div>

            </div>

            <TodoList
              todos={filteredTodos}
              onDelete={confirmDelete}
              onEdit={handleEditTodo}
              onToggleStatus={handleToggleStatus}
            />
          </motion.section>

          {/* Analytics */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
            }}
            className="mt-10"
          >
            <div className="mb-6">

              <h2 className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                Analytics
              </h2>

              <p className="mt-1 text-[#6F6558] dark:text-[#BCB9AC]">
                Track your productivity and task distribution.
              </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              <TaskChart
                todos={filteredTodos}
              />

              <ActivityChart
                todos={filteredTodos}
              />

            </div>

          </motion.section>

          {/* Create / Edit Todo */}

          <motion.section
            ref={formRef}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              mt-10
              scroll-mt-24
            "
          >
            <div className="mb-6">

              <h2 className="text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                {editingTodo
                  ? "Edit Task"
                  : "Create New Task"}
              </h2>

              <p className="mt-1 text-[#6F6558] dark:text-[#BCB9AC]">
                {editingTodo
                  ? "Update the details below."
                  : "Capture your next task and stay organized."}
              </p>

            </div>

            <TodoForm
              onAddTodo={handleAddTodo}
              editingTodo={editingTodo}
              onUpdateTodo={handleUpdateTodo}
              onCancelEdit={handleCancelEdit}
            />
          </motion.section>

                    {/* Delete Confirmation */}

          <ConfirmModal
            open={deleteTodoId !== null}
            title="Delete Task?"
            message="This action cannot be undone. This task will be permanently removed from your workspace."
            loading={deleteLoading}
            onConfirm={handleDeleteTodo}
            onCancel={() =>
              setDeleteTodoId(null)
            }
          />

        </div>
      </main>
    </div>
  );
}