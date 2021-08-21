import { Router } from "express"
import { UserController } from "../controllers/user"

const userRoutes = Router()

userRoutes
  .get('/users', new UserController().findAll)
  .get('/user/:id', new UserController().findOne)
  .post('/user-create', new UserController().create)
  .post('/user-sign-in', new UserController().signIn)

export { userRoutes }
