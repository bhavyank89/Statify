import fetch from 'node-fetch';

export const fetchGitHubStats = async (username) => {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) throw new Error('Failed to fetch user profile');
  const user = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  if (!reposRes.ok) throw new Error('Failed to fetch user repositories');
  const repos = await reposRes.json();

  // Top languages
  const languageCount = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  // Stars, forks
  const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const forks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  // Fake/simulated values for now (replace with real ones if you use GraphQL)
  const commitCount = Math.floor(Math.random() * 30);
  const mostActiveDay = 'Sunday';
  const contributionScore = commitCount + stars + forks;

  return {
    name: user.name,
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    forks,
    top_languages: topLanguages,
    most_active_day: mostActiveDay,
    commit_count: commitCount,
    contribution_score: contributionScore,
    date: new Date().toDateString(),
  };
};