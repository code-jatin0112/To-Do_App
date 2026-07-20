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
      if (e.key === "Escape") onCancel();
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
          />

          {/* Modal */}

          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                duration: 0.22,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                border-stone-200
                dark:border-zinc-800
                bg-white/80
                dark:bg-zinc-900/80
                backdrop-blur-xl
                shadow-2xl
              "
            >
              {/* Decorative Background */}

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-rose-50 to-transparent dark:from-rose-900/10" />

              {/* Close */}

              <button
                onClick={onCancel}
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-stone-100
                  dark:bg-zinc-800
                  text-stone-500
                  transition
                  hover:bg-stone-200
                  dark:hover:bg-zinc-700
                "
              >
                <X size={18} />
              </button>

              {/* Content */}

              <div className="relative p-8">

                <motion.div
                  initial={{
                    scale: 0.8,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.08,
                  }}
                  className="
                    mx-auto
                    mb-6
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-rose-100
                    dark:bg-rose-500/15
                  "
                >
                  <AlertTriangle
                    size={40}
                    className="text-rose-500"
                  />
                </motion.div>

                <h2 className="text-center text-2xl font-bold text-stone-800 dark:text-stone-100">
                  {title}
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-center leading-7 text-stone-500 dark:text-stone-400">
                  {message}
                </p>

                {/* Warning Card */}

                <div
                  className="
                    mt-7
                    rounded-2xl
                    border
                    border-rose-200
                    dark:border-rose-500/20
                    bg-rose-50
                    dark:bg-rose-500/10
                    p-4
                  "
                >
                  <p className="text-center text-sm font-medium text-rose-600 dark:text-rose-300">
                    This action is permanent and cannot be undone.
                  </p>
                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={onCancel}
                    className="
                      flex-1
                      rounded-2xl
                      border
                      border-stone-200
                      dark:border-zinc-700
                      bg-stone-100
                      dark:bg-zinc-800
                      py-3.5
                      font-semibold
                      text-stone-700
                      dark:text-stone-200
                      transition
                      hover:bg-stone-200
                      dark:hover:bg-zinc-700
                    "
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={onConfirm}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-rose-500
                      py-3.5
                      font-semibold
                      text-white
                      shadow-lg
                      transition
                      hover:bg-rose-600
                    "
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