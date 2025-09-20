import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchSweets } from '../redux/slices/sweetsSlice';
import SweetCard from '../components/sweets/SweetCard';
import SearchAndFilter from '../components/sweets/SearchAndFilter';
import AddSweetModal from '../components/sweets/AddSweetModal';
import { FiPlus } from 'react-icons/fi';

const SweetsPage = () => {
  const dispatch = useDispatch();
  const { filteredItems, isLoading } = useSelector((state) => state.sweets);
  const { isAdmin } = useSelector((state) => state.auth);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sweets Inventory</h1>
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus />
            <span>Add Sweet</span>
          </motion.button>
        )}
      </div>

      <SearchAndFilter />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((sweet, index) => (
            <motion.div
              key={sweet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SweetCard sweet={sweet} isAdmin={isAdmin} />
            </motion.div>
          ))}
        </div>
      )}

      {showAddModal && <AddSweetModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default SweetsPage;