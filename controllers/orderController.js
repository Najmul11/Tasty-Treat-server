import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Order.js";

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51MM2bXEUzOIjs385qeyS5LOwuLcEIhKbcApMs5qIL1xVqRyo0v9UTQEV5N9dzUoO7ZGxK7rhFp9sFPogBDIVoGzE002s7h3wEx')

export const placeOrder = asyncError(async(req, res, next) => {

  const {cartItem,subTotal,tax,shippingCharge, total, shippingInfo} = req.body;
  const shipping = {address:shippingInfo.address, phoneNo:shippingInfo.phone}


  const user = req.user._id
  if (!user) return  next(new ErrorHandler("Not Logged in", 401));


  const orderOptions = {
    shippingInfo:shipping,
    orderItems:cartItem,
    subTotal,
    taxPrice:tax,
    shippingCharges:shippingCharge,
    totalAmount:total,
    user,
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
  });
});

export const placeOrderWithOnlinePayment = asyncError(async(req, res, next) => {

  const {cartItem,subTotal,tax,shippingCharge, total, shippingInfo,paymentMethod} = req.body;
  const shipping = {address:shippingInfo.address, phoneNo:shippingInfo.phone}


  const user = req.user._id
  if (!user) return  next(new ErrorHandler("Not Logged in", 401));


  const orderOptions = {
    shippingInfo:shipping,
    orderItems:cartItem,
    subTotal,
    taxPrice:tax,
    shippingCharges:shippingCharge,
    totalAmount:total,
    user,
    paymentMethod
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
  });
});




export const getMyOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  }).populate("user", "photo");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});


export const processOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("Food Already Delivered", 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: "Status Updated Successfully",
  });
});


export const paymentIntent = asyncError(async (req, res, next) => {
  const total=req.body.total
  console.log(total);
  const amount= total *100
  const paymentIntent= await stripe.paymentIntents.create({
      currency:'bdt',
      amount:amount,
      "payment_method_types": [
          "card"
      ]
  })
  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret
  });

});


// export const payment = asyncError(async (req, res, next) => {
//   const payId=req.body.payId

//   await Payment.create({payId});
 
//   res.status(200).json({
//     success: true,
//     message:'Payment successfull'
//   });

// });
