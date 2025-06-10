import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import statisticsReducer from "./statisticsSlice";
import appointmentsReducer from "./appointmentsSlice";
import usersReducer from "./usersSlice";
import buyersReducer from './buyersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    statistics: statisticsReducer,
    appointments: appointmentsReducer,
    users: usersReducer,
    buyers: buyersReducer,
  },
});
