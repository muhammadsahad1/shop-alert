import express from 'express'
import { login, signup, logout, subscribe, getSubscribed, subscribedToNewProducts, } from '../controllers/userController.js'
import { protect } from '../middleware/middlware.js'

const userRoute = express.Router()

userRoute.post('/signup', signup)
userRoute.post('/login', login)
userRoute.post('/logout', logout)
userRoute.post('/subscribe', protect, subscribe)
userRoute.get('/subscribe', protect, getSubscribed)
userRoute.post('/subscribe-new-products', protect, subscribedToNewProducts)
userRoute.post('/unSubscribe-new-products', protect, subscribedToNewProducts)

export default userRoute