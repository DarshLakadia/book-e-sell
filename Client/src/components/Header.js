import React, { useEffect, useState } from "react";
import "../style.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
// import M from "materialize-css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({ data, addToCart, user, setUser }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);

  // useEffect(() => {
  //   M.Modal.init(searchModel.current);
  // }, []);

  const fetchUsers = (query) => {
    setSearch(query.charAt(0).toUpperCase() + query.slice(1).toLowerCase());
    console.log(query);

    {
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
    }
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
      </div>
      <div className="middle">
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
        />
        {/* <FaSearch /> */}
        {search && (
          <div className="showItem">
            {details.map((item) => {
              return (
                <div className="searchItem">
                  <p>{item.title}</p>
                  {localStorage.getItem("user") && (
                    <>
                      <button
                        className="cart-btn"
                        onClick={() => addToCart(item._id)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {user ? (
        <div className="right">
          {/* <button
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
          </button> */}
          <span
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("jwt");
              setUser("");
              toast.info("User Logout Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </span>
          {/* <div className="cart"> */}
          <button
            style={{ right: "0", paddingBlock: "20px", marginInline: "20px" }}
          >
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ marginInline: "5px", fontSize: "20px" }}
              />
              <span style={{ fontWeight: "100", fontSize: "20px" }}>Cart</span>
            </Link>
          </button>
          {/* </div> */}
        </div>
      ) : (
        <div className="right">
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Header;
