import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const RecentActivity = ({ items, isAdmin }) => {
  const lowStockItems = items.filter(item => item.quantity < 10 && item.quantity > 0);
  const outOfStockItems = items.filter(item => item.quantity === 0);

  const activities = [
    ...lowStockItems.map(item => ({
      id: item._id,
      type: 'warning',
      message: `${item.name} is running low (${item.quantity} left)`,
      icon: FiAlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    })),
    ...outOfStockItems.map(item => ({
      id: item._id,
      type: 'error',
      message: `${item.name} is out of stock`,
      icon: FiPackage,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    })),
  ];

  if (activities.length === 0) {
    activities.push({
      id: 'all-good',
      type: 'success',
      message: 'All products are well stocked!',
      icon: FiCheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    });
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Stock Alerts
      </h3>
      <div className="space-y-3">
        {activities.slice(0, 5).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activity.bgColor}`}
          >
            <activity.icon className={`text-xl ${activity.color}`} />
            <p className="text-gray-700 dark:text-gray-300 flex-1">{activity.message}</p>
            {isAdmin && activity.type !== 'success' && (
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Restock
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;