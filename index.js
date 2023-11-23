const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const connectionDB = require("./config/Database");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../public"))); // use static assets
app.set("view engine", "ejs"); // set the ejs engine

app.get("/", function (req, res) {
  res.json({
    message: "Welcome To NagriExpress Server ! and Author is RohitKohli",
    status: "200",
  });
});

// signup route
const signupRoute = require("./routes/Signup.routes");
const loginRoute = require("./routes/login.routes");
const aboutRoute = require("./routes/about.routes");
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/about", aboutRoute);

module.exports = app;

// Start the server and connect the mongodb database
connectionDB();

app.listen(PORT, function () {
  console.log(`********** Server is start :- ${PORT} **********`);
});
