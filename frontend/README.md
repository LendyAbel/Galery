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

- Drag & drop or select images to upload
- Gallery with preview and download options
- Delete images from the gallery
- Modal preview with detailed controls
- Responsive, with animated UI

## 🗂️ Folder Structure

```
frontend/
└── src/
├── components/ # Gallery, Photo, and Upload components
├── hooks/ # Custom React hook for gallery logic
├── services/ # API functions
└── index.css # Global styles
```

## 🚩 Notes

- Make sure the backend server is running locally for full functionality.
- Refer to `DEVLOG.md` for development notes and bug tracking.
