import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPackage, FiShield } from 'react-icons/fi';
import { GiCupcake } from 'react-icons/gi';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { isAdmin } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: FiHome },
    { path: '/sweets', name: 'Sweets', icon: FiPackage },
  ];

  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5rem' }
  };

  return (
    <motion.aside
      initial="open"
      animate={sidebarOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      className="bg-gradient-to-b from-primary-600 to-primary-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-xl"
    >
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: sidebarOpen ? 0 : 360 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <GiCupcake className="h-10 w-10 text-white" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-2xl font-bold"
                >
                  Sweet Shop
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 shadow-lg'
                    : 'hover:bg-white/10'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {isAdmin && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center">
              <FiShield className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-2 text-sm font-semibold text-yellow-300"
                  >
                    Admin Panel
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;