import mongoose from "mongoose";

const passcodeSchema = new mongoose.Schema(
  {
    passcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Passcode = mongoose.model("Passcode", passcodeSchema);

export default Passcode;
