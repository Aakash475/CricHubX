import React, { useEffect, useState } from 'react';
import { getAllPlayers } from '../api/playerService';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers().then((res) => setPlayers(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-green-700 mb-4">All Players</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Age</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="text-left px-4 py-2">Team</th>
            <th className="text-left px-4 py-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.pid} className="border-t">
              <td className="px-4 py-2">{player.pid}</td>
              <td className="px-4 py-2">{player.pname}</td>
              <td className="px-4 py-2">{player.age}</td>
              <td className="px-4 py-2">{player.role}</td>
              <td className="px-4 py-2">{player.team?.teamname}</td>
              <td className="px-4 py-2">{player.team?.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
