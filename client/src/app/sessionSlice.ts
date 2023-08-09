import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  name: "",
  error: "",
  session: false,
  isAdmin: false,
}

const rtkSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    startSession(state, action) {
      state.user = action.payload.email
      state.name = action.payload.name
      state.isAdmin = action.payload.isAdmin
    },
    endSession(state) {
      state.user = ""
      state.name = ""
      state.session = false
      state.isAdmin = false
    },
    handleError(state, action) {
      state.error = action.payload.response.data.message
    },
    checkSession(state, action) {
      state.session = action.payload.isLogin
      state.user = action.payload.user
      state.isAdmin = action.payload.isAdmin
    },
  },
})

export default rtkSlice.reducer
export const { startSession, endSession, handleError, checkSession } =
  rtkSlice.actions
