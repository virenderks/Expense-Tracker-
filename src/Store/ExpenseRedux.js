import { createSlice } from "@reduxjs/toolkit";

const initialExpState = { expenses: [], isPremium: false, totalAmount: 0 };

const expSlice = createSlice({
  name: "expense",
  initialState: initialExpState,
  reducers: {
    addExpense(state, action) {
      state.expenses = action.payload;
      let totalAmount = 0;
      state.expenses.forEach(
        (expense) => (totalAmount += Number(expense.amount))
      );
      state.totalAmount = totalAmount;
      if (state.totalAmount > 10000) {
        state.isPremium = true;
      }
      if (state.totalAmount < 10000) {
        state.isPremium = false;
      }
    },
    addExpenseToList(state, action) {
      const newExpense = action.payload;
      state.expenses.push({
        amount: newExpense.amount,
        description: newExpense.description,
        category: newExpense.category,
        id: newExpense.id,
      });
      state.totalAmount += Number(newExpense.amount);
      if (state.totalAmount > 10000) {
        state.isPremium = true;
      }
      if (state.totalAmount < 10000) {
        state.isPremium = false;
      }
    },
    deleteExpenseFromList(state, action) {
      const id = action.payload;
      const existingExpense = state.expenses.find(
        (expense) => expense.id === id
      );
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
      state.totalAmount -= Number(existingExpense.amount);
      if (state.totalAmount > 10000) {
        state.isPremium = true;
      }
      if (state.totalAmount < 10000) {
        state.isPremium = false;
      }
    },
    updateExistingExpense(state, action) {
      const toBeUpdatedExpense = action.payload;

      const existingExpense = state.expenses.find(
        (expense) => expense.id === toBeUpdatedExpense.id
      );
      const existingExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === toBeUpdatedExpense.id
      );
      state.expenses.splice(existingExpenseIndex, 1, toBeUpdatedExpense);

      state.totalAmount =
        state.totalAmount -
        Number(existingExpense.amount) +
        toBeUpdatedExpense.amount;
      if (state.totalAmount > 10000) {
        state.isPremium = true;
      }
      if (state.totalAmount < 10000) {
        state.isPremium = false;
      }
    },
  },
});

export const expActions = expSlice.actions;
export default expSlice.reducer;
