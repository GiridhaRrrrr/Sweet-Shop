import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiLoader } from 'react-icons/fi';
import { purchaseSweet } from '../../redux/slices/sweetsSlice';
import toast from 'react-hot-toast';

const PurchaseConfirmModal = ({ sweet, onClose }) => {
  const dispatch = useDispatch();
  const isPurchasing = useSelector(state => state.sweets.operationLoading.purchase[sweet._id]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await dispatch(purchaseSweet(sweet._id)).unwrap();
      toast.success(`Successfully purchased ${sweet.name}!`);
      onClose();
    } catch (error) {
      toast.error('Purchase failed');
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
              <motion.div
                animate={{ 
                  rotate: isProcessing ? 360 : [0, -10, 10, -10, 0],
                }}
                transition={{ 
                  duration: isProcessing ? 1 : 0.5,
                  repeat: isProcessing ? Infinity : 2,
                  repeatType: "loop"
                }}
                className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full"
              >
                {isProcessing ? (
                  <FiLoader className="text-3xl text-primary-600 dark:text-primary-400" />
                ) : (
                  <FiShoppingCart className="text-3xl text-primary-600 dark:text-primary-400" />
                )}
              </motion.div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
              {isProcessing ? 'Processing Purchase...' : 'Confirm Purchase'}
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Item:</span>
                <span className="font-medium text-gray-800 dark:text-white">{sweet.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Price:</span>
                <span className="font-medium text-gray-800 dark:text-white">${sweet.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Stock After Purchase:</span>
                <span className="font-medium text-gray-800 dark:text-white">{sweet.quantity - 1}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm Purchase</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PurchaseConfirmModal;