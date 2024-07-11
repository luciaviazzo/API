import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressjwt as ejwt } from 'express-jwt'
import { paintingRoutes } from './routes/paintingRouter.js'
import { userRoutes } from './routes/userRouter.js' 
import { paintingSavedRoutes } from './routes/paintingSavedRouter.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

// Creacion de apicacion Express
const app = express()
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))

// Configuración del middleware ejwt para autenticación JWT
app.use(ejwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['HS256'],
}).unless({
  path: [
    '/api/login',
    '/api/register',
    '/api/refresh-token',
    '/api/paintings',
    /^\/api\/paintings\/\d+$/,
    /^\/api\/profile\/\d+$/
  ],
}))

app.use('/api', paintingRoutes())
app.use('/api', userRoutes())
app.use('/api', paintingSavedRoutes())

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
