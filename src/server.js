/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  // GET /users
  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
  }

  // POST /users
  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name: name,
      email: email
    })
    return res.end('Criação de usuários')
  }

  // GET /
  return res.writeHead(201).end('Hello World')
})

server.listen(3333)
