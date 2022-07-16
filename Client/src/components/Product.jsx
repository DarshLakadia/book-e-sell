import React from "react";
import "../product.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import axios from "axios";

const Product = ({ data, addToCart }) => {
  const initialText = "Ascending";
  const [curData, setCurData] = useState(data);
  let [isSorted, setIsSorted] = useState();
  const [text, setText] = useState(initialText);

  const changeState = () => {
    isSorted == true ? setText("Ascending") : setText("Descending");
    setIsSorted(!isSorted);
    isSorted =
      isSorted == true
        ? setCurData(
            curData.sort((a, b) => {
              return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
            })
          )
        : setCurData(
            curData.sort((a, b) => {
              return b.title.toLowerCase() > a.title.toLowerCase() ? 1 : -1;
            })
          );
  };
  const changeCategory = (str) => {
    axios
      .get("/product")
      .then(function (response) {
        let newData = response.data.results.filter((item) => {
          // console.log(item.category);
          return item.category == str;
        });
        setCurData(newData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log(curData);
  useEffect(() => {
    setCurData(
      curData.sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      })
    );
  }, [curData]);

  // console.log(isSorted);
  useEffect(() => {
    setCurData(data);
  }, []);
  // console.log(curData);
  // console.log(data);
  return (
    <div className="product">
      <div className="products-container">
        <div className="title">
          <div className="title-name"> All Available Books</div>
        </div>
        <div className="count"></div>
        <div className="product-details">
          <div className="name">
            <ButtonGroup
              color="primary"
              aria-label="medium secondary button group"
              style={{ width: "130%", maxWidth: "130%" }}
            >
              <Button onClick={() => changeCategory("Fiction")}>Fiction</Button>
              <Button onClick={() => changeCategory("Non Fiction")}>
                Non Fiction
              </Button>
            </ButtonGroup>
          </div>
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
