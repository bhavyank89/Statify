import express from 'express';
import { getGitHubStats } from '../controllers/githubController.js';

const router = express.Router();

router.get('/github-stats', getGitHubStats);

export default router