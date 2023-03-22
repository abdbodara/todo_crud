import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [data, setData] = useState({});
  // const [image, setImage] = useState();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const fromData = new FormData();
  fromData.append("email", data.email);
  fromData.append("username", data.username);
  fromData.append("password", data.password);
  // fromData.append("proflieimage", image);

  const RegsiterApi = async (e) => {
    if (!data.email) {
      window.alert("Please Enter Your Email address!!!!");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      window.alert("Enter Valid email address!!!!");
    } else if (!data.username) {
      window.alert("Please Enter Your username!!!!");
    } else if (!data.password) {
      window.alert("Please Enter Password!!!!");
    } else {
      e.preventDefault();
      try {
        console.log("fromData ==>>", fromData);
        console.log("data -->>", data);
        await axios
          .post("http://localhost:8080/api/v1/signup", data)
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data.message);
              alert(res.data.message);
              navigate("/login");
            }
          });
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  const errors = {};
  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <form className="loginForm" onSubmit={RegsiterApi}>
          <h1>Registration</h1>
          <div className="input_box">
            <div className="lable_theme">
              <lable>Email</lable>
            </div>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleRegister}
              required
            />
          </div>
          {errors.email}
          <div className="input_box">
            <div className="lable_theme">
              <lable>User Name</lable>
            </div>
            <input
              type="text"
              placeholder="Enter Your User Name"
              name="username"
              onChange={handleRegister}
              required
            />
          </div>
          <div className="input_box">
            <div className="lable_theme">
              <lable>Password</lable>
            </div>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleRegister}
              required
            />
          </div>
          <div>
            <button type="submit" className="signUpBtn" value="Register">
              Submit
            </button>
          </div>
          <Link to="/login">already registered ?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
