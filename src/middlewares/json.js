/* MIDDLEWARES nada mais são do que interceptadores => uma função que vai interceptar a requisição */
export async function json(req, res) {
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

  res.setHeader('Content-type', 'application/json')
}
