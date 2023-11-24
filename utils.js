import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import path from 'path';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateFileHash = (filePath) => {
 return new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);
  stream.on('data', data => hash.update(data));
  stream.on('end', () => resolve(hash.digest('hex')));
  stream.on('error', reject);
 });
}

const transcriptionsFilePath = path.join(__dirname, 'db/transcriptions.json');

export const getTranscriptions = () => {
  let transcriptions = {};

  if (fs.existsSync(transcriptionsFilePath)) {
    try {
      const fileContent = fs.readFileSync(transcriptionsFilePath);
      transcriptions = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading transcriptions file:', error);
      throw new Error('Failed to read transcriptions data.');
    }
  }
  return transcriptions;
}
