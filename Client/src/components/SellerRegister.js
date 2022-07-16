import React, { useState } from "react";
import "../register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellerRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid email format", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }
    console.log(firstName, lastName, email, password);

    fetch("/seller/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          });
        } else {
          toast.success(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          });
          navigate("/sellerLogin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="title">Seller-Registration</div>
        {/* <form action="#"> */}
        <div className="user-details">
          <div className="input-box">
            <span className="details">City</span>
            <input
              type="text"
              placeholder="Enter FirstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">State</span>
            <input
              type="text"
              placeholder="Enter LastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="text"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          Register Here!!
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SellerRegister;
