import express from 'express'
import userRouter from './users.routes'

const router = express.Router()

// all routes here actually start with: http://localhost:8000/my_api
router.get('/', (req, res) => {
  res.send("Hello there")
})

router.use('/users', userRouter)

export default router