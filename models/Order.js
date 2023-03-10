import mongoose from "mongoose";

const schema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
  },

  orderItems: {
    theClassic: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },

    theCheesy: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },

    theFirecracker: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paymentMethod: {
    type: "String",
    enum: ["COD", "online"],
    default: "COD",
  },

  // paymentInfo: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Payment",
  // },
  // paidAt: Date,

  subTotal: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingCharges: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", schema);
