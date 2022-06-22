import express from 'express'
import { getAllUsers, createUser } from '../controllers/users.controller'
import processUserBody from '../middleware/processUserBody'

const router = express.Router()

// all routes in this file start with: http://localhost:8000/my_api/users
router.route('/')
  // basic idea: get me all the users
  .get(getAllUsers)
  .post(processUserBody, createUser)



export default router