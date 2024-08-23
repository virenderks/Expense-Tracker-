import classes from "./Welcome.module.css";
import InputForm from "./InputForm";
import ETForm from "../ExpenseTracker/ETForm";
import { authActions } from "../../Store/AuthRedux";

// import { themeActions } from "../../Store/ThemeRedux";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

let collectedData = {
  email: "",
  displayName: "",
  image: "",
};
const Welcome = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const isPremium = useSelector((state) => state.exp.isPremium);
  const history = useNavigate();
  const [, setIsUpdate] = useState(false);
  const [isNavigated, setIsNavigated] = useState(false);
  const idToken = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.theme.dark);

  const navigationHandler = () => {
    setIsNavigated(true);
  };
  const profileClickHandler = () => {
    setIsNavigated(false);
  };

  const profileUpdateHandler = () => {
    setIsNavigated(false);
    console.log("profile updated");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: "Navira",
          photoUrl:
            "https://drive.google.com/file/d/0BzVIASLRqKJoU3VuOGk5bFhMcFdHdWw3a2xWY29IMnFfaWpJ/view?usp=sharing&resourcekey=0-Dh5bKCEM7cnoanW_umVK9g",
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (isLoggedIn) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        console.log(data.users[0]);
        setIsUpdate(true);
        collectedData.email = data.users[0].email;
        collectedData.displayName = data.users[0].displayName;
        collectedData.image = data.users[0].photoUrl;
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };
  return (
    <div className={classes.full}>
      <div className={`${classes.welcomeDiv} ${isDark && classes.dark}`}>
        {!isNavigated && <h3> Welcome to ExpenseTracker Page!!</h3>}

        {!isNavigated && (
          <p className={`${classes.welcomeP2}  ${isDark && classes.dark}`}>
            Your profile is incomplete.
            <button
              className={classes.updateButton}
              onClick={profileUpdateHandler}
            >
              Complete now
            </button>
          </p>
        )}

        {isNavigated && (
          <div>
            <button
              className={`${classes.logout}  ${isDark && classes.dark}`}
              onClick={profileClickHandler}
            >
              PROFILE
            </button>
          </div>
        )}
        {isPremium && (
          <div className={classes.premiumButtons}>
            <button className={classes.premium}>Activate Premium</button>
          </div>
        )}

        <div>
          <button
            className={`${classes.logout}  ${isDark && classes.dark}`}
            onClick={logoutHandler}
          >
            LOGOUT
          </button>
        </div>
      </div>
      {!isNavigated && (
        <InputForm data={collectedData} navigation={navigationHandler} />
      )}
      {isNavigated && <ETForm />}
    </div>
  );
};
export default Welcome;
