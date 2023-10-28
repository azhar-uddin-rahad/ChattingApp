import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 chat:  localStorage.getItem("activeChat") ? JSON.parse(localStorage.getItem("activeChat")) : null,
}

export const activeChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    activeChatMessage: (state,actions) => {
      state.chat = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { activeChatMessage } = activeChatSlice.actions

export default activeChatSlice.reducer