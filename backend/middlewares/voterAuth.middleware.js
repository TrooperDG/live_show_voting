import User from "../models/user.model.js";
import Passcode from "../models/passcode.model.js";
import {
  asyncHandler,
  errorHandler,
  responseHandler,
} from "../utilities/index.js";

export const hasVoterAccess = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return next(new errorHandler("no user", 404));
  }

  const code = await Passcode.findOne({ passcode: user?.passcode });

  if (!code) {
    return next(new errorHandler("voter access denied", 400));
  }

  return next();
});
