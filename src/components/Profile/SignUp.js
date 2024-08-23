import { useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store/AuthRedux";
import { useDispatch } from "react-redux";

const SignUp = (props) => {
  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let confirmPassword;
    if (!isLogin) {
      confirmPassword = confirmPasswordInputRef.current.value;
    }

    let url;

    if (!isLogin) {
      if (enteredPassword !== confirmPassword) {
        alert("password mismatch");
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc";
      }
    } else if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.message)
              errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!isLogin) {
          alert("Successfully Signed up");
        } else {
          alert("Successfully Logged in");
        }

        dispatch(authActions.login(data.idToken));
        dispatch(authActions.setUserId(enteredEmail));
        history.push("/verify");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const forgotPasswordHandler = () => {
    history.push("/forgotPassword");
  };

  return (
    <div className={classes.div}>
      <div className={classes.div1}>
        <h1>The Expense Tracker App</h1>
        <p>-be the controller of your finances</p>
      </div>
      <div className={classes.div2}>
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="text" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            {!isLogin && (
              <div className={classes.control}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  ref={confirmPasswordInputRef}
                />
              </div>
            )}
            <button
              type="button"
              className={classes.forgotPassword}
              onClick={forgotPasswordHandler}
            >
              forgot password?
            </button>
            <div className={classes.actions}>
              <button type="submit">{isLogin ? "Login" : "Signup"}</button>
            </div>
          </form>
        </section>

        <button
          type="button"
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Dont have an account? Signup" : "Have an Account?Login"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
