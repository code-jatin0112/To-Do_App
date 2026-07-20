import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle
                  size={40}
                  className="text-red-600"
                />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-slate-800">
              Delete Task?
            </h2>

            <p className="mt-3 text-center text-slate-500">
              This action cannot be undone.
              <br />
              Are you sure you want to delete this task?
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition disabled:opacity-70"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}