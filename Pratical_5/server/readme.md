# Practical 5: Implementing Cloud Storage with Supabase

## 📖 Overview
This project upgrades the TikTok web application by migrating from **local file storage** to **cloud bucket storage** using Supabase. This enhances scalability, reliability, and performance while providing better access control for user-uploaded content.


## Project Setup

### 1. **Supabase Account and Project**
- Sign up at [Supabase](https://supabase.com).
- Create a new project (e.g., `tiktok`).
- Choose a strong database password and region.
- Wait for project creation.

### 2. **Create Storage Buckets**
- Navigate to **Storage** in the Supabase dashboard.
- Create a bucket named `videos` (Public).
- Create another bucket named `thumbnails`.

### 3. **Set Up Storage Policies**
- For `videos` bucket:
  - Authenticated users can upload.
  - Public can view videos.
- Repeat similar policies for `thumbnails`.


##  Backend Implementation

### 1. **Install Supabase SDK**
```bash
cd server
npm install @supabase/supabase-js
```
### 2. Supabase Client Configuration
Create src/lib/supabase.js:
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;

### 3. Environment Variables
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_PUBLIC_KEY=your-public-key
SUPABASE_STORAGE_URL=https://your-project-id.supabase.co/storage/v1

### 4. Update Controllers
Update videoController.js to use Supabase for file storage.

Update Prisma schema to include videoStoragePath and thumbnailStoragePath.
### 5. Migration Script
Create scripts/migrateVideosToSupabase.js to move existing local files to Supabase.

## Frontend Implementation
1. Install Supabase Client
cd tiktok_frontend
npm install @supabase/supabase-js

2. Supabase Client Configuration
Create src/lib/supabase.js:
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

3. Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-public-key

4. Update Upload Service
Modify src/services/uploadService.js to handle direct uploads to Supabase.

5. Update Components
Modify src/app/upload/page.jsx for direct uploads.

Update VideoCard.jsx to handle Supabase URLs.

## Testing and Deployment
1. Run migration script:
cd server
node scripts/migrateVideosToSupabase.js

2. Verify videos play correctly from Supabase URLs.
3. Back up local uploads directory.
4. Remove local storage code.

## Features Checklist
Supabase buckets for videos and thumbnails

Storage policies for authenticated uploads and public viewing

Backend integration with Supabase SDK

Frontend integration with Supabase client

Prisma schema updated with storage paths

Migration script for existing videos

CDN-backed video hosting

## Resources
Supabase Storage Documentation

Supabase JavaScript Client

File Upload Best Practices

Content Delivery Networks Explained

