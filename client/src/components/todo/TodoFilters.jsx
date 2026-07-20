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
        border-[#BCB9AC]/60
        dark:border-[#4B4540]
        bg-[#FCFBF8]/95
        dark:bg-[#2B2B2B]
        backdrop-blur-md
        shadow-xl shadow-[#2F4A61]/5
        p-6
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#242527] dark:text-[#F7F4EF]">
            Filters & Search
          </h2>

          <p className="mt-1 text-sm text-[#6F6558] dark:text-[#BCB9AC]">
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
            border-[#BCB9AC]
            dark:border-[#4B4540]
            bg-[#F2ECE4]
            dark:bg-[#343434]
            px-4
            py-2.5
            text-sm
            font-medium
            text-[#2F4A61]
            dark:text-[#F7F4EF]
            transition
            hover:bg-[#E7DDD2]
            dark:hover:bg-[#4B4540]
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78963]"
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
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              py-3.5
              pl-11
              pr-4
              text-[#242527]
              dark:text-[#F7F4EF]
              placeholder:text-[#A78963]
              outline-none
              transition-all
              focus:border-[#2F4A61]
              focus:ring-2
              focus:ring-[#5F8396]/30
            "
          />
        </div>

        {/* Status */}

        <div className="relative">
          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78963]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              py-3.5
              pl-11
              pr-4
              text-[#242527]
              dark:text-[#F7F4EF]
              outline-none
              transition-all
              focus:border-[#2F4A61]
              focus:ring-2
              focus:ring-[#5F8396]/30
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78963]"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              py-3.5
              pl-11
              pr-4
              text-[#242527]
              dark:text-[#F7F4EF]
              outline-none
              transition-all
              focus:border-[#2F4A61]
              focus:ring-2
              focus:ring-[#5F8396]/30
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78963]"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              py-3.5
              pl-11
              pr-4
              text-[#242527]
              dark:text-[#F7F4EF]
              outline-none
              transition-all
              focus:border-[#2F4A61]
              focus:ring-2
              focus:ring-[#5F8396]/30
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78963]"
          />

          <select
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-2xl
              border
              border-[#BCB9AC]
              dark:border-[#4B4540]
              bg-[#F7F4EF]
              dark:bg-[#343434]
              py-3.5
              pl-11
              pr-4
              text-[#242527]
              dark:text-[#F7F4EF]
              outline-none
              transition-all
              focus:border-[#2F4A61]
              focus:ring-2
              focus:ring-[#5F8396]/30
            "
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
                ? "border-[#A78963] bg-[#F4E7D7] text-[#8F6948] dark:border-[#A78963] dark:bg-[#8F6948]/20 dark:text-[#F4E7D7]"
                : "border-[#BCB9AC] bg-[#F2ECE4] text-[#2F4A61] dark:border-[#4B4540] dark:bg-[#343434] dark:text-[#F7F4EF]"
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
                ? "border-[#2F4A61] bg-[#E7F1F4] text-[#2F4A61] dark:border-[#5F8396] dark:bg-[#2F4A61]/20 dark:text-[#E7F1F4]"
                : "border-[#BCB9AC] bg-[#F2ECE4] text-[#2F4A61] dark:border-[#4B4540] dark:bg-[#343434] dark:text-[#F7F4EF]"
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