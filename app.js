import express from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { connectPassport } from "./utils/Provider.js";
import passport from 'passport'
import cookieParser from "cookie-parser";

import session from "express-session"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";



const app = express()

dotenv.config({
    path:"./config/config.env"
})



/**MIDDLEWARES */
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


connectPassport()

/**Routes */
app.use('/api/v1', userRoutes)
app.use('/api/v1', orderRoutes)



app.use(errorMiddleware)

export default app
