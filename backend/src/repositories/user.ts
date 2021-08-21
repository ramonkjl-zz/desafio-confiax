import { createUser, findOneUser } from "../database"

class UserRepository {
  async create({ username, password }: User) {
    await createUser({ username, password })
    const userCreated = await findOneUser(username)
    //@ts-ignore
    delete userCreated.password
    return userCreated
  }
}

export { UserRepository }
