
//modulo http criado


// - criar usuarios
//- listagem usuarios
//-  Edicao de usuarios
//-  Remoçao de usuarios

// - HTTP {GET, POST, PUT, PATCH, DELETE}
// -Metodo HTTP
// -URL

// Principais  metodoa http {GET, POST, PUT, PATCH, DELETE}
// GET => buscar um recurso  do back-end
//POST => criar um recurso no back- end
// PUT => Atualizar um recurso no back-end(varias actualizacao.ex:noem, email, ..etc)
// PATCH => Actualizar uma informacao especifica de um recurso no back-end(uma unica actualizacao.Ex: nome)
// DELETE => Deletar um recurso dol back-end


// GET / users => Buscando usuarios do back-end
// POST / users => Criar um  usuario no  back-end

// Aula2
// Stateful: depende da memoria,  das informacoes q sao salvas em memorias e pode funcionar de forma diferentes 
// Stateless:  nao salva nada em memoria , geralmente salva as informacoes em banco de dados, arquivos de textos  e funciona da mesma forma, sem sofrer alteracao

// Cabecalho(Requisicao/resposta) => metadados: sao informacoes que quanto  o back-end e front saibam lidas com requisicoes de melhor  forma.


import http from 'node:http';
import { randomUUID } from 'node:crypto';

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString(); 
    });

    request.on('end', () => {
      try {
        const { name, email, phone } = JSON.parse(body);

        if(name === "" || name === undefined){
           return response.writeHead(400).end('o campo name nao pode ser vazio')
        }

        if( email ==="" || email === undefined){
           return response.writeHead(400).end(' o campo email nao pode ser vazio')
        }

        if( phone === null || phone ===undefined){
           return response.writeHead(400).end('null')
        }

        users.push({
          id: randomUUID(),
          name,
          email,
          phone,
        });

        return response.writeHead(201).end();
      } catch (error) {
        return response.writeHead(400).end('Invalid JSON');
      }
    });
  } else {
    return response.writeHead(404).end();
  }
});

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});