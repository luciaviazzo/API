import express from 'express'
import dotenv from 'dotenv'
import { PAINTINGS } from './data.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3003

const app = express()
//app.use(express.json())

//app.use('/api', bookRoutes(), userRouter)
//app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})