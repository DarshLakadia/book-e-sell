import React, { useEffect, useState } from "react";
import "../product.css";
import M from "materialize-css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ user, setUser }) => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const submitData = () => {
    toast.success("Item added to cart successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setCount(count + 1);
  };

  useEffect(() => {
    fetch("/product", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          // localStorage.setItem("jwt", data.token);
          // localStorage.setItem("user", JSON.stringify(data.user));
          // console.log(data.docs);
          // M.toast({
          //   html: "signedin success",
          //   classes: "#43a047 green darken-1",
          // });
          // history.push("/");
          // setUser(data.user);
          setData(data.results);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <div className="product">
      <div className="product-container">
        <div className="title">Product Listing</div>
        <div className="count">Cart Items {count}</div>
        <div className="product-details">
          <div className="name">Product Name - 14366 items</div>
          <div className="sort">
            <label className="Sort-by">Sort By</label>
            <select>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </div>
        </div>
        <div class="main-container">
          {data.map((book) => {
            return (
              <div className="container">
                <div className="header-logo">
                  {/* <img src={`${path}${book.bookImage}`} /> */}
                  <img src={book.bookImage} />
                </div>
                <div className="content">
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                  <h3>20% OFF</h3>
                  <h3>{book.price}</h3>

                  {localStorage.getItem("user") && (
                    <button onClick={submitData}>ADD TO CART</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Product;
