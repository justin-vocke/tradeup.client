import React, { useState } from "react";
import inputHelper from "../../Helper/inputHelper";
import { useRegisterUserMutation } from "../../Apis/authApi";
import toastNotify from "../../Helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../Components/Common/MainLoader";
function Register() {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ["Registered"],
  });

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await registerUser({
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      email: userInput.email,
      password: userInput.password,
      role: userInput.role,
    });

    if (response.data) {
      console.log(response.data);
      toastNotify("Registration successful!");
      navigate("/login");
    } else {
      console.log("registration error");
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };
  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={onSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="firstName"
              required
              value={userInput.firstName}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="lastName"
              required
              value={userInput.lastName}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              required
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              required
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
          {/* <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select className="form-control form-select" required>
              <option value="">--Select Role--</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
