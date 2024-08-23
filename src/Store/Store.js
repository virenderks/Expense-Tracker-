import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthRedux";
import expReducer from "./ExpenseRedux";
import themeReducer from "./ThemeRedux";
const store = configureStore({
  reducer: { auth: authReducer, exp: expReducer, theme: themeReducer },
});

export default store;
