import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "error";
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload); // Add new notifications to the top
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) notification.read = true;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
