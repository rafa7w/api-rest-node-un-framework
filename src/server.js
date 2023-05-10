/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com'
    })
    return res.end('Criação de usuários')
  }

  return res.writeHead(201).end('Hello World')
})

server.listen(3333)
