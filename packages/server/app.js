// Central hub for all things express
import 'dotenv/config'
import express from 'express'
import keys from './config/keys'
import cors from 'cors'
import apiRouter from './routes'

const port = keys.app.port
const app = express()
// app.use is a dependency injecting method

// middleware - functions that run after receiving the request,
// but before sending the request to the endpoint
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
app.use(keys.app.apiUrl, apiRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))

