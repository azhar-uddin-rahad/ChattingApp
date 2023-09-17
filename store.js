import { configureStore } from '@reduxjs/toolkit'
import userReducer from './src/slice/UserSlice'
export const store = configureStore({
  reducer: {
    loginUser : userReducer
  },
})

