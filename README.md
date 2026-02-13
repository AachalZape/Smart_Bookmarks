
# Smart Bookmark App

A simple, secure, real-time bookmark management web application built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔐 Google OAuth authentication via Supabase
- ➕ Add bookmarks with URL and title
- 👁️ View personal bookmark list
- 🗑️ Delete bookmarks
- 🔄 Real-time updates across multiple tabs/devices
- 🔒 Row-Level Security (RLS) for data isolation

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, Realtime)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Google OAuth application set up

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the SQL from `supabase/schema.sql` to create the bookmarks table and RLS policies
3. Go to **Authentication > Providers** and enable Google OAuth
4. Configure Google OAuth:
   - Add your Google OAuth Client ID and Secret
   - Add authorized redirect URLs:
     - `http://localhost:3000/auth/callback` (for local development)
     - `https://your-domain.vercel.app/auth/callback` (for production)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **API**.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add the same environment variables in Vercel project settings
4. Deploy!

## Database Schema

The `bookmarks` table has the following structure:

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `title` (TEXT, Required)
- `url` (TEXT, Required)
- `created_at` (TIMESTAMP, Auto-generated)

## Security

- Row-Level Security (RLS) is enabled on the bookmarks table
- Users can only view, insert, and delete their own bookmarks
- Only the Supabase anon key is used on the client (never the service role key)
- All communication is over HTTPS

## Real-time Updates

The app uses Supabase Realtime subscriptions to automatically update the bookmark list when changes occur. Open multiple tabs to see real-time synchronization in action!

## Project Structure

```
.
├── app/
│   ├── auth/
│   │   └── callback/     # OAuth callback handler
│   ├── dashboard/        # Main dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/login page
├── components/
│   ├── AddBookmarkForm.tsx
│   ├── BookmarkList.tsx
│   ├── DeleteBookmarkButton.tsx
│   ├── LoginButton.tsx
│   └── LogoutButton.tsx
├── lib/
│   └── supabase/
│       ├── client.ts     # Browser Supabase client
│       └── server.ts     # Server Supabase client
├── supabase/
│   └── schema.sql        # Database schema and RLS policies
├── middleware.ts         # Supabase auth middleware
└── package.json
```

## License

MIT

# Smart_Bookmarks

