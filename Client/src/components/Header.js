import React, { useEffect, useState } from "react";
import "../Style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
// import M from "materialize-css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
const Header = ({ data, addToCart, user, setUser }) => {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);
  const searchModel = useRef(null);

  // useEffect(() => {
  //   M.Modal.init(searchModel.current);
  // }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    // console.log(query);
    fetch("/product/find-books", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results.book);
        setDetails(results.book);
      });
  };
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
        {/* <i
          data-target="modal1"
          className="large material-icons modal-trigger"
          style={{ color: "black", cursor: "pointer" }}
        >
          search
        </i>
        <div
          id="modal1"
          className="modal"
          ref={searchModel}
          style={{ color: "black" }}
        >
          <div className="modal-content">
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {details.map((item) => {
                return (
                  <div
                    // to={"/book/" + item._id}
                    onClick={() => {
                      M.Modal.getInstance(searchModel.current).close();
                      setSearch("");
                    }}
                  >
                    <div className="collection-item">
                      <p>{item.title}</p>
                      {localStorage.getItem("user") && (
                        <button onClick={() => addToCart(item._id)}>
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => setSearch("")}
            >
              close
            </button>
          </div>
        </div> */}
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
        />
        {/* <FaSearch /> */}
        <br />
        <br />

        <div className="showItem">
          {details.map((item) => {
            return (
              <div
                // to={"/book/" + item._id}
                onClick={() => {
                  // M.Modal.getInstance(searchModel.current).close();
                  setSearch("");
                }}
              >
                <div className="collection-item">
                  <p>{item.title}</p>
                  {localStorage.getItem("user") && (
                    <button onClick={() => addToCart(item._id)}>
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {user ? (
        <div className="right">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("jwt");
              setUser("");
              toast.info("User Logout Successfully", {
                position: "top-center",
              });
            }}
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="right">
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Header;
