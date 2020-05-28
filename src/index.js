// IMPORTANDO LIB
const express = require('express');

// INICIANDO FUNÇÃO
const app = express();

// CONFIGURANDO ROTA
app.get('/', (request, response) => {
    return response.json({message : 'Hello World'});
})

// CONFIGURANDO PORTA
app.listen(3333);