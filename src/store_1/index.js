import {configureStore} from '@reduxjs/toolkit'
import Authslice from './authslice'

const store = configureStore({
    reducer: { authReducer: Authslice.reducer }
});


export default store;