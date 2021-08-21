import express, { json, urlencoded } from 'express'
import cors from 'cors'

import { userRoutes } from './routes/user'

class Server {
  private readonly express: express.Application
  private readonly PORT = process.env.PORT || 7000

  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
    this.listen()
  }

  public serverRun() {
    return this.express
  }

  private middlewares() {
    this.express.use(cors())
    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
  }

  private routes() {
    this.express.use(userRoutes)
  }

  private listen() {
    this.express.listen(this.PORT, () =>
      console.log(`server running on port ${this.PORT}`)
    )
  }
}

export { Server }
