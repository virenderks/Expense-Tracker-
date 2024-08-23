import classes from "./Welcome.module.css";

const Welcome = () => {
  const idToken = localStorage.getItem("tokenET");
  const profileUpdateHandler = () => {
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.welcomeDiv}>
      <p> Welcome to ExpenseTracker Page!!</p>

      <p className={classes.welcomeP2}>
        Your profile is incomplete.
        <button className={classes.updateButton} onClick={profileUpdateHandler}>
          Complete now
        </button>
      </p>
    </div>
  );
};
export default Welcome;
