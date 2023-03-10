import mongoose from "mongoose";

const schema = new mongoose.Schema({
  stripe_payment_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
export const Payment = mongoose.model("Payment", schema);
