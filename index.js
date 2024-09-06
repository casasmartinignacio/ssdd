import http from "http";
import { getAllGames, addGame } from "./games.controller.js";
import url from "url";
import express from "express";
import bodyParser from "body-parser";
//agregar un campo mas a los documentos, (autor), y el metodo get de games tiene que filtrar
const HTTP_PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.get("/games", (req, res) => {
  getAllGames(req, res);
});
app.post("/games", (req, res) => {
  addGame(req, res);
});
app.use((err, req, res, next) => {
  res.status(400).send("metodo invalido");
});

app.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
