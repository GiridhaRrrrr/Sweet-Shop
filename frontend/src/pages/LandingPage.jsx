import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { GiCupcake, GiChocolateBar, GiCandyCanes } from 'react-icons/gi';

const LandingPage = () => {
  const features = [
    {
      icon: FiShoppingBag,
      title: 'Inventory Management',
      description: 'Track your sweet inventory in real-time with our advanced system',
      color: 'bg-purple-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Sales Analytics',
      description: 'Monitor sales trends and make data-driven decisions',
      color: 'bg-blue-500',
    },
    {
      icon: FiUsers,
      title: 'Multi-User Support',
      description: 'Manage staff access with role-based permissions',
      color: 'bg-green-500',
    },
  ];

  const floatingIcons = [
    { Icon: GiCupcake, delay: 0, size: 'text-6xl', position: 'top-20 left-10' },
    { Icon: GiChocolateBar, delay: 0.5, size: 'text-5xl', position: 'top-40 right-20' },
    { Icon: GiCandyCanes, delay: 1, size: 'text-7xl', position: 'bottom-20 left-1/4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, size, position }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 0.1, 
            y: [-20, 20, -20],
          }}
          transition={{
            delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute ${position} ${size} text-primary-400 dark:text-primary-600`}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <GiCupcake className="h-10 w-10 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sweet Shop Manager</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-4"
            >
              <Link
                to="/login"
                className="px-6 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Manage Your <span className="text-primary-600 dark:text-primary-400">Sweet Business</span> with Ease
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Streamline your confectionery operations with our comprehensive management system. 
              From inventory tracking to sales analytics, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center space-x-2"
                >
                  <span>Join Now</span>
                  <FiArrowRight />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Welcom back !
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-primary-400 to-purple-500 rounded-3xl p-1">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8">
                <div className="grid grid-cols-3 gap-4">
                  {[GiCupcake, GiChocolateBar, GiCandyCanes].map((Icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-gradient-to-br from-primary-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl flex items-center justify-center"
                    >
                      <Icon className="text-4xl text-primary-600 dark:text-primary-400" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-4/5" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-3/5" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-primary-300 to-purple-400 rounded-3xl blur-2xl opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Everything You Need to Run Your Sweet Shop
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features designed for modern confectioneries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;