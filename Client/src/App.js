import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Login from "./components/Login";
import Product from "./components/Product";
import Register from "./components/Register";
import M from "materialize-css";

function App() {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let curUser = localStorage.getItem("user");
      setUser(curUser);
    }
  }, []);

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
    <div className="App">
      {/* <Product /> */}
      {/* <Cart /> */}
      <Router>
        <Header user={user} setUser={setUser} />
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
            element={<Product user={user} setUser={setUser} />}
          ></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
      {/* <Login />
      <Register /> */}
    </div>
  );
}

export default App;
