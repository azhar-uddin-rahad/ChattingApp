import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 chat:  null,
}

export const activeChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatMessage: (state,actions) => {
      state.chat = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { chatMessage } = activeChatSlice.actions

export default activeChatSlice.reducer