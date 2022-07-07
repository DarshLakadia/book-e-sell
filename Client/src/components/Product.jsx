import React from "react";
import "../product.css";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ data, addToCart }) => {
  // console.log(data);

  return (
    <div className="product">
      <div className="product-container">
        <div className="title">All Available Books</div>
        <Link to="/cart">cart page</Link>

        {/* <div className="count">Cart Items {count}</div>
        <div className="product-details">
          <div className="name">Product Name - 14366 items</div>
          <div className="sort">
            <label className="Sort-by">Sort By</label>
            <select onChange={(e) => setSortData(e.target.value)}>
              <option value="a-z">Title</option>
              <option value="z-a">Price</option>
            </select>
          </div>
        </div> */}
        <div className="main-container">
          {data.map((book) => {
            return (
              <div className="container" key={book._id}>
                <div className="header-logo">
                  {/* <img src={`${path}${book.bookImage}`} /> */}
                  <img src={book.bookImage} />
                </div>
                <div className="content">
                  <h2>{book.title}</h2>
                  <p>
                    {" "}
                    {book.description.length > 50
                      ? book.description.substr(0, 49) + " ..."
                      : book.description}
                  </p>
                  <h3>20% OFF</h3>
                  <h3>{book.price}</h3>

                  {localStorage.getItem("user") && (
                    <button onClick={() => addToCart(book._id)}>
                      ADD TO CART
                    </button>
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
