import React, { useState } from "react";
import M from "materialize-css";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
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
            navigate("/");

            // history.push("/");
          }
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
        {/* <form > */}
        <div className="user-details">
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="email"
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
        <button className="login-btn" onClick={() => postData()}>
          Login Here!!
        </button>
        <h4>
          <Link to="/register">Dont have an account ?</Link>
        </h4>
        <ToastContainer />
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
