import { configureStore } from '@reduxjs/toolkit';import rootReducer from './reducers';

const store2 = configureStore({
  reducer: rootReducer,

});

export default store2;