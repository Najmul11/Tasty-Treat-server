import { asyncError } from "../middlewares/errorMiddleware.js";
import { Review } from "../models/Review.js";

export const placeReview = asyncError(async(req, res, next) => {
  const {itemNo, feedback} =req.body


  const user = req.user._id
  if (!user) return  next(new ErrorHandler("Not Logged in", 401));

  const exists = await Review.findOne({$and: [{ user: req.user._id },{ itemNo: itemNo }]})
  if (exists) {
    exists.feedback=feedback
    await exists.save()
    return res.status(201).json({
        success: true,
        message: "Feedback updated",
      });
  }

  const userReview={
    itemNo:itemNo,
    feedback:feedback,
    user
  }
  await Review.create(userReview)

  res.status(201).json({
    success: true,
    message: "Thanks for the feedback",
  });
});  

export const getAllReviews = asyncError(async (req, res, next) => {
    const reviews = await Review.find({}).sort({data:-1}).limit(5).populate("user", "photo");
  
    res.status(200).json({ 
      success: true,
      reviews,
    });
  });

export const getItemReviews = asyncError(async (req, res, next) => {
    const reviews = await Review.find({
      itemNo:req.params.itemNo,
    }).populate("user",  "name photo")
  
    res.status(200).json({
      success: true,
      reviews,
    });
  });