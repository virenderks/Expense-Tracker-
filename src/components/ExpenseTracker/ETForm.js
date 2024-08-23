import classes from "./ETForm.module.css";
import { useRef, useState } from "react";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expActions } from "../../Store/ExpenseRedux";
import ToggleButton from "../../UI/ToggleButton";
const ETForm = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const expensesRedux = useSelector((state) => state.exp.expenses);
  const userId = useSelector((state) => state.auth.userId);
  const totalAmount = useSelector((state) => state.exp.totalAmount);
  const isDark = useSelector((state) => state.theme.dark);
  const submitHandler = (event) => {
    event.preventDefault();
    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = {
      amount: amount,
      description: description,
      category: category,
    };
    if (!isEditMode)
      axios
        .post(
          `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}.json`,
          expense
        )
        .then((res) => {
          console.log(res.data.name);
          dispatch(
            expActions.addExpenseToList({
              amount: amount,
              description: description,
              category: category,
              id: res.data.name,
            })
          );
        })
        .catch((err) => alert(err));
    else if (isEditMode)
      axios
        .put(
          `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`,
          expense
        )

        .then((res) => {
          console.log(res.data);
          dispatch(
            expActions.updateExistingExpense({
              amount: Number(res.data.amount),
              description: res.data.description,
              category: res.data.category,
              id: id,
            })
          );
        })
        .catch((err) => alert(err));
    setIsEditMode(false);
  };
  const editHandler = (expElement) => {
    amountInputRef.current.value = expElement.amount;
    descriptionInputRef.current.value = expElement.description;
    categoryInputRef.current.value = expElement.category;
    setIsEditMode(true);
    setId(expElement.id);
  };
  const downloadHandler = () => {
    let blob = new Blob([makeCSV(expensesRedux)]);
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "expenses.csv";
    a.href = file;
    a.click();
  };
  function makeCSV(expenses) {
    let arr = [];

    expenses.forEach((expense) => {
      let expenseArr = [];
      expenseArr.push(expense.amount);
      expenseArr.push(expense.category);
      expenseArr.push(expense.description);

      arr.push(expenseArr);
    });
    return arr.map((r) => r).join("\n");
  }
  const expensee = expensesRedux.map((expElement) => (
    <ExpenseList
      amount={expElement.amount}
      description={expElement.description}
      category={expElement.category}
      id={expElement.id}
      onEdit={() => {
        editHandler(expElement);
      }}
    />
  ));

  return (
    <>
      <div className={classes.mainDiv}>
        <div className={classes.div}>
          <h1 className={classes.h1}>
            Your Expense{" "}
            <div className={classes.totalAmount}> Rs.{totalAmount}</div>
          </h1>

          <form onSubmit={submitHandler}>
            <div className={classes.form}>
              <div className={classes.description}>
                <div>
                  <label htmlFor="money">Amount</label>
                </div>
                <input type="text" id="money" ref={amountInputRef} />
              </div>
              <div className={classes.description}>
                <div>
                  <label htmlFor="description">Description</label>
                </div>
                <input type="text" id="decsription" ref={descriptionInputRef} />
              </div>
              <div className={classes.description}>
                <div>
                  <label htmlFor="category">Category</label>
                </div>
                <select id="category" ref={categoryInputRef}>
                  <option value="food">food</option>
                  <option value="petrol">petrol</option>
                  <option value="salary">salary</option>
                  <option value="home appliance">home appliance</option>
                  <option value="education">education</option>
                  <option value="food">movies</option>
                  <option value="food">others....</option>
                </select>
              </div>
            </div>

            <div>
              <button className={classes.actions} type="submit">
                {isEditMode ? "Update" : "Add Expense"}
              </button>
            </div>
          </form>
          <div className={classes.toggleButton}>
            <ToggleButton />
          </div>
        </div>
        <div className={`${classes.listAndButton} ${isDark && classes.dark}`}>
          <ul>{expensee}</ul>
          <button className={classes.download} onClick={downloadHandler}>
            Download File
          </button>
        </div>
      </div>
    </>
  );
};
export default ETForm;
