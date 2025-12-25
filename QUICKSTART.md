# Quick Start Guide 🚀

Get your romantic website up and running in minutes!

## Prerequisites

- Node.js installed (v16 or higher)
- A Supabase account (free)

## Fast Setup (5 minutes)

### 1. Supabase Setup (2 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Create database tables: `memory`, `dreams`, `guestbook`
4. Create a storage bucket named `Zuz` (or update the code to match your bucket name)
5. Get your project URL and anon key from Settings → API

### 2. Configure Frontend (1 minute)

Open `Frontend/src/config/supabase.ts` and add your Supabase credentials:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Run the Website (1 minute)

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

### 4. Add Your Content

1. **Upload photos** directly from the website using the "Add Memory" button
2. **Add dreams** via Supabase dashboard or create an admin interface
3. **Customize countdown** in `Frontend/src/components/App.tsx`

## What You Get

✨ **Countdown Timer** - Counts down to your special date
📸 **Memory Wall** - Beautiful photo gallery with upload functionality
💭 **Dreams Section** - Your future plans together
💌 **Guestbook** - Interactive message board

## Next Steps

- Customize colors and content to your liking
- Deploy to Netlify or Cloudflare Pages
- Add a custom domain

---

Made with ❤️
