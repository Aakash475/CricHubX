import React, { useEffect, useState } from 'react';
import { getAllTeams } from '../api/teamService';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getAllTeams().then((res) => setTeams(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">All Teams</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Owner</th>
            <th className="text-left px-4 py-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamid} className="border-t">
              <td className="px-4 py-2">{team.teamid}</td>
              <td className="px-4 py-2">{team.teamname}</td>
              <td className="px-4 py-2">{team.owner}</td>
              <td className="px-4 py-2">{team.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;