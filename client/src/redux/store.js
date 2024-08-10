import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootslice from './rootslice';
const reducer = combineReducers({
  root: rootslice,
});

const store = configureStore({
  reducer,
});

export default store;
