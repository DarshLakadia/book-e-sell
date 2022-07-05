import React, { useState } from "react";
import M from "materialize-css";
import axios from "axios";

const Login = ({ user, setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);
          M.toast({
            html: "signedin success",
            classes: "#43a047 green darken-1",
          });
          // history.push("/");
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="title">Login</div>
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" onClick={() => postData()}>
            Login Here!!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import M from "materialize-css";
// // import Logo from "../assets/logo.jpg";

// const Login = ({ user, setUser }) => {
//   // const history = useHistory();
//   const [password, setPasword] = useState("");
//   const [email, setEmail] = useState("");
//   const PostData = () => {
//     if (
//       !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         email
//       )
//     ) {
//       M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
//       return;
//     }
//     fetch("/signin", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         password,
//         email,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log(data);
//         if (data.error) {
//           M.toast({ html: data.error, classes: "#c62828 red darken-3" });
//         } else {
//           localStorage.setItem("jwt", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));
//           // console.log(data.user);
//           M.toast({
//             html: "signedin success",
//             classes: "#43a047 green darken-1",
//           });
//           // history.push("/");
//           setUser(data.user);
//         }
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   };
//   return (
//     <div className="mycard">
//       <div className="card auth-card input-field">
//         {/* <img className="logo" src={Logo} alt="E-Book-Sale" /> */}
//         <input
//           type="text"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPasword(e.target.value)}
//         />
//         <button
//           className="btn waves-effect waves-light #64b5f6 blue darken-1"
//           onClick={() => PostData()}
//         >
//           Login
//         </button>
//         <h5>
//           <Link to="/register">Dont have an account ?</Link>
//         </h5>
//       </div>
//     </div>
//   );
// };

// export default Login;
