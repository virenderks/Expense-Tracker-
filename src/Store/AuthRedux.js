import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  userId: "",
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("tokenET", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("tokenET");
      localStorage.removeItem("email");
    },
    setUserId(state, action) {
      localStorage.setItem("email", action.payload);
      state.userId = action.payload.replace(/[@,.]/g, "");
    },
    setIsAuth(state) {
      if (localStorage.getItem("tokenET")) {
        state.isAuthenticated = true;
        state.token = localStorage.getItem("tokenET");
        const UID = localStorage.getItem("email");
        state.userId = UID.replace(/[@,.]/g, "");
      }
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
