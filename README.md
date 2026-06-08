# Kolluru Arun Kumar - Interior Design Portfolio

A luxury interior designer portfolio website built to showcase projects, skills, and experience with a modern, elegant, and responsive design.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend/Database:** Firebase (Auth, Firestore/Storage)
- **Deployment:** Vercel (configured)

## ✨ Features

- **Elegant UI/UX:** Designed with luxury aesthetics in mind, featuring smooth animations and transitions using Framer Motion.
- **Responsive Design:** Fully responsive layout that looks great on mobile, tablet, and desktop devices.
- **Dark/Light Mode:** Includes a theme toggle for user preference.
- **Dynamic Content:** Showcases projects, education, experience, skills, and a vision statement.
- **Admin Dashboard:** Secure login and dashboard functionality for managing portfolio content dynamically.
- **Contact Form:** Integrated contact section for potential clients to reach out.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Make sure your `.env` file is configured with your Firebase credentials (refer to `FIREBASE_SETUP.md` in the repository for detailed instructions):
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production-ready build.

## 📄 License

This project is licensed under the ISC License.
