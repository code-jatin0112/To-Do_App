import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-white/40 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}

              <button
                onClick={onCancel}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>

              {/* Content */}

              <div className="p-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20"
                >
                  <AlertTriangle
                    size={42}
                    className="text-red-600 dark:text-red-400"
                  />
                </motion.div>

                <h2 className="text-center text-2xl font-bold text-slate-800 dark:text-white">
                  {title}
                </h2>

                <p className="mt-4 text-center text-slate-500 dark:text-slate-400 leading-relaxed">
                  {message}
                </p>

                {/* Warning */}

                <div className="mt-6 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4">
                  <p className="text-sm text-red-600 dark:text-red-300 text-center">
                    This action cannot be undone.
                  </p>
                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={onCancel}
                    className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-3 font-semibold text-slate-700 dark:text-slate-200 transition"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={onConfirm}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 py-3 font-semibold text-white shadow-lg transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}