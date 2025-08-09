import React, { useState } from 'react';
import BackgroundBoxesDemo from './components/BackgroundBoxesDemo';
import Receipt from './components/Receipt';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Boxes } from "./components/ui/background-boxes";

const App = () => {
  const [githubData, setGithubData] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async (username) => {
    setLoading(true);
    setError(null);
    setGithubData(null);
    setShow(false); // reset view before fetching

    try {
      const URL = `http://localhost:5000/api/github-stats?username=${username}`;
      console.log(URL);

      const response = await fetch(URL, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setGithubData(data);
      setShow(true);
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <Boxes className="absolute top-0 left-0 w-full h-full" />
      </div>

      {/* Mask overlay */}
      <div className="absolute inset-0 w-full h-full z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="relative z-50 p-4 max-w-2xl mx-auto">
        <Router>
          {/* Error message with fade in/out */}
          {error && (
            <ErrorMessage
              message={error}
              onClose={() => setError(null)}
            />
          )}

          <Routes>
            <Route
              path="/"
              element={
                <BackgroundBoxesDemo
                  show={show}
                  setShow={setShow}
                  onSubmit={handleFetchData}
                />
              }
            />
          </Routes>

          {/* Loading spinner */}
          {loading && <LoadingSpinner />}

          {/* Receipt only if we have data, no error, and show flag is true */}
          {!error && show && githubData && <Receipt setShow={setShow} data={githubData} />}
        </Router>
      </div>
    </div>
  );
};

export default App;
