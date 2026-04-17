# Firebase Setup Guide

This guide will help you set up Firebase for your interior design portfolio project.

## Prerequisites
- Node.js and npm installed
- Google account for Firebase
- Basic understanding of React and Firebase

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "interior-design-portfolio")
4. Accept the terms and conditions
5. Choose your default Google Analytics account (optional)
6. Click "Create project"

## Step 2: Enable Firebase Services

### Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Save your settings

### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your location
5. Click "Create database"

### Storage
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your location
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Under "Your apps", click the web icon (</>)
3. Enter your app name and click "Register app"
4. Copy the Firebase configuration object
5. Update the `firebaseConfig` in `src/firebase/firebaseConfig.js`

## Step 4: Update Firebase Configuration

Replace the placeholder values in `src/firebase/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Deploy Security Rules

### Firestore Rules
1. Go to Firestore Database in Firebase Console
2. Click "Rules" tab
3. Copy the content from `firebase.rules` (Firestore section)
4. Paste it into the rules editor
5. Click "Publish"

### Storage Rules
1. Go to Storage in Firebase Console
2. Click "Rules" tab
3. Copy the content from `firebase.rules` (Storage section)
4. Paste it into the rules editor
5. Click "Publish"

## Step 6: Create Admin User

1. In Firebase Console, go to "Authentication"
2. Click "Users" tab
3. Click "Add user"
4. Enter the admin email and password
5. Click "Add user"

## Step 7: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Test the admin login:
   - Go to `/admin/login`
   - Enter the admin credentials you created

3. Test the contact form:
   - Fill out the contact form
   - Submit and check if it appears in Firestore

## Firebase Services Used

### Authentication
- Email/Password sign-in
- Session management
- User state monitoring

### Firestore Database
- **projects**: Store portfolio project data
- **contactSubmissions**: Store contact form submissions
- **admin**: Store admin user information

### Storage
- **projects/**: Store project images
- **resume/**: Store resume and portfolio PDFs

## Security Rules

The security rules ensure:
- Only authenticated users can read/write project data
- Anyone can submit contact forms, but only authenticated users can read them
- Project images are publicly readable but only authenticated users can upload/delete
- Resume files are publicly readable but only authenticated users can manage

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `firebaseConfig.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Troubleshooting

### Common Issues

1. **Firebase config error**: Make sure you copied the correct configuration from Firebase Console
2. **Authentication error**: Check if Email/Password sign-in is enabled
3. **Firestore rules error**: Make sure security rules are properly deployed
4. **Storage error**: Check if Storage is enabled and rules are set

### Debug Tips

1. Check browser console for Firebase errors
2. Verify Firebase project is in the correct mode (development/production)
3. Ensure all Firebase services are enabled
4. Check security rules for proper permissions

## Next Steps

Once Firebase is set up, you can:
1. Add more authentication providers (Google, Facebook, etc.)
2. Implement real-time features
3. Add file upload functionality
4. Create admin dashboard with Firebase data
5. Add analytics and performance monitoring

## Support

For Firebase documentation: [Firebase Documentation](https://firebase.google.com/docs)

For specific issues, check the Firebase console logs and browser console for detailed error messages.
