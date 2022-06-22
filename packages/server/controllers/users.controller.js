// import { users } from '../database'
import { users } from '../database'

// The idea of a controller is to simply create all of the functions
// that are needed at all your endpoints

export const getAllUsers = (req, res, next) => {
  res.status(200).json(users)
}


export const createUser = (req, res, next) => {
  // take the submitted data out of the request body
  // and add it to my users "database"

  users.push(req.newUser) // req.newUser already ensures
  // that the data is valid because the request was already run
  // through our user processing middleware function
  
  res.status(200).json(req.newUser)
}
