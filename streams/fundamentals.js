// process = variável global do node

// tudo que se recebe de entrada, encaminhamos para uma saída
/*process.stdin
    .pipe(process.stdout) */

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    // método obrigatório
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i>100) {
                // push é um método que utilizamos para uma Readable Stream fornecer informações para quem está consumindo ela
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

// servem para transformar uma informação, um dado (um chunck) em outro
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        // primeiro parâmetro de um callback é o erro
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    // chunck é o pedaço que lemos da stream de leitura, ou seja, o que é enviado dentro do this.push() na stream de leitura
    // enconding é como a informação está codificada
    // callback é a função que a stream de escrita precisa chamar quando ela terminou de fazer o que ela precisava fazer com a informação
    _write(chunk, encoding, callback) {
        // não retorna nada, só processa o dado
        console.log(Number(chunk.toString()) * 10);
        callback()
    }
}



new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())