//importaciones
import express from 'express'
import dotenv from 'dotenv'
import { PAINTINGS } from './data.js'
//import { v4 as uuid } from 'uuid'
import { paintingRoutes } from './routes/paintingRouter.js'

dotenv.config()

//puerto
const SERVER_PORT = process.env.SERVER_PORT || 3003

const app = express()
app.use(express.json())

app.use('/api', paintingRoutes(PAINTINGS))

//app.use('/api', bookRoutes(), userRouter)
//app.use(errorHandler)

//escucha el puerto
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})







/*
//pedir datos
app.get('/paintings', (_, res) => {
  return res.json(PAINTINGS)
})

app.get('/paintings/:id', (req, res) => {
  const { id } = req.params
  const painting = PAINTINGS.find((painting) => painting.id === id)
  if (!painting) {
    return res.status(404).json({ message: 'Painting not found' })
  }
  return res.status(200).json(painting)
})

//insertar nuevos datos
app.post('/paintings', (req, res) => {
  const newPainting = req.body
  const paintings = structuredClone(PAINTINGS)
  paintings.push({
    id: uuid(),
    ...newPainting
  })
  return res.status(201).json(paintings)
})

app.put('/paintings/:id', (req, res) => {
  const { id } = req.params
  const paintings = structuredClone(PAINTINGS)
  const painting = paintings.find((painting) => painting.id === id)
  if (!painting) {
    return res.status(404).json({ message: 'Painting not found' })
  }
  const updatedPainting = req.body
  const index = paintings.indexOf(painting)
  paintings.splice(index, 1, {id: painting.id, ...updatedPainting})
  return res.status(200).json(paintings)
})

app.delete('/paintings/:id', (req, res) => {
  const { id } = req.params
  const paintings = structuredClone(PAINTINGS)
  const painting = paintings.find((painting) => painting.id === id)
  if (!painting) {
    return res.status(404).json({ message: 'Painting not found' })
  }
  const index = paintings.indexOf(painting)
  paintings.splice(index, 1)
  return res.status(200).json(paintings)
})*/