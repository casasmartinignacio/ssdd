import http from "http";
import { getAllGames, addGame } from "./games.controller.js";
import url from "url";
//agregar un campo mas a los documentos, (autor), y el metodo get de games tiene que filtrar
const HTTP_PORT = 3000;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  if (q.pathname === "/games") {
    if (req.method === "GET") {
      getAllGames(req, res);
    } else if (req.method === "POST") {
      addGame(req, res);
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  } else {
    res.writeHead(404, "Ruta no encontrada");
    res.end();
  }
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
