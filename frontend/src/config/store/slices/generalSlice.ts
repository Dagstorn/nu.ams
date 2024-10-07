import { createSlice } from "@reduxjs/toolkit";

interface GeneralState {
  sidebarClosed: boolean;
}

const initialState: GeneralState = {
  sidebarClosed: true,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarClosed = !state.sidebarClosed;
    },
    setSidebarClosed: (state, action) => {
      state.sidebarClosed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarClosed } = generalSlice.actions;
export default generalSlice.reducer;
