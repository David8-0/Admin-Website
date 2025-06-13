import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsData: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsData: (state, action) => {
      state.projectsData = action.payload;
      state.error = null;
    },
    setProjectsError: (state, action) => {
      state.error = action.payload;
    },
    setProjectsLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setProjectsData,
  setProjectsError,
  setProjectsLoading
} = projectsSlice.actions;

export default projectsSlice.reducer; 