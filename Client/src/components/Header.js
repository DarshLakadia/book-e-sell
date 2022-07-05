import React from "react";
import "../Style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
const Header = ({ user, setUser }) => {
  const changeRoute = () => {};
  console.log(user);
  return (
    // {toggleNav}
    <div className="header">
      <div className="left">
        {/* <img
          src="https://tse1.mm.bing.net/th?id=OIP.v81OP3T4vhD2RfaPgTTrSQHaEK&pid=Api&P=0&w=41&h=41"
          alt="Logo image"
        /> */}
        <h3>
          <Link to="/" style={{ textDecoration: "none" }}>
            TatvaSoft
          </Link>
        </h3>
        <input type="text" placeholder="Search..."></input>
        <FaSearch />
      </div>

      {user ? (
        <div className="right">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("jwt");
              setUser("");
            }}
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="right">
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
