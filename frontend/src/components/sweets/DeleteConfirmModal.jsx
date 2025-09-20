import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';
import { deleteSweet } from '../../redux/slices/sweetsSlice';
import toast from 'react-hot-toast';

const DeleteConfirmModal = ({ sweet, onClose }) => {
  const dispatch = useDispatch();
  const isDeleting = useSelector(state => state.sweets.operationLoading.delete[sweet._id]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await dispatch(deleteSweet(sweet._id)).unwrap();
      toast.success('Sweet deleted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to delete sweet');
      setIsProcessing(false);
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
                {isProcessing ? (
                  <FiLoader className="text-3xl text-red-600 dark:text-red-400 animate-spin" />
                ) : (
                  <FiAlertTriangle className="text-3xl text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
              {isProcessing ? 'Deleting Sweet...' : 'Delete Sweet?'}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              {isProcessing 
                ? 'Please wait while we remove this sweet...' 
                : `Are you sure you want to delete "${sweet.name}"? This action cannot be undone.`
              }
            </p>

            <div className="flex justify-center space-x-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isProcessing}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;