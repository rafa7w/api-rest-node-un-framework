/* CommonJS => require
ESModules => import/export 
Para diferenciar módulos node de terceiros colocar node como prefixo */

import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello World')
})

server.listen(3333)
