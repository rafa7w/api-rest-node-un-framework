import { randomUUID } from 'node:crypto'
import { Database } from './database'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name: name, // quando a key e o valor são iguais pode passar só uma vez
        email: email
      }

      database.insert('users', user)

      return res.end('Criação de usuários')
    }
  }
]
