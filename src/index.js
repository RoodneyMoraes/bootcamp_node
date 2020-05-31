// IMPORTANDO LIB
const express = require('express');
const { uuid, isUuid } =require('uuidv4');

// INICIANDO FUNÇÃO
const app = express();

// CONFIGURANDO O EXPRESS PRA RECEBER (JSON)
app.use(express.json());

// CRIANDO VARIAVEIS PARA TRABALHAR COM AS ROTAS
const projects = [];
const logs = [];

// CRIANDO UMA MIDDLEWARES
function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    logs.push(logLabel);

    console.log(logLabel);
    
    return next();
    
}

// MIDDLEWARE PARA VALIDAR O ID
function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.' })
    }

    return next();
}

// CHAMANDO A MIDDLEWARE
app.use('/projects/:id', validateProjectId);

// CONFIGURANDO ROTA
app.get('/projects', logRequests, (request, response) => {
    const { title } = request.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return response.json(results);
});

// HISTORICO DE LOG
app.get('/logs', (request, response) => {
    return response.json(logs);
});

// ROTAS PROJECTS
app.post('/projects', logRequests, (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner }; 

    projects.push(project)

    return response.json(project);
});

app.put('/projects/:id', logRequests, (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ erro: 'Project not found.' })
    }

    const project = {id, title, owner }

    projects[projectIndex] = project;
    
    return response.json(project);
});

app.delete('/projects/:id', logRequests, (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ erro: 'Project not found.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

// CONFIGURANDO PORTA
app.listen(3333, () => {
    console.log("------------------"); 
    console.log("Servidor rodando!"); 
    console.log("------------------"); 
});