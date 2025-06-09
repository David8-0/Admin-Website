import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import statisticsReducer from "./statisticsSlice";
import appointmentsReducer from "./appointmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    statistics: statisticsReducer,
    appointments: appointmentsReducer,
  },
});
