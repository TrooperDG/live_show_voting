import User from "../models/user.model.js";
import Passcode from "../models/passcode.model.js";
import Contestent from "../models/contestent.model.js";
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
  if (!user) {
    return next(new errorHandler("user not found", 404));
  }

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
  const { passcode, userId } = req.body;

  if (!passcode) {
    return next(new errorHandler("passcode is required!", 400));
  }

  const code = await Passcode.findOne({ passcode });
  const isValidPass = code ? true : false;

  if (isValidPass) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { passcode: passcode },
      { new: true }
    );
    return responseHandler(res, 200, { user: updatedUser });
  } else {
    return next(new errorHandler("passcode invalid", 401));
  }
});

const toggleVote = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Contestent ID
  const { voterId, voteStatus } = req.body; // Voter/User ID

  if (!voterId) {
    return next(new errorHandler("Voter ID is required", 400));
  }

  const contestent = await Contestent.findById(id);

  if (!contestent) {
    return next(new errorHandler("Contestant not found", 404));
  }

  const index = contestent.voters.indexOf(voterId);

  if (!voteStatus && index > -1) {
    contestent.voters.splice(index, 1);
  }
  if (voteStatus && index === -1) {
    contestent.voters.push(voterId);
  }

  const updated = await contestent.save();

  if (updated) {
    return responseHandler(res, 200, {
      voteStatus,
    });
  }
});

export { login, register, voterAccess, toggleVote };
