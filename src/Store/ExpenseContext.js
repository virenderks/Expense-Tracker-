import React, { useState } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (item) => {},
  removeExpense: (id) => {},
  update: (arr) => {},
});

export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  const [expenses, updateExpenses] = useState([]);
  axios
    .get(
      "https://expensetracker-50239-default-rtdb.firebaseio.com/expenses.json"
    )
    .then((res) => {
      let datas = res.data;
      let expenseArray = [];
      for (let id in datas) {
        let expense = datas[id];
        expense.id = id;
        expenseArray.push(expense);
      }
      updateExpenses(expenseArray);
    });
  const addExpenseHandler = (expense) => {
    const existingExpenses = [...expenses];
    updateExpenses([...existingExpenses, expense]);
    console.log(expenses);
  };
  const updateExpensesHandler = (expensesArray) => {
    updateExpenses(expensesArray);
  };
  const removeExpenseHandler = (id) => {
    axios
      .delete(
        ` https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((response) => {
        const existingExpenses = [...expenses];
        const itemIdx = existingExpenses.findIndex((i) => i._id === id);
        existingExpenses.splice(itemIdx, 1);
        updateExpenses(existingExpenses);
      })

      .catch((err) => console.log(err));
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    update: updateExpensesHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
