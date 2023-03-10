import mongoose from "mongoose";

const schema = new mongoose.Schema({
  itemNo: {
   type:String,
   required:true
  },
  feedback: {
    type:String,
    required:true
   },

   user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = mongoose.model("Review", schema);
