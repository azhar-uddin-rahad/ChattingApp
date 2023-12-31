import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logUser: (state,actions) => {
      state.value = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { logUser, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer