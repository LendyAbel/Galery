# Lendyabel Gallery

A modern fullstack web application to upload, organize, and enjoy your personal photo gallery—all your best moments, stored securely on AWS S3.

## 📦 Project Structure

```
lendyabel-gallery/
├── backend/   # Node.js + Express REST API, AWS S3 integration
└── frontend/  # React SPA, Vite, Tailwind, UI & animations
```

- **backend/**: Express & AWS SDK for photo management (upload, download, delete, list).
- **frontend/**: Responsive, animated React application with login, profile, albums, search and a photo viewer.

## 🚀 Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/lendyabel-gallery.git
   cd lendyabel-gallery
   ```
2. **Backend setup:** see `/backend/README.md`.
3. **Frontend setup:** see `/frontend/README.md`.

## 💻 Technologies Used

- **Backend:** Node.js, Express, Multer, AWS SDK (S3), dotenv
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, Lucide/React Icons

## ✨ Highlights

- Login screen and profile view with per-album breakdown
- Photo gallery grouped by year, with search, sort and grid/list density
- Full-screen photo viewer with download and delete actions
- Loading skeletons and empty-state screen

## 📝 DevLogs

See `DEVLOG.md` in each folder for details on development, ideas, and bugs.

## 🏷️ License

MIT
