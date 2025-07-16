import React, { useState } from 'react';
import { registerTeam } from '../api/teamService';

const TeamForm = () => {
  const [team, setTeam] = useState({ teamname: '', owner: '', area: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerTeam(team).then((res) => {
      alert(res.data);
      setTeam({ teamname: '', owner: '', area: '' });
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Register IPL Team</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Team Name"
          value={team.teamname}
          onChange={(e) => setTeam({ ...team, teamname: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Owner"
          value={team.owner}
          onChange={(e) => setTeam({ ...team, owner: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={team.area}
          onChange={(e) => setTeam({ ...team, area: e.target.value })}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Register Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;