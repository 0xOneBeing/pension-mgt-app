import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  role: string,
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tempAvatar: string | null;
  tempName: string | null;
  tempEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tempAvatar: null,
  tempName: null,
  tempEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tempAvatar = null;
      state.tempName = null;
      state.tempEmail = null;
    },
    setTempAvatar: (state, action: PayloadAction<string>) => {
      state.tempAvatar = action.payload;
    },
    setTempName: (state, action: PayloadAction<string>) => {
      state.tempName = action.payload;
    },
    setTempEmail: (state, action: PayloadAction<string>) => {
      state.tempEmail = action.payload;
    },
    updateUser: (state) => {
      if (state.user) {
        state.user.name = state.tempName || state.user.name;
        state.user.email = state.tempEmail || state.user.email;
        state.user.avatar = state.tempAvatar || state.user.avatar;
      }
      // Clear temporary values after updating
      state.tempAvatar = null;
      state.tempName = null;
      state.tempEmail = null;
    },
  },
});

// Export all actions
export const {
  login,
  logout,
  setTempAvatar,
  setTempName,
  setTempEmail,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;