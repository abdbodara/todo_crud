import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [todo, setTodo] = useState({ task: "" });
  const [data, setData] = useState();
  const [ID, setId] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // set input field
  const InputEvent = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  // add task and edit task
  const handleSubmit = () => {
    if (ID) {
      fetch(`http://localhost:8080/api/v1/updatetodo/${ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ task: todo.task }),
      })
        .then((data) => {
          setTodo({ task: "" });
          setId("");
          getAllTodo();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch(`http://localhost:8080/api/v1/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ task: todo }),
      })
        .then((data) => {
          setTodo({ task: "" });
          setId("");
          getAllTodo();
        })
        .catch((error) => {
          setTodo({ task: "" });
          setId("");
        });
    }
  };

  // show All todo
  const getAllTodo = () => {
    fetch("http://localhost:8080/api/v1/alltodo", {
      headers: {
        "x-access-token": token,
      },
    }).then((result) => {
      result
        .json()
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  // set task in edit
  const editTodo = (id) => {
    setId(id);
    fetch(`http://localhost:8080/api/v1/gettodo/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    }).then((result) => {
      result.json().then((resp) => {
        setTodo(resp);
      });
    });
  };

  // delete task
  const DeleteItem = (id) => {
    fetch(`http://localhost:8080/api/v1/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    }).then((data) => {
      getAllTodo();
    });
  };

  // clear input field
  const canclebtn = () => {
    setTodo({ task: "" });
    setId("");
    getAllTodo();
  };

  // logout user
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    getAllTodo();
  }, []);
  return (
    <div>
      <div className="form">
        <input
          type="text"
          name="task"
          className="input"
          value={todo.task}
          onChange={InputEvent}
          placeholder="Add a new todo"
        />
        {/* <button className="submit-btn" aria-label={ID ? `Edit` : `Add`} onClick={handleSubmit}>{ID ? `Edit` : `Add`}</button> */}
        <button className="submit-btn" onClick={handleSubmit}>
          Add
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Edit
        </button>
        <button className="submit-btn" onClick={() => canclebtn()}>
          Cancel
        </button>
        <button className="submit-btn" onClick={() => logout()}>
          Logout
        </button>
      </div>
      {data?.map((item) => {
        return (
          <>
            <div className="task" key={item._id}>
              <p data-testid="custom-element" className="tasklist">
                {item.task}
              </p>
              <button className="editbtn" onClick={() => editTodo(item._id)}>
                Edit
              </button>
              <button className="editbtn" onClick={() => DeleteItem(item._id)}>
                Delete
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CreateNote;
