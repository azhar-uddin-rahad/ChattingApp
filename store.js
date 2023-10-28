import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/slice/UserSlice';
import activeChatReducer from './src/slice/ActiveChatSlice'

export const store = configureStore({
  reducer: {
    loginUser : userReducer,
    activeChat : activeChatReducer,
  },
})

