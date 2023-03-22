import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const errors = {};
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const logInApi = async (e) => {
    if (!values.username) {
      window.alert("Please Enter Your username!!!!");
      // errors.username = "Please Enter Your username!!!!";
    } else if (!values.password) {
      // errors.username = "Please Enter Password!!!!";
      window.alert("Please Enter Password!!!!");
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:8080/api/v1/login", values)
          .then((res) => {
            if (res.status === 200 && res.data.token) {
              alert(res.data.message);
              localStorage.setItem("token", res.data.token);
              navigate("/todo");
            }
          });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <form className="loginForm" onSubmit={logInApi}>
          <h1>Log in</h1>
          <div className="input_box">
            <div className="lable_theme">
              <lable>User Name</lable>
            </div>
            <input
              type="text"
              placeholder="Enter Your User Name"
              name="username"
              onChange={handleLogin}
            />
            <lable className="lable_theme">{errors.username}</lable>
          </div>
          <div className="input_box">
            <div className="lable_theme">
              <lable>Password</lable>
            </div>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleLogin}
            />
            <lable className="lable_theme">{errors.password}</lable>
          </div>
          <div>
            <input className="signUpBtn" type="submit" value="Login" />
          </div>
          <Link to="/">click to register!!!</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
