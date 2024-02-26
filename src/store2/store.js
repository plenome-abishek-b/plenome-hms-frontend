// store.js
import { configureStore } from '@reduxjs/toolkit';
// import controllSlice from 'controll/controllSlice';
import rootReducer from 'controll/reducers'; 
 // Adjust import path
 
const store = configureStore({
    reducer: {
        toggle: rootReducer,
      },
//   }, 
  // Add any additional middleware here
})
export default store; 