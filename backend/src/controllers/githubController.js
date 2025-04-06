import { fetchGitHubStats } from '../services/githubService.js';

export const getGitHubStats = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const data = await fetchGitHubStats(username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch GitHub data' });
  }
};