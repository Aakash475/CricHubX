import axios from 'axios';

const TEAM_API = 'http://localhost:9090/team-api';

export const registerTeam = (team) => axios.post(`${TEAM_API}/register`, team);
export const getAllTeams = () => axios.get(`${TEAM_API}/all`);
export const getTeamById = (id) => axios.get(`${TEAM_API}/find/${id}`);
