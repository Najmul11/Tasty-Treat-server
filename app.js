import express from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { connectPassport } from "./utils/Provider.js";
import passport from 'passport'
import cookieParser from "cookie-parser";
import cors from 'cors'

import session from "express-session"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";



const app = express()

dotenv.config({
    path:"./config/config.env"
})

app.use(cors({
    origin: ['https://tasty-treat-65d32.web.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));



/**MIDDLEWARES */
app.use(express.json())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


connectPassport()

/**Routes */
app.use('/api/v1', userRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', reviewRoutes)




app.use(errorMiddleware)

export default app
