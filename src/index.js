// IMPORTANDO LIB
const express = require('express');

// INICIANDO FUNÇÃO
const app = express();

// CONFIGURANDO ROTA
app.get('/', (request, response) => {
    return response.json({message : 'Hello GoStack'});
})

// CONFIGURANDO PORTA
app.listen(3333, () => {
    console.log("🚀 Servidor iniciado!"); 
});