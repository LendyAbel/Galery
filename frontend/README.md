# Frontend — Lendyabel Gallery

A responsive, animated React SPA for managing your personal photo gallery.

## ⚙️ Setup & Usage

1. Go to the frontend folder:
    ```
    cd frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start the development server:
    ```
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

> The frontend is pre-configured (via Vite proxy) to use the backend at `http://localhost:3001`.

## ✨ Features

- Login screen before entering the gallery
- Drag & drop or select images to upload
- Gallery grouped by year, with search, sort (newest/oldest) and grid/list density toggle
- Album filter (albums are derived from the photo name until the backend supports real albums)
- Full-screen photo viewer with download and delete actions
- Profile screen with photo/album stats and download count
- Loading skeleton and empty-state screen when there are no results
- Responsive, animated UI (Framer Motion + Tailwind CSS)

## 🗂️ Folder Structure

```
frontend/
└── src/
    ├── components/
    │   ├── EmptyState/   # No-results screen
    │   ├── Gallery/       # Main gallery view
    │   ├── Login/         # Login screen
    │   ├── Nav/           # Top navigation bar
    │   ├── Photo/          # Photo card, icon buttons, full-screen viewer
    │   ├── Profile/       # User profile & stats
    │   ├── Skeleton/       # Loading placeholders
    │   ├── Toolbar/        # Sort/density/album controls
    │   ├── Upload/         # Upload widget
    │   └── YearSection/    # Groups photos by year
    ├── hooks/photoController.js   # Custom hook: fetch/upload/delete/download photos
    ├── services/photos-server.js # Axios calls to the backend API
    ├── utils/photoMeta.js        # Date parsing, album derivation, size formatting
    └── index.css / styles/organic.css # Global styles
```

## 🚩 Notes

- Make sure the backend server is running locally for full functionality.
- Refer to `DEVLOG.md` for development notes and bug tracking.
