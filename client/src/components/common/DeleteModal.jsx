import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

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
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#242527]/45 backdrop-blur-md"
          />

          {/* Modal */}

          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 24,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 24,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                border-[#BCB9AC]
                bg-[#FCFBF8]
                shadow-2xl
                shadow-[#6F6558]/20
                dark:border-[#4B4540]
                dark:bg-[#2B2B2B]
              "
            >
              {/* Decorative Top */}

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F2ECE4] to-transparent dark:from-[#3B3733]" />

              {/* Close */}

              <button
                onClick={onClose}
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
                  bg-[#F2ECE4]
                  text-[#6F6558]
                  transition
                  hover:bg-[#E6DED3]
                  dark:bg-[#3A3A3A]
                  dark:text-[#BCB9AC]
                "
              >
                <X size={18} />
              </button>

              {/* Content */}

              <div className="relative p-8">

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.08 }}
                  className="
                    mx-auto
                    mb-6
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EFE3D8]
                    dark:bg-[#5E4B3F]/30
                  "
                >
                  <AlertTriangle
                    size={40}
                    className="text-[#8F6948]"
                  />
                </motion.div>

                <h2 className="text-center text-2xl font-bold text-[#242527] dark:text-[#F7F4EF]">
                  Delete Task?
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-center leading-7 text-[#6F6558] dark:text-[#BCB9AC]">
                  This action cannot be undone.
                  <br />
                  Are you sure you want to permanently delete this task?
                </p>

                {/* Warning */}

                <div
                  className="
                    mt-7
                    rounded-2xl
                    border
                    border-[#D7C5B5]
                    bg-[#F6EEE5]
                    p-4
                    dark:border-[#5E4B3F]
                    dark:bg-[#3A312C]
                  "
                >
                  <p className="text-center text-sm font-medium text-[#8F6948] dark:text-[#D7C5B5]">
                    Once deleted, this task cannot be recovered.
                  </p>
                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="
                      flex-1
                      rounded-2xl
                      border
                      border-[#BCB9AC]
                      bg-[#F2ECE4]
                      py-3.5
                      font-semibold
                      text-[#2F4A61]
                      transition
                      hover:bg-[#E8DFD4]
                      dark:border-[#4B4540]
                      dark:bg-[#3A3A3A]
                      dark:text-[#F7F4EF]
                    "
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                    }}
                    whileTap={{
                      scale: loading ? 1 : 0.98,
                    }}
                    onClick={onConfirm}
                    disabled={loading}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#6E4A36]
                      py-3.5
                      font-semibold
                      text-[#F7F4EF]
                      shadow-lg
                      shadow-[#6E4A36]/20
                      transition
                      hover:bg-[#5C3E2D]
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    "
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Delete
                      </>
                    )}
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