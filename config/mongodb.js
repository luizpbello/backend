const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://petcrud:2611rs@crud-pet.d3flumq.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true} )
    .catch(e => {
        const msg = 'ERRO: Não foi possível conectar ao MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })


    