# ybooks-backend
API de um side project desenvolvido com base em um teste de desenvolvedor fullstack.

Criar um sistema de controle de aluguel livros em uma biblioteca. Dados:

- um livro pode ter varias copias
- uma copia não pode estar com mais de uma pessoa ao mesmo tempo

Todos os campos são obrigatórios

## Cadastro usuário
- Nome
- CPF
- Data Nascimento
- Endereço completo

## Cadastro de livro
- Titulo
- Autor
- ISBN
- Código da cópia

## Funcionalidades
- [x] Pessoa: CRUD
- [x] Livro: CRUD
- [x] Copia: CRUD
- [x] Controle de aluguel

## Requisitos
- Persistencia utlizando banco de dados relacional open source (MySQL, Postgresql, Firebird, etc..) de sua preferencia
- RESTful JSON
- Autenticacao JWT
- Listar o titulo dos 3 livros que mais tiveram atraso na devolução por mes durante o ano (mostrar todos os meses do ano)
- Listar o titulo dos 3 livros mais alugados por cidade durante o ano (mostrar todos os meses do ano)
- Se pessoa atrasou devolução mais de 2x ela não pode alugar mais
