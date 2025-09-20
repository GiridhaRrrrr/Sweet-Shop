import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sweetsService from '../../services/sweetsService';

export const fetchSweets = createAsyncThunk(
  'sweets/fetchAll',
  async () => {
    const response = await sweetsService.getAllSweets();
    return response.data;
  }
);

export const addSweet = createAsyncThunk(
  'sweets/add',
  async (sweetData) => {
    const response = await sweetsService.addSweet(sweetData);
    return response.data;
  }
);

export const updateSweet = createAsyncThunk(
  'sweets/update',
  async ({ id, data }) => {
    const response = await sweetsService.updateSweet(id, data);
    return response.data;
  }
);

export const deleteSweet = createAsyncThunk(
  'sweets/delete',
  async (id) => {
    await sweetsService.deleteSweet(id);
    return id;
  }
);

export const purchaseSweet = createAsyncThunk(
  'sweets/purchase',
  async (id) => {
    const response = await sweetsService.purchaseSweet(id);
    return response.data;
  }
);

export const restockSweet = createAsyncThunk(
  'sweets/restock',
  async ({ id, amount }) => {
    const response = await sweetsService.restockSweet(id, amount);
    return response.data;
  }
);

const sweetsSlice = createSlice({
  name: 'sweets',
  initialState: {
    items: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    filters: {
      category: '',
      minPrice: '',
      maxPrice: ''
    },
    // Add operation-specific loading states
    operationLoading: {
      add: false,
      update: {},
      delete: {},
      purchase: {},
      restock: {}
    }
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
    },
    clearFilters: (state) => {
      state.filters = { category: '', minPrice: '', maxPrice: '' };
      state.searchQuery = '';
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch sweets
      .addCase(fetchSweets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchSweets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Add sweet
      .addCase(addSweet.pending, (state) => {
        state.operationLoading.add = true;
      })
      .addCase(addSweet.fulfilled, (state, action) => {
        state.operationLoading.add = false;
        state.items.push(action.payload);
        state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
      })
      .addCase(addSweet.rejected, (state) => {
        state.operationLoading.add = false;
      })
      
      // Update sweet
      .addCase(updateSweet.pending, (state, action) => {
        state.operationLoading.update[action.meta.arg.id] = true;
      })
      .addCase(updateSweet.fulfilled, (state, action) => {
        state.operationLoading.update[action.payload._id] = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
      })
      .addCase(updateSweet.rejected, (state, action) => {
        state.operationLoading.update[action.meta.arg.id] = false;
      })
      
      // Delete sweet
      .addCase(deleteSweet.pending, (state, action) => {
        state.operationLoading.delete[action.meta.arg] = true;
      })
      .addCase(deleteSweet.fulfilled, (state, action) => {
        state.operationLoading.delete[action.payload] = false;
        state.items = state.items.filter(item => item._id !== action.payload);
        state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
      })
      .addCase(deleteSweet.rejected, (state, action) => {
        state.operationLoading.delete[action.meta.arg] = false;
      })
      
      // Purchase sweet
      .addCase(purchaseSweet.pending, (state, action) => {
        state.operationLoading.purchase[action.meta.arg] = true;
      })
      .addCase(purchaseSweet.fulfilled, (state, action) => {
        state.operationLoading.purchase[action.payload._id] = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
      })
      .addCase(purchaseSweet.rejected, (state, action) => {
        state.operationLoading.purchase[action.meta.arg] = false;
      })
      
      // Restock sweet
      .addCase(restockSweet.pending, (state, action) => {
        state.operationLoading.restock[action.meta.arg.id] = true;
      })
      .addCase(restockSweet.fulfilled, (state, action) => {
        state.operationLoading.restock[action.payload._id] = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
      })
      .addCase(restockSweet.rejected, (state, action) => {
        state.operationLoading.restock[action.meta.arg.id] = false;
      });
  },
});

const filterSweets = (items, searchQuery, filters) => {
  return items.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || sweet.category === filters.category;
    const matchesMinPrice = !filters.minPrice || sweet.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || sweet.price <= parseFloat(filters.maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
};

export const { setSearchQuery, setFilters, clearFilters } = sweetsSlice.actions;
export default sweetsSlice.reducer;