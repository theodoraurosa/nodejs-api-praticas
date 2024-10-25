
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