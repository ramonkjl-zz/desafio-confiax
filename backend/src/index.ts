import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

import { createTableUsers } from './database'
import { Server } from './server';

createTableUsers()

new Server().serverRun()
