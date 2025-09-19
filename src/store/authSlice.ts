import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  username: string | null;
  email: string | null;
  subscriptionType: 'basic' | 'premium';
  subscriptionExpiry: string; // ISO date string
  isActive: boolean;
  isAdmin?: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  loginSuccess: boolean;
  redirectPath: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  loginSuccess: false,
  redirectPath: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAdmin = Boolean(action.payload?.isAdmin);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ user: UserProfile; redirectPath?: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAdmin = Boolean(action.payload.user.isAdmin);
      state.loginSuccess = true;
      state.redirectPath = action.payload.redirectPath || null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.loginSuccess = false;
      state.redirectPath = null;
    },
    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
      state.redirectPath = null;
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
    },
  },
});

export const { 
  setUser, 
  setLoading, 
  loginSuccess, 
  logout, 
  clearLoginSuccess, 
  setRedirectPath 
} = authSlice.actions;

export default authSlice.reducer;
