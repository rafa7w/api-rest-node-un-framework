/*
É uma representação de um espaço na memória do computador, usado especificamente para transitar dados de uma maneira muito rápida. 
O node utiliza esse modelo de Buffer na leitura e na escrita de streams, porque é mais performático ler parcialmente uma informação de forma binária, que é como o Buffer guarda na memória, do que um texto, uma string.
Criado especificamente pela incapacidade do JavaScript de trabalhar com dados binários de maneira ineficiente. 
*/

const buf = Buffer.from('ok')

console.log(buf)
