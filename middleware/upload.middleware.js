import multer from 'multer';
import path from 'path';
import { __dirname } from '../utils.js';

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'whisper'),
  filename: (req, file, cb) => {
    // Generate a unique random file name with the original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;
