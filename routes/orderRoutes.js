import express from "express";
import { getAdminOrders, getMyOrders, getOrderDetails,paymentIntent, placeOrder, placeOrderWithOnlinePayment, processOrder } from "../controllers/orderController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/createorder').post(isAuthenticated,placeOrder)
router.route('/createorderonlinepay').post(isAuthenticated,placeOrderWithOnlinePayment)


router.route('/createpaymentintent').post(isAuthenticated,paymentIntent)
// router.route('/savepayment').post(isAuthenticated,payment)


router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/order/:id", isAuthenticated, getOrderDetails);

// // Add Admin Middleware
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);



export default router;
