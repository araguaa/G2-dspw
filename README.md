# THE REDE SOCIAL

Projeto desenvolvido para a avaliação de Desenvolvimento de Software para Web.

A aplicação consiste em uma rede social simples, inspirada no estilo do Twitter antigo, com autenticação de usuários, publicação de posts e sistema de curtidas.

## Integrantes

- Luis Gustavo Pagliarini de Sousa
- Willian Peres Assunção

## Tecnologias utilizadas

Frontend:
- React
- Vite
- React Router DOM
- React Hook Form
- Axios
- CSS

Backend:
- Node.js
- Express
- SQLite
- Bcrypt
- JSON Web Token
- CORS

## Funcionalidades

- Cadastro de usuário
- Login
- Logout
- Senha armazenada com hash
- Listagem de posts para usuários logados e não logados
- Publicação de posts para usuários logados
- Curtir e descurtir posts
- Tema modo clássico e modo noite como feature extra
- Design inspirado em redes sociais antigas

## Como rodar a aplicação

Backend:

Abra um terminal e digite os comandos em sequência:

cd backend
npm install
node server.js

O backend será executado em:

http://localhost:3000

Frontend:

Abra outro terminal e digite os comandos em sequência:

cd frontend
npm install
npm run dev

O frontend será executado pelo Vite. Normalmente o endereço será:

http://localhost:5173

## Rotas principais da API

Autenticação:

POST /auth/register
POST /auth/login

Posts:

GET /posts
POST /posts

Curtidas:

POST /favorites/:id
DELETE /favorites/:id

## Observações

Para utilizar as funcionalidades de publicar, curtir e descurtir posts, o usuário precisa estar logado.

Usuários não logados conseguem visualizar a timeline de posts, mas não conseguem publicar ou curtir.
