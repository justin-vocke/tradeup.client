import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import inputHelper from "../../Helper/InputHelper";
import { useLoginUserMutation } from "../../Apis/authApi";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { setLoggedInUser } from "../../Storage/Redux/userAuthSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  interface CustomJwtPayload extends JwtPayload {
    name: string;
    email: string;
  }

  interface ApiError {
    errorMessages: string[];
  }

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const response = await loginUser({
      email: userInput.email,
      password: userInput.password,
    });

    if (response.data) {
      console.log("access token: " + response.data.accessToken);
      const token = response.data.accessToken;
      console.log("response has data");
      console.log(token);
      //TODO: How to deal with null role. Role should be set to 'Authorized' from the server
      //on successful registration so why is token not including role? Or is that even the problem?
      const { name, email } = jwtDecode<CustomJwtPayload>(token);
      dispatch(setLoggedInUser({ name, email }));
      localStorage.setItem("token", token);

      navigate("/");
    }
    if (response.error && "data" in response.error) {
      const errorData = response.error.data as ApiError; // Explicitly cast to ApiError
      const errorMessages = errorData.errorMessages[0];

      if (errorMessages && errorMessages.length > 0) {
        console.log("Error:", errorMessages[0]);
        setError(errorMessages);
      } else {
        console.log("Unknown error occurred.");
      }
    } else if (response.error) {
      console.log("Non-API error occurred:" + response.error);
    }
    setLoading(false);
  };
  return (
    <div className="container text-center">
      <form method="post" onSubmit={onSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
