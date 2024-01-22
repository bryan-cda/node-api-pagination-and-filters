import express from 'express'
import connectOnDatabase from './config/dbconnection.js'
import routes from './routes/index.js'
import mongoose from 'mongoose'

const connection = await connectOnDatabase()
connection.on('error', (erro) => {
  console.error('connection error', erro)
})

connection.once('open', () => {
  console.log('success on connect database')
})

const app = express()
routes(app)

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(500).json({ message: process.env.INVALID_ID_FORMAT_MESSAGE })
  } else {
    res.status(500).json({ message: process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR_MESSAGE })
  }
})

export default app
