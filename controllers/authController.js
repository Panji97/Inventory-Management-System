const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.loginView = catchAsync(async (req, res, next) => {
  res.render("auth/login");
});

exports.registerView = catchAsync(async (req, res, next) => {
  res.render("auth/register");
});

exports.forgotPasswordView = catchAsync(async (req, res, next) => {
  res.render("auth/forgot-password");
});

// function data
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // const url = `${req.protocol}://${req.get("host")}/me`;
  // console.log(url);

  createSendToken(newUser, 201, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. check if email and password exist
  if (!email || !password) {
    return next(console.log("Please provide email and password"));
  }

  // 2. check if user exist and password correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(console.log(`Invalid email or password!`));
  }

  // 3. if everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = async (req, res) => {
  await res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1. Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.redirect("/login");
  }

  // 2. verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return console.log("The user belonging to this token does no longer exist");
  }

  // 4. check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return console.log("User recently changed password! Please log in again");
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        // 1. verify token
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3. check if user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 4. check if user changed password after the JWT was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  }
  if (condition) {
  } else if (condition) {
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // role permission ('admin','lead-guide')
    if (!roles.includes(req.user.role)) {
      return next(res.redirect("/profile"));
    }
    next();
  };
};
