import React, { useEffect, useState } from "react";
import "../cart.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({
  cart,
  incrementCount,
  decrementCount,
  removeBook,
  setOriginalData,
}) => {
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState(0);

  useEffect(() => {
    setData(cart);
    console.log(data);
  }, [cart]);

  useEffect(() => {
    setData(cart);
    console.log(data);
  }, []);

  // console.log(data);

  useEffect(() => {
    let prices = 0;
    data.map((item) => [(prices += item.price * item.count)]);
    setPrices(prices);
  }, [data]);

  return (
    <div className="product">
      <div className="product-container">
        <div className="title">Your Cart Show Here!!</div>
        <div className="product-details">
          {/* <div className="name">My Shopping Bag ({count} Items)</div> */}
          <div className="sort">
            <div className="Sort-by">Total price: {prices} Rs.</div>
          </div>
          {data.length > 0 && (
            <button onClick={() => setOriginalData()}>Clear Cart</button>
          )}
        </div>

        <div className="main-container">
          {data.map((item) => {
            return (
              <div className="cart-container">
                <div className="image">
                  <img src={item.bookImage} alt="Image" srcset="" />
                </div>
                <div className="element">
                  <p>{item.title}</p>
                  <p>{item.category}</p>
                  <div className="btn">
                    <span
                      onClick={() => {
                        incrementCount(item._id);
                      }}
                    >
                      +
                    </span>
                    <span className="num">{item.count}</span>
                    <span
                      onClick={() => {
                        decrementCount(item._id);
                      }}
                    >
                      -
                    </span>
                  </div>
                </div>
                <div className="price">
                  <p className="rate">{item.price} Rs.</p>
                  <p className="discount">50% OFF</p>
                  <p className="remove" onClick={() => removeBook(item._id)}>
                    Remove
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="submit-btn">
          <button
            onClick={() => {
              toast.success("Order Placed Successfully", {
                position: "top-center",
              });
            }}
          >
            Place order
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Cart;
