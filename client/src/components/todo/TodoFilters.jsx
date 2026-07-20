import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Flag,
  ArrowUpDown,
  RotateCcw,
  Tag,
  Star,
  Archive,
} from "lucide-react";

export default function TodoFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  labelFilter,
  setLabelFilter,
  labels = [],
  showFavorites,
  setShowFavorites,
  showArchived,
  setShowArchived,
}) {
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("Newest");

    if (setLabelFilter) setLabelFilter("All");
    if (setShowFavorites) setShowFavorites(false);
    if (setShowArchived) setShowArchived(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Filters & Search
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, sort and organize your workspace.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search title, description, notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="relative">
          <Flag
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Priority</option>
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          <ArrowUpDown
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Priority">Priority</option>
            <option value="DueDate">Due Date</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Labels */}
        <div className="relative">
          <Tag
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Labels</option>

            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Favorites */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex items-center justify-center gap-3 rounded-2xl border px-5 py-3 transition ${
            showFavorites
              ? "border-yellow-400 bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
              : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          }`}
        >
          <Star
            size={18}
            className={showFavorites ? "fill-current" : ""}
          />
          Favorites
        </button>

        {/* Archived */}
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`flex items-center justify-center gap-3 rounded-2xl border px-5 py-3 transition ${
            showArchived
              ? "border-indigo-400 bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
              : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          }`}
        >
          <Archive size={18} />
          Archived
        </button>
      </div>
    </motion.div>
  );
}