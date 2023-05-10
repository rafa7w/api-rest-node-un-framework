import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async(req, res) => {
    // consumindo stream completa
    const buffers = []

    // permite percorrer cada pedacinho da req e adicionar dentro do array de buffers 
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    /*return req
        .pipe(new InverseNumberStream())
        .pipe(res)*/
})

server.listen(3334)