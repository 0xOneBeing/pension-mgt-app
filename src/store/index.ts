import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import contributionReducer from "../features/contribution/contributionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    contributions: contributionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
