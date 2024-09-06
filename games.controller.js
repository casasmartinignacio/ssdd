import { getGames, writeGames } from "./games.repositories.js";
import url from "url";
import { v4 as uuidv4 } from "uuid";

export const getAllGames = (req, res) => {
  const adr = req.url;
  const q = url.parse(adr, true);

  try {
    const result = getGames(q.query?.author);
    res.setHeader("Content-Type", "application/json");
    const response = {
      data: result,
    };
    res.end(JSON.stringify(response));
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end("Error");
  }
};

export const addGame = (req, res) => {
  try {
    // addGame(req, res)
    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk;
    });
    req.on("end", () => {
      const parsedBody = JSON.parse(body);
      if (!parsedBody.name || !parsedBody.description || !parsedBody.author) {
        res.writeHead(400, "Invalid request!!!!!");
        res.end();
        return;
      }
      const newDocument = {
        uid: uuidv4(),
        name: parsedBody.name,
        description: parsedBody.description,
        author: parsedBody.author,
      };
      const existingGames = getGames();
      existingGames.push(newDocument);
      writeGames(existingGames);
      res.end();
    });
  } catch (e) {
    console.log("Error", e);
    res.writeHead(500, "Error");
    res.end();
  }
};
