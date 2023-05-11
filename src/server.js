/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'

/*
Exitem três formas do frontend ou qualquer aplicação que esteja consumindo
nossa API a enviar informações:
- Query Parameters = parâmetros nomeados localhost:3333/users?userId=1&... URL Stateful,
filtros, paginação

- Route Parameters =  parâmetros na rota localhost:3333/1 Identificação de recurso

- Request Body = Envio de informações de um formulário
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, params } = routeParams.groups

    req.params = params

    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  // GET /
  return res.writeHead(201).end('Hello World')
})

server.listen(3333)
