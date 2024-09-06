import express from "express";
import bodyParser from "body-parser";

import { getAllGames } from "./games_controller.js";
import { v4 as uuidv4 } from "uuid";
import { getGames, writeGames } from "./games_repositories.js";

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.get('/games', (req, res) => {
    getAllGames(req, res);
    res.status(200).json({ data: 'Ruta pedida exitosamente!' })
});

app.post('/games', (req, res) => {
    try {
        // addGame(req, res)
        let body = req.body;
        const newDocument = {
            uid: uuidv4(),
            name: body.name,
            description: body.description
        };
        const existingGames = getGames();
        existingGames.push(newDocument);
        writeGames(existingGames);
        res.status(200).json("Objecto creado correctamente");
      } catch (e) {
        console.log("Error", e);
        res.status(500).json("No se pudo crear el objecto");
      }
})



app.delete('/games/:gameid', (req, res) => {
    let id = req.params.gameid;
    let existingGames = getGames();
    // usar metodo findID buscar por ID, y si no existe tirar error 404
    if (existingGames.find((objeto) => objeto.uid === id)) {
        //si existe
        existingGames = existingGames.filter((objecto) => objecto.uid !== id);
        console.log(existingGames);
        writeGames(existingGames);
    } else {
        res.status(404,"Game not found");
    }

    console.log(req.query)
    res.status(200).json({ data: 'Game deleted' });
})

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
})