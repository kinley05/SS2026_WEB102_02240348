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

const router = express.Router();

router.post('/', protect, createVideo);
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.post('/:videoId/like', protect, likeVideo);
router.delete('/:videoId/like', protect, unlikeVideo);

export default router;
