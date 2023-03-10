import express from 'express'
import passport from 'passport'
import { getAdminUsers, logout, myProfile } from '../controllers/userController.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express()

router.get('/googlelogin', passport.authenticate("google",{
    scope:["profile"]
}))
router.get('/login', passport.authenticate("google",{
    scope:["profile"],
    successRedirect:'https://tasty-treat-65d32.web.app'
}))

router.get('/me',isAuthenticated,myProfile)

router.get('/logout',logout)

router.get('/admin/users', isAuthenticated,authorizeAdmin,getAdminUsers)

export default router;

