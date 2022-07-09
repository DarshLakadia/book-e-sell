import React from "react";
import "../product.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
const Product = ({ data, addToCart }) => {
  const initialText = "Ascending";
  const [curData, setCurData] = useState(data);
  const [isSorted, setIsSorted] = useState();
  const [text, setText] = useState(initialText);

  function changeState() {
    isSorted == true ? setText("Ascending") : setText("Descending");
    setIsSorted(!isSorted);
    isSorted =
      isSorted == true
        ? setCurData(
            data.sort((a, b) => {
              return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
            })
          )
        : setCurData(
            data.sort((a, b) => {
              return b.title.toLowerCase() > a.title.toLowerCase() ? 1 : -1;
            })
          );
  }
  // console.log(curData);
  useEffect(() => {
    {
      setCurData(
        data.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        })
      );
    }
  }, [data, curData]);

  // console.log(isSorted);
  useEffect(() => {
    setCurData(data);
  }, [data]);
  // console.log(curData);
  console.log(data);
  return (
    <div className="product">
      <div className="product-container">
        <div className="title">
          <div className="title-name"> All Available Books</div>
          {/* <div className="cart">
            <button style={{ right: "0" }}>
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
          </div> */}
        </div>
        <div className="count"></div>
        <div className="product-details">
          <div className="name"></div>
          <div className="sort">
            <Button
              onClick={changeState}
              style={{ color: "blue" }}
              color="success"
            >
              {text}
            </Button>
          </div>
        </div>
        <div className="main-container">
          {curData.map((book) => {
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
    </div>
  );
};

export default Product;
