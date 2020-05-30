// IMPORTANDO LIB
const express = require('express');

// INICIANDO FUNÇÃO
const app = express();


// CONFIGURANDO ROTA
app.get('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
        'Projeto 4'
    ]);
});

app.put('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 9',
        'Projeto 2',
        'Projeto 3',
        'Projeto 4'
    ]);
});

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 9',
        'Projeto 2',
        'Projeto 3',
    ]);
});

// CONFIGURANDO PORTA
app.listen(3333, () => {
    console.log("🚀 Servidor iniciado!"); 
});