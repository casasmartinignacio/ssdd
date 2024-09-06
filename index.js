import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { getAllGames, deleteGame, addGame } from './games.controller.js';
import { v4 as uuidv4 } from 'uuid';
import { getGames, writeGames } from './games.repositories.js';
const port = process.env.SERVER_PORT || 3000

const app = express();
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`)
})

app.get('/games', (req,res) => {
    getAllGames(req, res);
})

app.post('/games', (req,res) => {
    addGame(req, res);
})

app.delete('/games/:gameid', (req,res) => {
    deleteGame(req, res);
})

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/games')) {
        //console.log('Entra')
        if (req.method === 'GET') {
            getAllGames(req, res);
        } else if (req.method === 'POST') {
            addGame(req, res);
        } else if (req.method === 'DELETE') {
            deleteGame(req, res);
        } else {
            res.writeHead(404, 'Ruta no encontrada');
        }
        res.end();
    } else {
        res.writeHead(404, 'Ruta no encontrada');
        res.end();
    }
});
/*
server.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
*/