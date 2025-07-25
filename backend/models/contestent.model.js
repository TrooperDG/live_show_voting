import mongoose from "mongoose";

const contestentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Contestent = mongoose.model("Contestent", contestentSchema);

export default Contestent;
