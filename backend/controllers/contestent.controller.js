import Contestent from "../models/contestent.model.js";
import {
  asyncHandler,
  errorHandler,
  responseHandler,
} from "../utilities/index.js";

const addContestent = asyncHandler(async (req, res, next) => {
  const { email, username, avatar, description } = req.body;

  if (!email || !username) {
    return next(new errorHandler("contestent data is required!", 400));
  }

  const existing = await Contestent.findOne({ email: email });

  if (existing) {
    return next(new errorHandler(" contestent already exists", 409));
  }

  // creating new contestent
  const data = {
    email,
    username,
  };

  if (avatar) data.avatar = avatar;
  if (description) data.description = description;
  const newContestent = await Contestent.create(data);
  // else..................................
  // const data = {
  // email,
  // username,
  // ...(avatar && { avatar }),
  // ...(description && { description })
  // };
  //-----------------------------------

  // const isValidPass = admin.password === password;
  if (newContestent) {
    return responseHandler(res, 200, { contestent: newContestent });
  }
});

const updateContestent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { email, username, avatar, description } = req.body;

  const existing = await Contestent.findById(id);
  if (!existing) {
    return next(new errorHandler("Contestant not found", 404));
  }

  // Update only the provided fields
  if (email) existing.email = email;
  if (username) existing.username = username;
  if (avatar !== undefined) existing.avatar = avatar;
  if (description !== undefined) existing.description = description;

  const updatedContestent = await Contestent.findByIdAndUpdate(
    id,
    {
      ...(email && { email }),
      ...(username && { username }),
      ...(avatar && { avatar }),
      ...(description && { description }),
    },
    { new: true, runValidators: true }
  );

  return responseHandler(res, 200, { contestent: updatedContestent });
});

const deleteContestent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const contestent = await Contestent.findById(id);
  if (!contestent) {
    return next(new errorHandler("Contestant not found", 404));
  }

  await contestent.deleteOne();

  return responseHandler(res, 200, {
    message: "Contestant deleted successfully",
  });
});

const getContestent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const contestent = await Contestent.findById(id);

  if (!contestent) {
    return next(new errorHandler("Contestant not found", 404));
  }

  return responseHandler(res, 200, { contestent });
});

const getAllContestents = asyncHandler(async (req, res, next) => {
  const contestents = await Contestent.find();

  if (!contestents) {
    return next(new errorHandler("Contestants are not found", 404));
  }
  return responseHandler(res, 200, { contestents });
});

export {
  addContestent,
  updateContestent,
  deleteContestent,
  getAllContestents,
  getContestent,
};
