# Social Media Restful API
# Project Overview
This project focuses on designing and implementing Restful API endpoints for a social media plateform similar to instagram. The API handles multiple resourses such as users, posts, comments, likes and followers.
The main goal is to follow Restful principles, proper URI design, HTTP methods, and structured request and response handeling using Node.js and express.
# Objectives
1.Design Restful API endpoints
2.Use appropriate HTTP methode
3.Implememnt proper status codes
4.Handle requests and responses effectively.
5.Implement content negoation 

# The techonologiues used
Node.js
express.js
Morgan
CORS
Helmet
Nodemon

# Project Structure
social-media-api/ 
│ 
├── controllers/ 
   └── commentController.js
   └── followersController.js
   └── likeController.js
   └── postController.js
   └── userController.js
├── middleware/
├── node_modules/ 
├── public/ 
├── routes/ 
├── config/ 
├── utils/ 
├── public/ 
│ └── docs.html 
├── server.js 
├── .env 
└── .gitignore

# Installation and setup
1.clone or create project folder:

mkdir social-media-api
cd social-media-api

2.Initialize Node.js project:
npm init -y

3.Install dependencies:
npm install express morgan cors helmet

4.Install dev dependencies:
npm install nodemon --save-dev

5.Create environment file:
port 3000

6.Run the server
npm run dev

# Features 
1.Restful API design
2.Modular structure
3.Error handling middleware
4.Async handeler support
5.Mock data usage(no database)
6.Content negoation(json)
7.API documentation page.

# Future Improvements
1.connect to a real database
2.Add authentication
3.Improve validation and security.