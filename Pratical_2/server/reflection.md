# Reflection on Practical 2: TikTok REST API

## Learning Experience
This assignment gave me hands-on experience in designing and implementing a **RESTful API** using Express.js. I learned how to structure backend code with controllers, routes, and models, and how to handle different HTTP methods (GET, POST, PUT, DELETE) for multiple resources such as videos, users, and comments.

## Technical Insights
- **API Design**: Mapping endpoints to resources helped me understand how RESTful principles ensure clarity and consistency in backend development.
- **Controllers**: Implementing logic for videos, users, and comments taught me how to separate concerns and keep code organized.
- **Routes**: Creating route files showed me how to connect endpoints to controller functions cleanly.
- **Middleware**: Using `morgan`, `cors`, and `body-parser` improved logging, request handling, and cross-origin support.
- **Error Handling**: Implementing 404 and 500 handlers reinforced the importance of graceful error responses.

## Challenges and Overcoming Them
- Setting up the project structure correctly was initially confusing, but once I followed the step-by-step approach, it became manageable.
- Handling relationships (likes, followers, comments) required careful thought to ensure data consistency in the in-memory datastore.
- Debugging route paths and ensuring controllers were properly imported taught me patience and attention to detail.

## Key Takeaways
- RESTful APIs are powerful because they provide a standardized way to interact with resources.
- Organizing backend code into controllers, routes, and models makes the project scalable and easier to maintain.
- Middleware and error handling are essential for building reliable APIs.
- Testing with Postman and curl is a practical way to validate endpoints and ensure correctness.

## Personal Growth Perspective
This practical helped me grow as a developer in several ways:
- **Confidence**: I now feel more capable of building backend systems that can support real-world applications.
- **Problem-Solving Mindset**: Debugging issues with routes and controllers taught me to break problems into smaller steps and test incrementally.
- **Adaptability**: Learning to manage multiple resources (videos, users, comments) showed me how to handle complexity in backend design.
- **Resilience**: Each error became an opportunity to learn, and I realized that persistence is key to mastering backend development.

## Future Applications
The skills I gained from this assignment can be applied to:
- Social Media Apps: Building APIs for platforms with features like likes, comments, and followers.
- Content Management Systems: Managing users, posts, and interactions in blogs or forums.
- E-commerce Platforms: Handling products, users, reviews, and orders with CRUD operations.
- Microservices: Designing modular APIs that can scale independently.

## Reflection
Overall, this assignment strengthened my understanding of RESTful API design and backend implementation. It gave me both technical skills and personal confidence, preparing me to build scalable, user-focused applications in the future.
