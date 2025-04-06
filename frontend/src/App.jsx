import React, { useState } from 'react';
import BackgroundBoxesDemo from './components/BackgroundBoxesDemo';
import Receipt from './components/Receipt';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchGitHubData } from './services/api';
import './App.css';

const App = () => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async (username) => {
    setLoading(true);
    setError(null);
    setGithubData(null);
    try {
      const data = await fetchGitHubData(username);
      setGithubData(data);
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 relative overflow-hidden">
      <BackgroundBoxesDemo onSubmit={handleFetchData} />
      <div className="relative z-50">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {githubData && <Receipt data={githubData} />}
      </div>
    </div>
  );
};

export default App;