import { getGames, writeGames } from './games.repositories.js';
import { v4 as uuidv4 } from 'uuid';
export const getAllGames = (req, res) => {
    try {
        const result = getGames();
        res.setHeader('Content-Type', 'application/json');
        const response = {
            data: result,
        };
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.writeHead(500);
        res.end('Error');
    }
};

export const addGame = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body = body + chunk;
    });
    req.on('end', () => {
        const parsedBody = JSON.parse(body);
        if (!parsedBody.name || !parsedBody.description) {
            res.writeHead(400, 'Invalid request!');
            res.end();
        }
        const newDocument = {
            uid: uuidv4(),
            name: parsedBody.name,
            description: parsedBody.description,
        };
        const existingGames = getGames();
        existingGames.push(newDocument);
        writeGames(existingGames);
        res.end();
        //console.log('Llego esto ',parsedBody.name);
    });
};

export const deleteGame = (req, res) => {
    const id = req.url.split('/')[2];
    //console.log(id ==='');

    if (!id) {
        res.writeHead(400, 'Invalid request!');
        return res.end();
    }
    const gamelist = getGames();
    const myGameIndex = gamelist.findIndex(value => id === value.uid);
    //console.log(myGameIndex);
    if (myGameIndex < 0) {
        res.writeHead(400, 'Invalid request');
        return res.end();
    } else {
        gamelist.splice(myGameIndex, 1);
    }
    //console.log(gamelist);
    /*
            gamelist.map((element,index) => {
                if(element.uid===id){
                    gamelist.splice(index,1);
                }
            });*/
    //console.log(gamelist);
    writeGames(gamelist);
    res.end();
};
