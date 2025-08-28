# Backend — Lendyabel Gallery

RESTful API built with Node.js and Express, managing photo uploads to AWS S3.

## ⚙️ Installation

1. Enter the backend folder:
    ```
    cd backend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Copy `.env.example` to `.env` and enter your AWS credentials:
    ```
    cp .env.example .env
    ```
    Fill in:
    ```
    API_AWS_ACCESS_KEY=your_key
    API_AWS_SECRET_ACCESS_KEY=your_secret_key
    ```
4. Start the server in development mode:
    ```
    npm run dev
    ```
    The server runs at `http://localhost:3001`.

## 🔑 Key Endpoints

| Method | Endpoint                       | Function                      |
|--------|-------------------------------|-------------------------------|
| GET    | `/api/photos/allPhotos`       | List all images               |
| POST   | `/api/photos/upload`          | Upload new image (`file`)     |
| GET    | `/api/photos/download/:name`  | Download image by name        |
| DELETE | `/api/photos/:name`           | Delete image by name          |

- Use the field `file` for uploads (multipart/form-data).

## 🗂️ Main Files

- `app.js`               — Express app configuration
- `controllers/aws-photo-controller.js` — S3 route logic
- `utils/middleware.js`  — Custom AWS error handling

Check `DEVLOG.md` for dev logs and notes.
