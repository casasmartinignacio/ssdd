import { readFileSync, writeFileSync, existsSync} from 'fs';
import { parse } from 'path';
export const  FILE_PATH = './games.json'

//Metodo para leer y metodo para escribir. EN un backend real estaria la conexion con la BDD

export const getGames = () => {
    const fileExist = existsSync(FILE_PATH);
    if (fileExist) {
        const file = readFileSync(FILE_PATH,'utf-8');
        //Parsear json a objeto javascript
        const parsedFile = JSON.parse(file);
        return parsedFile;

    } else {
        return [];
    }

}

export const writeGames = (games) =>{
    writeFileSync(FILE_PATH, JSON.stringify(games,null,2));

}