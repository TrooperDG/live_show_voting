import Admin from "../models/admin.model.js";
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

  const admin = await Admin.findOne({ email });
  const isValidPass = admin.password === password;

  if (isValidPass) {
    const token = tokenGenerator(admin._id);
    cookieSender(res, token);
    return responseHandler(res, 200, { admin, token });
  } else {
    return next(new errorHandler(" invalid credentials", 401));
  }
});

const register = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!username || !password || !username) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const admin = await Admin.findOne({ email });
  if (admin) {
    return next(new errorHandler("Admin already exists!", 409));
  }

  const newAdmin = await Admin.create({
    username,
    email,
    password,
  });
  if (newAdmin) {
    const token = tokenGenerator(newAdmin._id);
    cookieSender(res, token);
    responseHandler(res, 201, { admin: newAdmin, token });
  }
});

const setPasscode = asyncHandler(async (req, res, next) => {
  const { passcode } = req.body;

  if (!passcode) {
    return next(new errorHandler("All fields are required!", 400));
  }

  // There should only be one passcode document in the collection
  const result = await Passcode.findOneAndUpdate(
    {}, // empty filter to target the single doc
    { passcode: passcode },
    { upsert: true, new: true } // create if not exists
  );

  if (result) {
    responseHandler(res, 200, { result });
  }
});

export { login, register, setPasscode };
