import SignUp from "./components/Profile/SignUp";
import { Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import VerifyEmail from "./components/Profile/verifyEmail";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ETForm from "./components/ExpenseTracker/ETForm";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./Store/AuthRedux";
import { expActions } from "./Store/ExpenseRedux";
import axios from "axios";
import classes from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  dispatch(authActions.setIsAuth());
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const isDark = useSelector((state) => state.theme.dark);
  axios
    .get(
      `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}.json`
    )
    .then((res) => {
      let datas = res.data;
      let expArray = [];
      for (let id in datas) {
        let expenses = datas[id];
        expenses.id = id;
        expArray.push(expenses);
      }
      dispatch(expActions.addExpense(expArray));
    });
  return (
    <div className={`$ ${isDark && classes.dark}`}>
      {!isAuth && <SignUp />}
      {!isAuth && (
        <Route path="/welcome">
          <Navigate to="/" />
        </Route>
      )}
      {isAuth && <Navigate to="/welcome" />}
      <Route path="/verify">
        <VerifyEmail />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/expenseTracker">
        <ETForm />
      </Route>
      <Route path="/welcome" exact>
        <Welcome />
      </Route>
    </div>
  );
}

export default App;
