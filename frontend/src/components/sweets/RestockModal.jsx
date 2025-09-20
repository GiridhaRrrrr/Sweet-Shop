// src/components/sweets/RestockModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiLoader } from 'react-icons/fi';
import { restockSweet } from '../../redux/slices/sweetsSlice';
import toast from 'react-hot-toast';

const RestockModal = ({ sweet, onClose }) => {
  const dispatch = useDispatch();
  const isRestocking = useSelector(state => state.sweets.operationLoading.restock[sweet._id]);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRestock = async () => {
    if (!amount || parseInt(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      await dispatch(restockSweet({ 
        id: sweet._id, 
        amount: parseInt(amount) 
      })).unwrap();
      toast.success(`Successfully restocked ${sweet.name}!`);
      onClose();
    } catch (error) {
      toast.error('Restock failed');
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
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                {isProcessing ? (
                  <FiLoader className="text-3xl text-green-600 dark:text-green-400 animate-spin" />
                ) : (
                  <FiPackage className="text-3xl text-green-600 dark:text-green-400" />
                )}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">
              {isProcessing ? 'Processing Restock...' : 'Restock Sweet'}
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Item:</span>
                <span className="font-medium text-gray-800 dark:text-white">{sweet.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Current Stock:</span>
                <span className="font-medium text-gray-800 dark:text-white">{sweet.quantity}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Amount to Add
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter quantity"
                disabled={isProcessing}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {amount && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  New stock will be: {sweet.quantity + parseInt(amount || 0)}
                </p>
              )}
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
                onClick={handleRestock}
                disabled={isProcessing || !amount || parseInt(amount) <= 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Restocking...</span>
                  </>
                ) : (
                  <span>Restock</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RestockModal;