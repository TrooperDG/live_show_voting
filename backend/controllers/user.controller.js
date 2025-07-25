import User from "../models/user.model.js";
import Passcode from "../models/passcode.model.js";
import {
  asyncHandler,
  errorHandler,
  responseHandler,
  cookieSender,
  tokenGenerator,
} from "../utilities/index.js";

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ email });
  const isValidPass = user.password === password;

  if (isValidPass) {
    const token = tokenGenerator(user._id);
    cookieSender(res, token);
    return responseHandler(res, 200, { user, token });
  } else {
    return next(new errorHandler(" invalid credentials", 401));
  }
});

const register = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!username || !password || !username) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("User already exists!", 409));
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });
  if (newUser) {
    const token = tokenGenerator(newUser._id);
    cookieSender(res, token);
    return responseHandler(res, 201, { user: newUser, token });
  }
});

const voterAccess = asyncHandler(async (req, res, next) => {
  const { passcode } = req.body;

  if (!passcode) {
    return next(new errorHandler("passcode is required!", 400));
  }

  const code = await Passcode.findOne({ passcode });
  const isValidPass = code ? true : false;

  if (isValidPass) {
    return responseHandler(res, 200, { code: code.passcode });
  } else {
    return next(new errorHandler("passcode invalid", 401));
  }
});

export { login, register, voterAccess };
