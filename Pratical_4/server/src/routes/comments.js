import express from 'express';
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:videoId', protect, createComment);
router.get('/:videoId', getComments);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);
router.post('/:commentId/like', protect, likeComment);
router.delete('/:commentId/like', protect, unlikeComment);

export default router;
