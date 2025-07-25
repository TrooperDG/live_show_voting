// import User from "../models/user.model.js";
import Passcode from "../models/passcode.model.js";
import {
  asyncHandler,
  errorHandler,
  responseHandler,
} from "../utilities/index.js";

const login = asyncHandler(async (req, res, next) => {
  const { username, passcode } = req.body;

  if (!username || !passcode) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const code = await Passcode.findOne({ passcode });
  const isValidPass = code ? true : false;

  if (isValidPass) {
    return responseHandler(res, 200, { txt: "logged in" });
  } else {
    return next(new errorHandler("passcode invalid", 401));
  }
});

export { login };
