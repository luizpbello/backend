

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
    const msg = "ERRO: Não foi possível conectar ao MongoDB!";
    console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
  });
