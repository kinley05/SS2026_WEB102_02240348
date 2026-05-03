import prisma from '../lib/prisma.js';

export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({ message: 'Please provide title and videoUrl' });
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || '',
        videoUrl,
        thumbnail: thumbnail || '',
        userId: req.user.id,
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
      data: video,
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: 'Error creating video' });
  }
};

export const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const videos = await prisma.video.findMany({
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
            comments: true,
            likes: true,
          },
        },
      },
    });

    const total = await prisma.video.count();

    res.status(200).json({
      success: true,
      data: videos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment views
    await prisma.video.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } },
    });

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Error fetching video' });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, thumbnail } = req.body;

    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this video' });
    }

    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(thumbnail && { thumbnail }),
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

    res.status(200).json({
      success: true,
      data: updatedVideo,
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Error updating video' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    await prisma.video.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Error deleting video' });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const like = await prisma.like.create({
      data: {
        userId: req.user.id,
        videoId: parseInt(videoId),
      },
    });

    res.status(201).json({
      success: true,
      data: like,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Already liked this video' });
    }
    console.error('Like video error:', error);
    res.status(500).json({ message: 'Error liking video' });
  }
};

export const unlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    await prisma.like.delete({
      where: {
        userId_videoId: {
          userId: req.user.id,
          videoId: parseInt(videoId),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Video unliked successfully',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Like not found' });
    }
    console.error('Unlike video error:', error);
    res.status(500).json({ message: 'Error unliking video' });
  }
};
