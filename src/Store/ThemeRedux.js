import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { dark: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.dark = !state.dark;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
