import React, { useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ user, setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);
          {
            localStorage.getItem("user") &&
              toast.success("User Login Successfully", {
                position: "top-center",
                autoClose: 5000,
              });
          }
          // history.push("/");
          setUser(data.user);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error("No user found with this data", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="title">Login</div>
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" onClick={() => postData()}>
            Login Here!!
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
