// import http from 'http';
import express from 'express'
import bodyParser from 'body-parser';
import { getAllGames } from './game.controller.js';
import { v4 as uuidv4 } from 'uuid';
import { getGames, writeGames } from './game.repositories.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/games', getAllGames);
app.post('/games', (req, res) => {
    try {
        // addGame(req, res)
        const parsedBody = req.body;
        if (!parsedBody.name || !parsedBody.description) {
            res.status(400).send('Invalid request!!!!!')
            return;
        }
        const newDocument = {
            uid: uuidv4(),
            name: parsedBody.name,
            description: parsedBody.description
        }
        const existingGames = getGames();
        existingGames.push(newDocument)
        writeGames(existingGames);
        res.end()
    } catch (e) {
        console.log('Error', e)
        res.status(500).send("Error")
    }
})

app.patch('/games', (req, res) => {
    try {
        // addGame(req, res)
        const parsedBody = req.body;
        if (!parsedBody.name || !parsedBody.description) {
            res.status(400).send('Invalid request!!!!!')
            return;
        }
        const newDocument = {
            uid: parsedBody.uid,
            name: parsedBody.name,
            description: parsedBody.description
        }
        const existingGames = getGames();
        const buscado = existingGames.findIndex((item) => {
            return item.uid === newDocument.uid
        })
        console.log(buscado)
        if(buscado < 0){
            res.status(404).send('Ruta no encontrada');
            return
        }
        const oldItem = existingGames[buscado];
        existingGames[buscado] = {
            uid: parsedBody.uid,
            name: parsedBody.name || oldItem.name,
            description: parsedBody.description || oldItem.description
        }
        writeGames(existingGames);
        res.end()
    } catch (e) {
        console.log('Error', e)
        res.status(500).send("Error")
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})