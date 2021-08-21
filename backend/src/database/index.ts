import { createConnection } from 'mysql2'
import { generateID } from '../utils'

const dbConnection = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
})

const asyncQuery = (query: string) => (
  new Promise((resolve, reject) => {
    dbConnection.query(query, (err, results) => {
      if (err)
        reject(err.message)
      else if (results)
        resolve(results)
    })
  })
)

const createUser = async ({ username, password }: User) => {
  const user: User = {
    id: generateID(),
    username,
    password
  }

  await asyncQuery(
    `INSERT INTO users
      (id, username, password)
    VALUES
      ("${user.id}", "${username}", "${password}")
    `)

  return user
}

const findAllUsers = async () => {
  const data = await asyncQuery(`SELECT * FROM users`) as Array<User>
  const users: Array<User> = []

  for (const user of data) {
    //@ts-ignore
    delete user.password
    users.push(user)
  }

  return users
}

const findOneUser = async (key: string) => {
  const data = await asyncQuery(
    `SELECT * FROM users
    WHERE id="${key}"
    OR username="${key}"
    `) as Array<User>

  const user: User = {
    id: data[0].id,
    username: data[0].username,
    password: data[0].password,
  }

  return user
}

export const createTableUsers = () => {
  asyncQuery(
    `CREATE TABLE IF NOT EXISTS users
  (
    id VARCHAR(30) PRIMARY KEY,
    username VARCHAR(220) UNIQUE NOT NULL,
    password VARCHAR(220) NOT NULL
  )
  `)
}

export {
  dbConnection,
  asyncQuery,
  createUser,
  findAllUsers,
  findOneUser
}
