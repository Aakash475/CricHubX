import React, { useState, useEffect } from 'react';
import { registerPlayer } from '../api/playerService';
import { getAllTeams } from '../api/teamService';

const PlayerForm = () => {
  const [teams, setTeams] = useState([]);
  const [player, setPlayer] = useState({ pname: '', age: '', role: '', team: { teamid: '' } });

  useEffect(() => {
    getAllTeams().then((res) => setTeams(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerPlayer({
      ...player,
      age: parseInt(player.age),
      team: { teamid: parseInt(player.team.teamid) }
    }).then((res) => {
      alert(res.data);
      setPlayer({ pname: '', age: '', role: '', team: { teamid: '' } });
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Register IPL Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Player Name"
          value={player.pname}
          onChange={(e) => setPlayer({ ...player, pname: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={player.age}
          onChange={(e) => setPlayer({ ...player, age: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={player.role}
          onChange={(e) => setPlayer({ ...player, role: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500"
          required
        />
        <select
          value={player.team.teamid}
          onChange={(e) => setPlayer({ ...player, team: { teamid: e.target.value } })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.teamid} value={team.teamid}>
              {team.teamname} ({team.owner})
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Register Player
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;