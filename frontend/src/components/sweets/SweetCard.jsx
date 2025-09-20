import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { purchaseSweet } from '../../redux/slices/sweetsSlice';
import EditSweetModal from './EditSweetModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import PurchaseConfirmModal from './PurchaseConfirmModal';
import RestockModal from './RestockModal';
import toast from 'react-hot-toast';

const SweetCard = ({ sweet, isAdmin }) => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);

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
        className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden"
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
                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30"
                  >
                    <FiEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDeleteModal(true)}
                    className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30"
                  >
                    <FiTrash2 />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowRestockModal(true)}
                    className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30"
                  >
                    <FiPackage />
                  </motion.button>
                </>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPurchaseModal(true)}
              disabled={sweet.quantity === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sweet.quantity === 0
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
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