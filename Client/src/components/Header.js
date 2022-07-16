import React, { useState } from "react";
import "../style.css";

import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({ data, addToCart, user, setUser, seller, setSeller }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);
  console.log(seller);
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
      {!seller && (
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
      )}

      {seller.length != 0 || user.length != 0 ? (
        <div className="right">
          <span
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("jwt");
              localStorage.removeItem("seller");
              setUser("");
              setSeller("");
              toast.info("Logout Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
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
          {!seller && (
            <button
              style={{ right: "0", paddingBlock: "20px", marginInline: "20px" }}
            >
              <Link to="/cart">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ marginInline: "5px", fontSize: "20px" }}
                />
                <span style={{ fontWeight: "100", fontSize: "20px" }}>
                  Cart
                </span>
              </Link>
            </button>
          )}
          {/* </div> */}
        </div>
      ) : (
        <div className="right">
          <Link to="/register">User Register</Link> |{" "}
          <Link to="/login">User Login</Link> |{" "}
          <Link to="/sellerRegister">Seller Register</Link>|
          <Link to="/sellerLogin">Seller Login</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
