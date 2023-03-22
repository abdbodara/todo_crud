import "./App.css";
import CreateNote from "./components/Todo";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const authStatus = localStorage.getItem("token");
  // const navigate = useNavigate();

  // const setAuth = (value) => {
  //   setIsAuthenticated(value);
  //   //alert(value);
  // };
  // useEffect(() => {
  //   setIsAuthenticated(authStatus);
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route
          path="/todo"
          element={isAuthenticated ? <CreateNote /> : navigate("/login")}
        /> */}
        <Route path="/todo" element={<CreateNote />}></Route>
      </Routes>
    </div>
  );
}

export default App;
