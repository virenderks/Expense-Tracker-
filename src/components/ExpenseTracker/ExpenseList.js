import { useSelector, useDispatch } from "react-redux";
import { expActions } from "../../Store/ExpenseRedux";
import classes from "./ExpenseList.module.css";
import axios from "axios";
const ExpenseList = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const deleteExpenseHandler = () => {
    axios
      .delete(
        ` https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}/${props.id}.json`
      )
      .then((res) => {
        dispatch(expActions.deleteExpenseFromList(props.id));
      })
      .catch((err) => alert(err));
  };
  return (
    <div className={classes.list}>
      <div className={classes.div}>
        <tr className={classes.row}>
          <td className={classes.amount}>Rs.{props.amount}</td>
          <td className={classes.desc}>{props.description}</td>
          <td className={classes.cat}>{props.category}</td>
          <td className={classes.actions}>
            <button className={classes.edit} onClick={props.onEdit}>
              Edit
            </button>
            <button className={classes.delete} onClick={deleteExpenseHandler}>
              X
            </button>
          </td>
        </tr>
      </div>
    </div>
  );
};

export default ExpenseList;
