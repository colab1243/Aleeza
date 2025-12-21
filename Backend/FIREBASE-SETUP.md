# Firebase Setup Guide

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name (e.g., "aleeza-website")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In left sidebar, click "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode"
4. Choose your location (closest to you)
5. Click "Enable"

### 3. Enable Storage

1. In left sidebar, click "Storage"
2. Click "Get started"
3. Accept default rules (test mode)
4. Click "Done"

### 4. Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll to "Your apps"
4. Click the web icon (`</>`)
5. Register app with a nickname (e.g., "Aleeza Website")
6. Copy the `firebaseConfig` object
7. Replace the config in `Frontend/src/config/firebase.ts`

Example config:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 5. Apply Security Rules

#### Firestore Rules:
1. Go to Firestore Database → Rules
2. Replace with content from `firestore.rules`
3. Click "Publish"

#### Storage Rules:
1. Go to Storage → Rules
2. Replace with content from `storage.rules`
3. Click "Publish"

### 6. Create Firestore Collections

Create these collections manually or they'll be created automatically when data is added:

- `memories` - Photo memories with dates
- `dreams` - Future plans and dreams
- `guestbook` - Messages from your girlfriend

### 7. Upload Sample Data

You can use the structure in `sample-data.json` as reference.

#### For Memories:
1. Upload photos to Storage → `memories/` folder
2. Click on uploaded photo → Copy "Download URL"
3. In Firestore → `memories` collection → Add document:
```
title: "Your Memory Title"
description: "Beautiful description"
date: Timestamp (use Firebase console date picker)
imageUrl: "paste-download-url-here"
category: "special"
```

#### For Dreams:
In Firestore → `dreams` collection → Add document:
```
title: "Paris Together"
description: "Our dream trip..."
category: "travel" (travel/life/small)
icon: "🗼"
```

### 8. Update Project ID for Deployment

In `Frontend/.firebaserc`, replace with your project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## Security Notes

The current rules allow:
- ✅ Anyone can READ memories, dreams, and guestbook
- ✅ Anyone can CREATE guestbook entries
- ❌ Only you (via console) can add/edit memories and dreams
- ❌ Nobody can delete guestbook entries (only you via console)

To make the site completely private, you can add Firebase Authentication and update the rules.

## Tips

- **Upload Images**: Use high-quality photos for better appearance
- **Image Size**: Resize images to ~800-1200px width before uploading
- **Organize**: Create folders in Storage like `memories/`, `profile/`, etc.
- **Backup**: Export your Firestore data regularly from the console

## Costs

Firebase free tier includes:
- 1 GB storage
- 10 GB/month transfer
- 50,000 document reads/day
- 20,000 document writes/day

This is more than enough for a personal website!

---

Need help? Check the main README.md for more details.

