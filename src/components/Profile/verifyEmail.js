import {  useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const history = useNavigate();
  const token = localStorage.getItem("tokenET");
  const verifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
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
        console.log(data);

        history.replace("/welcome");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <button
      onClick={verifyEmailHandler}
      style={{
        position: "absolute",
        marginTop: "10px",
        marginLeft: "48%",
        backgroundColor: "blueviolet",
        color: "yellow",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      verify Email
    </button>
  );
};

export default VerifyEmail;
