import { Request, Response } from "express";
import { findAllUsers, findOneUser } from "../database";
import { UserRepository } from "../repositories/user";

class UserController {

  async findAll(request: Request, response: Response) {
    const data = await findAllUsers()
    return response.json(data)
  }

  async findOne(request: Request, response: Response) {
    const { id } = request.params
    try {
      const user = await findOneUser(id)
      //@ts-ignore
      delete user.password
      return response.json(user)
    } catch (error) {
      return response.status(400).json({ error: true, message: error.message })
    }
  }

  async create(request: Request, response: Response) {
    const { username, password, repeatPassword } = request.body

    if (!username)
      return response.status(400).json({ error: true, message: 'Username is empty.' })
    if (!password)
      return response.status(400).json({ error: true, message: 'Password is empty.' })
    if (password !== repeatPassword)
      return response.status(400).json({ error: true, message: 'Password and repeatPassword is conflite' })

    const user: User = {
      username,
      password
    }

    try {
      const createdUser = await new UserRepository().create(user)
      return response.json(createdUser)
    } catch (error) {
      return response.status(400).json({ error: true, message: error })
    }
  }

  async signIn(request: Request, response: Response) {
    const { username, password } = request.body

    try {
      const userAuth = await findOneUser(username)

      if (userAuth.password === password) {
        //@ts-ignore
        delete userAuth.password
        return response.json(userAuth)
      }
      else
        return response.json({ error: true, message: 'Username or password invalid.' })
    } catch (error) {
      return response.status(500).json({ error: true, message: error.message })
    }
  }
}

export { UserController }