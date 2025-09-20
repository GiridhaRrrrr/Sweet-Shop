import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiShoppingCart, FiPackage, FiLoader } from 'react-icons/fi';
import { purchaseSweet } from '../../redux/slices/sweetsSlice';
import EditSweetModal from './EditSweetModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import PurchaseConfirmModal from './PurchaseConfirmModal';
import RestockModal from './RestockModal';
import toast from 'react-hot-toast';

const SweetCard = ({ sweet, isAdmin }) => {
  const dispatch = useDispatch();
  const { operationLoading } = useSelector((state) => state.sweets);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);

  // Check if any operation is loading for this sweet
  const isDeleting = operationLoading.delete[sweet._id];
  const isPurchasing = operationLoading.purchase[sweet._id];
  const isUpdating = operationLoading.update[sweet._id];
  const isRestocking = operationLoading.restock[sweet._id];

  const getStockColor = (quantity) => {
    if (quantity === 0) return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    if (quantity < 10) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-green-500 bg-green-100 dark:bg-green-900/20';
  };

  const getSweetIcon = (category) => {
    const icons = {
      'Cake': '🎂',
      'Candy': '🍬',
      'Chocolate': '🍫',
      'Cookie': '🍪',
      'Donut': '🍩',
      'Ice Cream': '🍦',
      'Default': '🧁'
    };
    return icons[category] || icons.Default;
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden ${
          isDeleting ? 'opacity-50' : ''
        }`}
      >
        <div className="h-32 bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-6xl">
          {getSweetIcon(sweet.category)}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {sweet.name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {sweet.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStockColor(sweet.quantity)}`}>
              {sweet.quantity} in stock
            </span>
          </div>
          
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            ${sweet.price.toFixed(2)}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {isAdmin && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditModal(true)}
                    disabled={isUpdating || isDeleting}
                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiEdit />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isDeleting || isUpdating}
                    className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiTrash2 />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowRestockModal(true)}
                    disabled={isRestocking || isDeleting}
                    className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRestocking ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiPackage />
                    )}
                  </motion.button>
                </>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPurchaseModal(true)}
              disabled={sweet.quantity === 0 || isPurchasing || isDeleting}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                sweet.quantity === 0 || isPurchasing || isDeleting
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isPurchasing ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}</span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showEditModal && (
        <EditSweetModal sweet={sweet} onClose={() => setShowEditModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal sweet={sweet} onClose={() => setShowDeleteModal(false)} />
      )}
      {showPurchaseModal && (
        <PurchaseConfirmModal sweet={sweet} onClose={() => setShowPurchaseModal(false)} />
      )}
      {showRestockModal && (
        <RestockModal sweet={sweet} onClose={() => setShowRestockModal(false)} />
      )}
    </>
  );
};

export default SweetCard;