import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchSweets } from '../redux/slices/sweetsSlice';
import StatsCard from '../components/dashboard/StatsCard';
import SalesChart from '../components/dashboard/SalesChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { FiPackage, FiDollarSign, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.sweets);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const stats = {
    totalProducts: items.length,
    totalValue: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    lowStock: items.filter(item => item.quantity < 10).length,
    outOfStock: items.filter(item => item.quantity === 0).length,
  };

  const statsConfig = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStock,
      icon: FiAlertCircle,
      color: 'bg-yellow-500',
      change: '-5%',
      trend: 'down'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: FiTrendingUp,
      color: 'bg-red-500',
      change: stats.outOfStock > 0 ? `${stats.outOfStock} items` : 'All stocked',
      trend: stats.outOfStock > 0 ? 'down' : 'up'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening in your sweet shop.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SalesChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CategoryChart items={items} />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <RecentActivity items={items} isAdmin={isAdmin} />
      </motion.div>
    </div>
  );
};

export default Dashboard;