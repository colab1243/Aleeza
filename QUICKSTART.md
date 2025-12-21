# Quick Start Guide 🚀

Get your romantic website up and running in minutes!

## Prerequisites

- Node.js installed (v16 or higher)
- A Firebase account (free)

## Fast Setup (5 minutes)

### 1. Firebase Setup (2 minutes)

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (test mode)
4. Enable **Storage** (test mode)
5. Add a web app and copy the config

### 2. Configure Frontend (1 minute)

Open `Frontend/src/config/firebase.ts` and replace with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Website (1 minute)

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

### 4. Add Your Content (Later)

1. **Upload photos** to Firebase Storage
2. **Add memories** to Firestore `memories` collection
3. **Add dreams** to Firestore `dreams` collection
4. **Customize countdown** in `Frontend/src/App.tsx`

## What You Get

✨ **Countdown Timer** - Counts down to your special date
📸 **Memory Wall** - Beautiful photo gallery
💭 **Dreams Section** - Your future plans together
💌 **Guestbook** - Interactive message board

## Next Steps

- Read `README.md` for detailed instructions
- Check `Backend/FIREBASE-SETUP.md` for Firebase details
- Customize colors and content to your liking
- Deploy to make it live!

## Need Help?

Check the detailed guides:
- `README.md` - Complete documentation
- `Backend/FIREBASE-SETUP.md` - Firebase configuration
- `Backend/sample-data.json` - Example data structure

---

Made with ❤️

