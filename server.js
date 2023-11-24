import express from 'express';
import audioRoutes from './routes/audio.routes.js';
import { __dirname } from './utils.js';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(cors({
 origin: 'http://localhost:3000',
 credentials: true
}));

const dbPath = path.join(__dirname, 'db');
if (!fs.existsSync(dbPath)){
    fs.mkdirSync(dbPath, { recursive: true });
}

app.use('/api/transcription', audioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));