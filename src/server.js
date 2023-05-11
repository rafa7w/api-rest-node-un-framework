/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  // GET /
  return res.writeHead(201).end('Hello World')
})

server.listen(3333)
