## Configurações iniciais ( dependências )

Clone o projeto

```bash
  git clone https://github.com/luizpbello/backend.git
```

Entre no diretório do projeto

```bash
  cd backend
```

Instale o Knex globalmente

```bash
  npm i -g knex
```

Instale as dependências

```bash
  npm install
```
### Iniciando os bancos de dados

Crie um banco de dados no Postgres e coloque os dados de acesso dentro do arquilo knexfile.js


Inicie o Mongo no terminal

```
mongod
```

Crie um arquivo .env com o authSecret para o passport-jwt


Inicie o servidor

```bash
  npm start
```
