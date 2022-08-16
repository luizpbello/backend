const app = require('express')()
const consign = require('consign')
const db = require('./config/db') // IMPORTANDO CONFIGURAÇÃO DE CONEXÃO COM O BANCO DE DADOS
const mongoose = require('mongoose')
const cors = require('cors')

require('./config/mongodb')

app.use(cors())
app.db = db // ATRIBUINDO O KNEX CONIGURADO NA VARIÁVEL DB PARA USO NO APP(EXPRESS)
app.mongoose = mongoose

consign()
  .include("config/passport.js")
  .then("config/middleware.js")
  .then("./api/validation.js")
  .then("api")
  .then('./schedules')
  .then("config/routes.js")
  .into(app);

app.listen(3030, () => {
  console.log("Backend executando");
});
