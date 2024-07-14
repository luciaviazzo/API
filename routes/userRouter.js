import { Router } from 'express'
import { userController } from '../controllers/userController.js'

export const userRoutes = () => {
    const userRouter = Router()
    const { register, login, getUserById , refreshToken } = userController()

    userRouter.post('/register', register)
    userRouter.post('/login', login)
    userRouter.get('/profile/:id', getUserById)
    userRouter.post('/refresh-token', refreshToken)

    return userRouter
}