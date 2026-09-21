import './style.css';

import Application from './Application/Application';
import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

const app: Application = new Application();
