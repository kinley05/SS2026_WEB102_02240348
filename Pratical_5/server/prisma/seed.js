import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  await prisma.commentLike.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing data");

  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
        name: `User ${i}`,
        bio: `This is user ${i}'"'"'s bio`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`,
      },
    });
    users.push(user);
  }

  console.log(`Created ${users.length} users`);

  const videos = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 1; j <= 5; j++) {
      const video = await prisma.video.create({
        data: {
          title: `${users[i].username}'"'"'s Video ${j}`,
          description: `This is video ${j} by ${users[i].username}`,
          videoUrl: `https://example.com/videos/${users[i].id}_${j}.mp4`,
          thumbnail: `https://example.com/thumbnails/${users[i].id}_${j}.jpg`,
          userId: users[i].id,
        },
      });
      videos.push(video);
    }
  }

  console.log(`Created ${videos.length} videos`);

  let commentCount = 0;
  for (let i = 0; i < 200; i++) {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    try {
      await prisma.comment.create({
        data: {
          text: `This is comment ${i + 1}. Great video!`,
          userId: randomUser.id,
          videoId: randomVideo.id,
        },
      });
      commentCount++;
    } catch (e) {
      // Skip duplicates
    }
  }

  console.log(`Created ${commentCount} comments`);

  let likeCount = 0;
  for (let i = 0; i < 300; i++) {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    try {
      await prisma.like.create({
        data: {
          userId: randomUser.id,
          videoId: randomVideo.id,
        },
      });
      likeCount++;
    } catch (e) {
      // Skip duplicates
    }
  }

  console.log(`Created ${likeCount} video likes`);

  let commentLikeCount = 0;
  const comments = await prisma.comment.findMany();

  for (let i = 0; i < 150; i++) {
    if (comments.length === 0) break;

    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    try {
      await prisma.commentLike.create({
        data: {
          userId: randomUser.id,
          commentId: randomComment.id,
        },
      });
      commentLikeCount++;
    } catch (e) {
      // Skip duplicates
    }
  }

  console.log(`Created ${commentLikeCount} comment likes`);

  let followCount = 0;
  for (let i = 0; i < 40; i++) {
    const randomFollower = users[Math.floor(Math.random() * users.length)];
    const randomFollowing = users[Math.floor(Math.random() * users.length)];

    if (randomFollower.id === randomFollowing.id) continue;

    try {
      await prisma.follow.create({
        data: {
          followerId: randomFollower.id,
          followingId: randomFollowing.id,
        },
      });
      followCount++;
    } catch (e) {
      // Skip duplicates
    }
  }

  console.log(`Created ${followCount} follow relationships`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




