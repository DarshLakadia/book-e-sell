import React, { useEffect, useState } from "react";
import "../cart.css";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = ({
  cart,
  incrementCount,
  decrementCount,
  removeBook,
  setOriginalData,
}) => {
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState(0);
  const [seller, setSeller] = useState([]);
  const [age, setAge] = useState([]);

  // console.log(seller);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const clickData = (_id) => {
    let obj = JSON.parse(localStorage.getItem("user"));
    const userId = obj._id;

    console.log(userId);
    let info = [];
    axios
      .post("/user/address", {
        _id: userId,
      })
      .then((response) => {
        console.log(response.data);
        console.log(data);
        data.map((book) => {
          let temp = book;
          temp.email = response.data.email;
          temp.firstName = response.data.firstName;
          temp.lastName = response.data.lastName;
          temp.address = response.data.address;
          info.push(temp);
          console.log(info);
        });

        axios
          .put("/seller/saveorder", {
            _id: _id,
            order: info,
          })
          .then(function (response) {
            console.log(response);
            setSeller([]);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("Place Order Successfully", {
      position: "top-center",
      hideProgressBar: true,
    });
  };
  const renderSeller = () => {
    axios
      .get("/seller/allsellers")
      .then((response) => {
        console.log(response.data.sellers);
        setSeller(response.data.sellers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  <img src={item.bookImage} alt="Image" />
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
          <button onClick={renderSeller}>Place order</button>

          <div className="showSeller">
            {seller.map((item) => {
              return (
                <div className="searchSeller">
                  <p id={item._id} onClick={() => clickData(item._id)}>
                    {item.firstName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
