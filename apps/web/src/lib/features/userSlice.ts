import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  username: string;
  email: string;
  roleId: number;
  isVerified: boolean;
  image: string | null;
}

const initialState: UserState = {
  id: 0,
  username: '',
  email: '',
  isVerified: false,
  image: null,
  roleId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roleId = action.payload.roleId;
      state.isVerified = action.payload.isVerified;
      state.image = action.payload.image;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.roleId = 0;
      state.isVerified = false;
      state.image = null;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
