import React from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
import { deleteSweet } from '../../redux/slices/sweetsSlice';
import toast from 'react-hot-toast';

const DeleteConfirmModal = ({ sweet, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSweet(sweet._id)).unwrap();
      toast.success('Sweet deleted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to delete sweet');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-dark-card rounded-xl shadow-2xl max-w-md w-full"
        >
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                <FiAlertTriangle className="text-3xl text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
              Delete Sweet?
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Are you sure you want to delete "{sweet.name}"? This action cannot be undone.
            </p>

            <div className="flex justify-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;