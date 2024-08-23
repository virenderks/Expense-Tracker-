import classes from "./ForgotPassword.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const history = useNavigate();
  const emailInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => alert("you have recieved a mail.Change Password"))
      .catch((err) => console.log(err));
    history.replaceState("/");
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className>Enter the email with which you have registered</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
      </div>
      <div>
        <button>SendLink</button>
      </div>
    </form>
  );
};

export default ForgotPassword;
