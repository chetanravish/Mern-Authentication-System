import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyMember",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("document", documentSchema);
