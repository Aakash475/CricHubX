import axios from 'axios';

const PLAYER_API = 'http://localhost:9090/player-api';

export const registerPlayer = (player) => axios.post(`${PLAYER_API}/save`, player);
export const getAllPlayers = () => axios.get(`${PLAYER_API}/all`);
export const getPlayerById = (id) => axios.get(`${PLAYER_API}/find/${id}`);