import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import statisticsReducer from "./statisticsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    statistics: statisticsReducer,
  },
});
