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

// Configuracion de Express
const app = express()
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))

// Ruta de POST
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).send('Upload failed')
    }
    res.status(200).json({ message: req.file })
  })
})

// Autenticacion de JWT
app.use(ejwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['HS256'],
}).unless({
  path: [
    '/api/login',
    '/api/register',
    '/api/refresh-token',
    '/api/paintings'
  ],
}))

app.use('/api', paintingRoutes(), userRoutes(), paintingSavedRoutes())

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})