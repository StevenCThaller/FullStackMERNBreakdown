import { users } from "../database"
import bcrypt from 'bcryptjs'
import keys from "../config/keys"

const processUserBody = (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } =req.body

  const errors = {}


  // validations:
  if(!firstName || firstName?.length === 0) {
    errors.firstName = "This field is required."
  } else if(firstName.length > 40) {
    errors.firstName = "This field cannot be more than 40 characters"
  }
  if(!lastName || lastName?.length === 0) {
    errors.lastName = "This field is required."
  } else if(lastName.length > 40) {
    errors.lastName = "This field cannot be more than 40 characters"
  }
  if(!email || email?.length === 0) {
    errors.email = "This field cannot be empty."
  }
  if(!password ||password?.length === 0) {
    errors.password = "Password is required."
  } else if(password !== confirmPassword) {
    errors.password = "Passwords must match"
  }

  if(Object.keys(errors).length > 0){
    return res.status(400).json({ error: "Invalid", errors: errors})
  }

  const hashedPw = bcrypt.hashSync(password, keys.app.hashRounds)

  req.newUser = {
    id: users.length > 0 ? users[users.length-1].id + 1 : 1,
    firstName,
    lastName,
    email,
    password: hashedPw
  }

  next()
}


export default processUserBody