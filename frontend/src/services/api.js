export const fetchGitHubData = async (username) => {
    const response = await fetch(`/api/github-stats?username=${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the server.');
    }
    return await response.json();
  };