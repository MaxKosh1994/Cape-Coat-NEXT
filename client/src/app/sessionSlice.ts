import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionState } from './types/sessionTypes';

const initialState: ISessionState = {
  user: '',
  name: '',
  error: '',
  session: false,
  isAdmin: false,
};

const rtkSlice = createSlice({
  name: 'sessionSlice',
  initialState,
  reducers: {
    startSession(
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        session: boolean;
        isAdmin: boolean;
      }>
    ) {
      state.user = action.payload.email;
      state.name = action.payload.name;
      state.session = true;
      state.isAdmin = action.payload.isAdmin;
    },
    endSession(state) {
      state.user = '';
      state.name = '';
      state.session = false;
      state.isAdmin = false;
    },
    handleError(
      state,
      action: PayloadAction<{ response: { data: { message: string } } }>
    ) {
      state.error = action.payload.response.data.message;
    },
    checkSession(
      state,
      action: PayloadAction<{
        isLogin: boolean;
        user: string;
        isAdmin: boolean;
      }>
    ) {
      state.session = action.payload.isLogin;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export default rtkSlice.reducer;
export const { startSession, endSession, handleError, checkSession } =
  rtkSlice.actions;
