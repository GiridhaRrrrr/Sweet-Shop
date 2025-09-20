import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ title, value, icon: Icon, color, change, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-2xl text-white" />
        </div>
        <div className="flex items-center space-x-1 text-sm">
          {trend === 'up' ? (
            <FiTrendingUp className="text-green-500" />
          ) : (
            <FiTrendingDown className="text-red-500" />
          )}
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
    </motion.div>
  );
};

export default StatsCard;