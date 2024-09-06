import { getGames } from "./games_repositories.js";
export const getAllGames = (req,res) => {
    try {
        const result = getGames();
        
    } catch (error) {
        
    }
}


export const addGame = (game) => {
    return;
}