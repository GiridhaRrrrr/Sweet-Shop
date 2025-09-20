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
      .addCase(addSweet.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
      })
      .addCase(updateSweet.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
      })
      .addCase(deleteSweet.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
      })
      .addCase(purchaseSweet.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
      })
      .addCase(restockSweet.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = filterSweets(state.items, state.searchQuery, state.filters);
        }
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