import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env');
console.log('[dotenv] Loading from:', envPath);
dotenv.config({ path: envPath });
console.log('[dotenv] Loaded. Google Client ID:', process.env.GOOGLE_CLIENT_ID ? '✓' : '✗');

const { default: reportRoutes } = await import('./routes/reportRoutes.js');
const { default: authRoutes } = await import('./routes/authRoutes.js');
const { default: geocodeRoutes } = await import('./routes/geocodeRoutes.js');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin, methods: ['GET', 'POST'], credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/geocode', geocodeRoutes);

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Citizen Issue Reporting server running on port ${port}`);
});
