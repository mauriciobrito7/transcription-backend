import express from 'express';
import { handleAudioUpload } from '../controllers/audio.controller.js';
import uploadMiddleware from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/', uploadMiddleware.single('audio'), handleAudioUpload);

export default router;