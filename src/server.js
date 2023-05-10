/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    // criando uma nova propriedade dentro de req com o nome body
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    req.body = null
  }

  // GET /users
  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
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
