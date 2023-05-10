/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'
import { Database } from './middlewares/database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  // GET /users
  if (method === 'GET' && url === '/users') {
    const users = database.select('users')
    return res.end(JSON.stringify(users))
  }

  // POST /users
  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: 1,
      name: name, // quando a key e o valor são iguais pode passar só uma vez
      email: email
    }

    database.insert('users', user)

    return res.end('Criação de usuários')
  }

  // GET /
  return res.writeHead(201).end('Hello World')
})

server.listen(3333)
