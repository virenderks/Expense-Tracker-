import classes from "./InputForm.module.css";

const InputForm = (props) => {
  return (
    <div className={classes.inputForm}>
      <form className={classes.div}>
        {/* <img src={props.data.image} alt="userImage" /> */}
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          defaultValue={props.data.displayName}
        />

        <label htmlFor="emailInput">Email</label>
        <input type="text" id="emailInput" defaultValue={props.data.email} />
        <div className={classes.actions}>
          <button>update</button>
        </div>
      </form>
      <button className={classes.ETButton} onClick={props.navigation}>
        Expense Tracker
      </button>
    </div>
  );
};

export default InputForm;
