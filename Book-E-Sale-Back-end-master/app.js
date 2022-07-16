const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/userRoutes");
const bookRoutes = require("./api/routes/bookRoutes");
const sellerRoutes = require("./api/routes/sellerRoutes");
const mongoose = require("mongoose");
const { MONGO_URI, JWT_SECRET } = require("./config/keys");
const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 5000;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("ERROR IN CONNECTING \n", err);
});
//Prevent or Handling CORS Error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-methos", "PUT,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);
app.use("/product", bookRoutes);
app.use("/seller", sellerRoutes);
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

module.exports = app;

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const PORT = process.env.PORT || 5000;
// const { MONGOURI } = require("./config/keys");

// mongoose.connect(MONGOURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("connected", () => {
//   console.log("conneted to mongo");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("ERROR IN CONNECTING \n", err);
// });

// app.use(express.json());
// app.use(require("./routes/books"));
// app.use(require("./routes/user"));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
