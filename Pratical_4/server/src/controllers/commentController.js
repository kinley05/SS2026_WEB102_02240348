import prisma from '../lib/prisma.js';

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { videoId } = req.params;

    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        videoId: parseInt(videoId),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comments = await prisma.comment.findMany({
      where: { videoId: parseInt(videoId) },
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            commentLikes: true,
          },
        },
      },
    });

    const total = await prisma.comment.count({
      where: { videoId: parseInt(videoId) },
    });

    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { text },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: updatedComment,
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const like = await prisma.commentLike.create({
      data: {
        userId: req.user.id,
        commentId: parseInt(commentId),
      },
    });

    res.status(201).json({
      success: true,
      data: like,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Already liked this comment' });
    }
    console.error('Like comment error:', error);
    res.status(500).json({ message: 'Error liking comment' });
  }
};

export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: req.user.id,
          commentId: parseInt(commentId),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Comment unliked successfully',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Like not found' });
    }
    console.error('Unlike comment error:', error);
    res.status(500).json({ message: 'Error unliking comment' });
  }
};
