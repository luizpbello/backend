const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
const cors = require('cors')

require('./config/mongodb')

app.use(cors())
app.db = db 
app.mongoose = mongoose

consign()
  .include("config/passport.js")
  .then("config/middleware.js")
  .then("./api/validation.js")
  .then("api")
  .then('./schedules')
  .then("config/routes.js")
  .into(app);

app.listen(process.env.PORT || 3030, () => {
  console.log("Backend rodando");
});
