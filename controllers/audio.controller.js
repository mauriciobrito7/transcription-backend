import fs from 'fs';
import OpenAI from 'openai';
import { generateFileHash, getTranscriptions } from '../utils.js';
import { __dirname } from '../utils.js';

import dotenv from 'dotenv';

dotenv.config();

//OpenAIApi Configuration
const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
});

export const handleAudioUpload = async (req, res) => {
 try {
  validateFileUpload(req);

  const filePath = req.file.path;
  const fileHash = await generateFileHash(filePath);
  const transcriptions = getTranscriptions();

  if (transcriptions[fileHash]) {
   return handleCachedTranscription(res, filePath, transcriptions[fileHash]);
  }

  const transcription = await transcribeAudio(filePath);
  saveTranscription(transcriptionsFile, fileHash, transcription);
  res.json(transcription);

 } catch (error) {
  handleUploadError(res, error);
 }
};

function validateFileUpload(req) {
 if (!req.file) {
  throw new Error('No file uploaded with the request.');
 }
}

function handleCachedTranscription(res, filePath, transcription) {
 fs.unlinkSync(filePath);
 res.json({ text: transcription });
}

async function transcribeAudio(filePath) {
 const fileStream = fs.createReadStream(filePath);
 const response = await openai.audio.transcriptions.create({
   file: fileStream,
   model: "whisper-1"
 });
 return response.text;
}

function handleUploadError(res, error) {
 console.error('An error occurred:', error);
 res.status(500).json({ error: error.message });
}
