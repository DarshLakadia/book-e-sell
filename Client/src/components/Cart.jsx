import React, { useState } from "react";
import "../cart.css";

const Cart = () => {
  const [count, setCount] = useState(1);
  const [prices, setPrices] = useState(500);
  return (
    <div className="product">
      <div className="product-container">
        <div className="title">Cart Page</div>
        <div className="product-details">
          <div className="name">My Shopping Bag ({count} Items)</div>
          <div className="sort">
            <div className="Sort-by">Total price: {prices}</div>
          </div>
        </div>

        <div className="main-container">
          <div className="cart-container">
            <div className="image">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.WV2lbCX7GEVDWdm_kcVDLAHaEK&pid=Api&P=0&w=200&h=200"
                alt="Image"
                srcset=""
              />
            </div>
            <div className="element">
              <p>Campus Sutra</p>
              <p>Cart item name</p>
              <div className="btn">
                <span
                  onClick={() => {
                    setCount(count + 1);
                    prices == 0 ? setPrices(0) : setPrices(prices + 500);
                  }}
                >
                  +
                </span>
                <span className="num">{count}</span>
                <span
                  onClick={() => {
                    count == 0 ? setCount(0) : setCount(count - 1);
                    prices == 0 ? setPrices(0) : setPrices(prices - 500);
                  }}
                >
                  -
                </span>
              </div>
            </div>
            <div className="price">
              <p className="rate">500</p>
              <p className="discount">50% OFF</p>
              <p className="remove">Remove</p>
            </div>
          </div>
          <div className="cart-container">
            <div className="image">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.WV2lbCX7GEVDWdm_kcVDLAHaEK&pid=Api&P=0&w=200&h=200"
                alt="Image"
                srcset=""
              />
            </div>
            <div className="element">
              <p>Campus Sutra</p>
              <p>Cart item name</p>
              <div className="btn">
                <span
                  onClick={() => {
                    setCount(count + 1);
                    prices == 0 ? setPrices(0) : setPrices(prices + 500);
                  }}
                >
                  +
                </span>
                <span className="num">{count}</span>
                <span
                  onClick={() => {
                    count == 0 ? setCount(0) : setCount(count - 1);
                    prices == 0 ? setPrices(0) : setPrices(prices - 500);
                  }}
                >
                  -
                </span>
              </div>
            </div>
            <div className="price">
              <p className="rate">500</p>
              <p className="discount">50% OFF</p>
              <p className="remove">Remove</p>
            </div>
          </div>
        </div>
        <div className="submit-btn">
          <button type="submit">Place order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
