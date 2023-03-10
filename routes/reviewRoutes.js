import express from "express";
import { getAllReviews, getItemReviews, placeReview } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route(`/createreview`).post(isAuthenticated,placeReview)

router.route(`/itemreviews/:itemNo`).get(getItemReviews)
router.route('/allreviews').get(getAllReviews)

export default router;
