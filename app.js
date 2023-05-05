require("dotenv").config({ path: "./.env" });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var supplierRouter = require("./routes/supplierRoutes");
var resourceRouter = require("./routes/resourceRoutes");
var unitRouter = require("./routes/unitRoutes");
var authRouter = require("./routes/authRoutes");
var userRouter = require("./routes/userRoutes");

var app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://panji-restful-api:XJt1S2khXV7zlvpM@cluster1.hagu1g3.mongodb.net/Inventory-Management-Database?retryWrites=true&w=majority"
  );
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", supplierRouter);
app.use("/", resourceRouter);
app.use("/", unitRouter);
app.use("/", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
