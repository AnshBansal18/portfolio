import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async () => {
    const response = await axios.get('/api/portfolio/get-portfolio-data');
    return response.data;
  }
);

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    loading: false,
    portfolioData: null,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
  },
});

export const { showLoading, hideLoading, setPortfolioData } = rootSlice.actions;
export default rootSlice.reducer;