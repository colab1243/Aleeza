# For My Love - A Romantic Website ❤️

A beautiful, romantic website featuring a countdown timer, photo memories, dreams together, and an interactive guestbook. Built with React, TypeScript, and Firebase.

## Project Structure

```
Aleeza/
├── Frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/    # All UI components
│   │   ├── config/        # Firebase configuration
│   │   ├── utils/         # Helper functions
│   │   └── types.ts       # TypeScript types
│   └── public/
└── Backend/           # Firebase configuration files
    ├── firestore.rules    # Database security rules
    ├── storage.rules      # Storage security rules
    └── sample-data.json   # Example data structure
```

## Features

✅ **Countdown Timer** - Beautiful animated countdown to your special date
✅ **Memory Wall** - Photo gallery with expandable memory cards
✅ **Dreams Section** - Share your future plans and dreams together
✅ **Guestbook** - Interactive message board with emoji support
✅ **Romantic UI** - Beautiful gradients, animations, and responsive design
✅ **Mobile Friendly** - Works perfectly on all devices

## Setup Instructions

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" and create a new project
3. Enable these services:
   - **Firestore Database**
   - **Storage**

4. Get your Firebase config:
   - Click the web icon (</>) to add a web app
   - Copy the `firebaseConfig` object
   - Paste it in `Frontend/src/config/firebase.ts`

5. Set up Firestore Database:
   - Go to Firestore Database → Create database
   - Start in **test mode** (we'll add rules later)
   - Create these collections manually:
     - `memories`
     - `dreams`
     - `guestbook`

6. Set up Storage:
   - Go to Storage → Get started
   - Start in **test mode**
   - Create a folder called `memories`

7. Apply Security Rules:
   - Copy rules from `Backend/firestore.rules` to Firestore Rules
   - Copy rules from `Backend/storage.rules` to Storage Rules

### Step 2: Add Your Data

#### Adding Memories:
1. Upload photos to Firebase Storage (`memories/` folder)
2. Get the download URLs
3. In Firestore, add documents to `memories` collection:
```json
{
  "title": "Our First Date",
  "description": "The day everything began...",
  "date": Timestamp(2024-01-15),
  "imageUrl": "your-firebase-storage-url",
  "category": "special"
}
```

#### Adding Dreams:
Add documents to `dreams` collection:
```json
{
  "title": "Paris Together",
  "description": "Walking through the streets of Paris...",
  "category": "travel",
  "icon": "🗼"
}
```

### Step 3: Customize the Countdown

Edit `Frontend/src/App.tsx`:
```typescript
const targetDate = new Date('2025-12-31');  // Your special date
const countdownTitle = "Our Anniversary";    // Your title
```

### Step 4: Install and Run

```bash
cd Frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see your website!

## Deployment

### Deploy to Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase hosting:
```bash
cd Frontend
firebase init hosting
```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html: `No`

4. Update `.firebaserc` with your project ID

5. Build and deploy:
```bash
npm run build
firebase deploy
```

Your website will be live at: `https://your-project.web.app`

### Alternative: Deploy to Vercel

```bash
cd Frontend
npm install -g vercel
vercel login
vercel
```

## Customization Tips

### Change Colors:
All components use CSS files. Main gradient colors are:
- Purple gradient: `#667eea` to `#764ba2`
- Update in respective component CSS files

### Change Fonts:
Fonts are loaded in `index.html`:
- Headings: Playfair Display
- Body: Lato
- Change Google Fonts link to use different fonts

### Add More Sections:
1. Create new component in `src/components/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`

## Tips for Making it Special

1. **Personal Photos**: Use real photos instead of placeholders
2. **Custom Date**: Set the countdown to an important date (anniversary, trip, etc.)
3. **Meaningful Memories**: Write heartfelt descriptions for each memory
4. **Shared Dreams**: Add dreams you've talked about together
5. **Custom Domain**: Consider buying a domain like `foraleeza.com`

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Backend**: Firebase (Firestore + Storage)
- **Routing**: React Router v6
- **Styling**: Pure CSS (no frameworks)
- **Fonts**: Google Fonts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Need Help?

If you encounter any issues:
1. Check Firebase configuration is correct
2. Ensure all Firebase services are enabled
3. Check browser console for errors
4. Verify security rules are applied

---

Made with ❤️ for someone special

