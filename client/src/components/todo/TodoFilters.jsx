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
      className="
        rounded-3xl
        border
        border-stone-200
        dark:border-zinc-800
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        shadow-lg
        p-6
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            Filters & Search
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Quickly find and organize your tasks.
          </p>

        </div>

        <button
          onClick={resetFilters}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-stone-200
            dark:border-zinc-700
            bg-stone-100
            dark:bg-zinc-800
            px-4
            py-2.5
            text-sm
            font-medium
            text-stone-700
            dark:text-stone-300
            transition
            hover:bg-stone-200
            dark:hover:bg-zinc-700
          "
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      {/* Main Filters */}

      <div className="grid gap-5 lg:grid-cols-5">

        {/* Search */}

        <div className="relative lg:col-span-2">

          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-stone-100
              dark:bg-zinc-800
              py-3.5
              pl-11
              pr-4
              text-stone-800
              dark:text-stone-100
              placeholder:text-stone-400
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
          />

        </div>

        {/* Status */}

        <div className="relative">

          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-stone-100
              dark:bg-zinc-800
              py-3.5
              pl-11
              pr-4
              text-stone-700
              dark:text-stone-200
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-stone-100
              dark:bg-zinc-800
              py-3.5
              pl-11
              pr-4
              text-stone-700
              dark:text-stone-200
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-stone-100
              dark:bg-zinc-800
              py-3.5
              pl-11
              pr-4
              text-stone-700
              dark:text-stone-200
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
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

      {/* Secondary Filters */}

      <div className="mt-5 grid gap-5 lg:grid-cols-3">

        {/* Labels */}

        <div className="relative">

          <Tag
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <select
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-stone-200
              dark:border-zinc-700
              bg-stone-100
              dark:bg-zinc-800
              py-3.5
              pl-11
              pr-4
              text-stone-700
              dark:text-stone-200
              outline-none
              transition-all
              focus:border-stone-400
              focus:ring-2
              focus:ring-stone-300
            "
          >
            <option value="All">All Labels</option>

            {labels.map((label) => (
              <option
                key={label}
                value={label}
              >
                {label}
              </option>
            ))}

          </select>

        </div>

        {/* Favorites */}

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            px-5
            py-3.5
            transition-all
            ${
              showFavorites
                ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300"
                : "border-stone-200 bg-stone-100 text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-stone-200"
            }
          `}
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
          className={`
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            px-5
            py-3.5
            transition-all
            ${
              showArchived
                ? "border-stone-400 bg-stone-200 text-stone-800 dark:border-stone-500 dark:bg-stone-700 dark:text-stone-100"
                : "border-stone-200 bg-stone-100 text-stone-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-stone-200"
            }
          `}
        >
          <Archive size={18} />

          Archived

        </button>

      </div>

    </motion.div>
  );
}