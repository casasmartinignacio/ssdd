import { getGames, writeGames } from "./games.repositories.js";

import { v4 as uuidv4 } from "uuid";

export const getAllGames = (req, res) => {
  const param = req.query;
  try {
    const result = getGames(param?.author);
    res.setHeader("Content-Type", "application/json");
    const response = {
      data: result,
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send("problema del servidor xd");
  }
};

export const addGame = (req, res) => {
  try {
    // addGame(req, res)
    let body = req.body;
    if (!body.name || !body.description || !body.author) {
      res.status(500).send("metodo invalido");
    }
    const newDocument = {
      uid: uuidv4(),
      name: body.name,
      description: body.description,
      author: body.author,
    };
    const existingGames = getGames();
    existingGames.push(newDocument);
    writeGames(existingGames);
    res.end();
  } catch (e) {
    res.status(500).send("error");
  }
};
