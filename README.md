# React Blog App

## Overview

This React Blog App is a full-stack blogging web application built using React and Appwrite. It allows users to create, edit, delete, and view blog posts with authentication, image uploads, and rich text content support. The project was created to learn full-stack integration, authentication flow, and modern React application architecture.

---

## Features

### Authentication

* User signup and login
* Secure session management
* Protected routes for authenticated users

### Blog Management

* Create, edit, and delete posts
* Rich text content editor
* Image upload support
* Author identification on posts

### Social Blog Functionality

* Users can view posts created by other users
* Author name displayed with posts

### UI/UX

* Responsive layout
* Modern styling with Tailwind CSS
* Smooth navigation using React Router

---

## Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Tailwind CSS
* React Hook Form

### Backend / Services

* Appwrite (Authentication, Database, Storage)

### Other Tools

* TinyMCE Rich Text Editor
* Git & GitHub
* VS Code

---

## Project Structure (Simplified)

```
src/
 ├── appwrite/        # Backend service configs
 ├── components/      # UI components
 ├── pages/           # Application pages
 ├── store/           # Redux store
 └── App.jsx
```

---

## Installation & Setup

### 1. Clone repository

```
git clone <repository-url>
cd blog-app
```

### 2. Install dependencies

```
npm install
```

### 3. Environment variables (.env)

Add your backend configuration:

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

### 4. Start development server

```
npm run dev
```

---

## Learning Outcomes

This project helped me learn:

* Full-stack application integration
* Authentication lifecycle management
* File storage handling
* Redux state management
* React routing and protected routes
* Debugging real production-like issues

---

## Future Improvements

* Comments and likes system
* User profile pages
* Follow/unfollow functionality
* Notifications
* Improved UI animations

---

## Author

Rishav Verma

---

## License

This project is for educational and portfolio purposes.
