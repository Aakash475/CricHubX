import React from 'react';
import TeamForm from './components/TeamForm';
import TeamList from './components/TeamList';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import './App.css'; 

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        IPL Team & Player Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div>
          <TeamForm />
          <div className="mt-6">
            <TeamList />
          </div>
        </div>
        <div>
          <PlayerForm />
          <div className="mt-6">
            <PlayerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
