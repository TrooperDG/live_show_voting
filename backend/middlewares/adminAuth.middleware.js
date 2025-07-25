import Admin from "../models/admin.model.js";
import {
  asyncHandler,
  errorHandler,
  responseHandler,
} from "../utilities/index.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findOne({ _id: req.userId });

  if (!admin) {
    return next(new errorHandler("access denied", 400));
  }

  return next();
});
