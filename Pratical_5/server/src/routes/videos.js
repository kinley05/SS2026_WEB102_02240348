import express from 'express';
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  unlikeVideo,
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // ADD THIS

const router = express.Router();

// Multer error handling wrapper
const handleMulterErrors = (fn) => (req, res, next) => {
  fn(req, res, (err) => {
    if (err) {
      console.error('Multer error caught:', err.message);
      return res.status(400).json({ 
        message: 'Upload error', 
        error: err.message 
      });
    }
    next();
  });
};

// POST route with upload handling
router.post('/', 
  protect, 
  handleMulterErrors(upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ])),
  createVideo
);

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.post('/:videoId/like', protect, likeVideo);
router.delete('/:videoId/like', protect, unlikeVideo);

export default router;