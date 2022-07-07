import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Login from "./components/Login";
import Product from "./components/Product";
import Register from "./components/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function App() {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      setCart(currentCart);
    }
    if (localStorage.getItem("user")) {
      const currUser = JSON.parse(localStorage.getItem("user"));
      setUser(currUser);
    }
    // if (localStorage.getItem("seller")) {
    //   const currseller = JSON.parse(localStorage.getItem("seller"));
    //   setUser(currseller);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // console.log(cart);
  useEffect(() => {
    axios
      .get("/product")
      .then(function (response) {
        // console.log(response.data.results);
        setData(response.data.results);
      })
      .catch(function (error) {
        // console.log(error);
      })
      .then(function () {
        // console.log(data);
      });
  }, []);

  const addToCart = (id) => {
    const Obj = data.filter((item) => {
      return item._id == id;
    });
    console.log(cart);
    // console.log(Obj[0]);
    if (cart.indexOf(Obj[0]) != -1) {
      incrementCount(id);
    } else {
      const cartItems = data.filter((item) => {
        return item._id == id;
      });

      cartItems.map((item) => {
        setCart([...cart, item]);
      });
    }
    toast.success("Item added to cart successfully", {
      position: "top-center",
    });
  };

  // console.log(cart);
  const removeBook = (id) => {
    const newState = cart.filter((item) => {
      return item._id != id;
    });

    // should turn the count of the remove item to 0
    let newObj = data.filter((item) => {
      return item._id == id;
    });

    let index = data.indexOf(newObj[0]);

    let newData = data.filter((item) => {
      return item._id != id;
    });
    newObj[0].count = 1;

    newData.splice(index, 0, newObj[0]);

    setData(newData);

    setCart(newState);
  };

  const incrementCount = (id) => {
    let newObj = cart.filter((item) => {
      return item._id == id;
    });

    let index = cart.indexOf(newObj[0]);

    let newState = cart.filter((item) => {
      return item._id !== id;
    });
    newObj[0].count += 1;

    newState.splice(index, 0, newObj[0]);

    setCart(newState);
  };

  const decrementCount = (id) => {
    let newObj = cart.filter((item) => {
      return item._id == id;
    });

    let index = cart.indexOf(newObj[0]);

    let newState = cart.filter((item) => {
      return item._id != id;
    });
    newObj[0].count -= 1;

    if (newObj[0].count == 0) {
      removeBook(id);
      return;
    }

    newState.splice(index, 0, newObj[0]);

    setCart(newState);
  };

  const setOriginalData = () => {
    data.map((item) => {
      removeBook(item._id);
    });
    // console.log(data);
    setCart([]);
  };
  return (
    <div className="App">
      {/* <Product /> */}
      {/* <Cart /> */}
      <Router>
        <Header
          data={data}
          addToCart={addToCart}
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/"
            element={<Product addToCart={addToCart} data={data} />}
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                incrementCount={incrementCount}
                decrementCount={decrementCount}
                removeBook={removeBook}
                setOriginalData={setOriginalData}
              />
            }
          ></Route>
        </Routes>
      </Router>
      {/* <Login />
      <Register /> */}
    </div>
  );
}

export default App;
