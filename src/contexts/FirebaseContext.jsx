import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query, 
  where,
  orderBy,
  onSnapshot,
  limit 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication functions
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      if (err.message.includes('CONFIGURATION_NOT_FOUND')) {
        setError('Authentication service is not enabled. Please enable Email/Password Authentication in Firebase Console.');
      } else {
        setError(err.message);
      }
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      if (err.message.includes('CONFIGURATION_NOT_FOUND')) {
        setError('Authentication service is not enabled. Please enable Email/Password Authentication in Firebase Console.');
      } else {
        setError(err.message);
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      if (err.message.includes('CONFIGURATION_NOT_FOUND')) {
        console.warn('Authentication not enabled, logout not needed');
      } else {
        setError(err.message);
        throw err;
      }
    }
  };

  // Firestore functions
  const createDocument = async (collectionName, documentId, data) => {
    try {
      setError(null);
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, data);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getDocument = async (collectionName, documentId) => {
    try {
      setError(null);
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateDocument = async (collectionName, documentId, data) => {
    try {
      setError(null);
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
      return docRef;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDocument = async (collectionName, documentId) => {
    try {
      setError(null);
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getCollection = async (collectionName, constraints = []) => {
    try {
      setError(null);
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Storage functions
  const uploadFile = async (file, path) => {
    try {
      setError(null);
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFile = async (path) => {
    try {
      setError(null);
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Portfolio specific functions
  const addProject = async (projectData) => {
    try {
      const projectId = `project_${Date.now()}`;
      await createDocument('projects', projectId, projectData);
      return projectId;
    } catch (err) {
      throw err;
    }
  };

  const getProjects = async () => {
    try {
      const projects = await getCollection('projects');
      return projects;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      await updateDocument('projects', projectId, projectData);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      // First get project data to delete associated images
      const projectData = await getDocument('projects', projectId);
      if (projectData && projectData.image) {
        // Delete image from storage
        const imagePath = projectData.image.includes('/projects/') ? 
          projectData.image.split('/projects/')[1] : null;
        if (imagePath) {
          await deleteFile(`projects/${imagePath}`);
        }
      }
      await deleteDocument('projects', projectId);
      return true;
    } catch (err) {
      throw err;
    }
  };

  // Contact form submission
  const submitContactForm = async (formData) => {
    try {
      const submissionData = {
        ...formData,
        createdAt: new Date(),
        status: 'pending'
      };
      
      // Use addDoc instead of setDoc for automatic ID generation
      const collectionRef = collection(db, 'contactSubmissions');
      const docRef = await addDoc(collectionRef, submissionData);
      
      return docRef.id;
    } catch (err) {
      console.error('Firebase: Error submitting contact form:', err);
      throw err;
    }
  };

  const getContactSubmissions = async () => {
    try {
      const submissions = await getCollection('contactSubmissions', [orderBy('createdAt', 'desc')]);
      return submissions;
    } catch (err) {
      throw err;
    }
  };

  const deleteContactSubmission = async (submissionId) => {
    try {
      await deleteDocument('contactSubmissions', submissionId);
      return true;
    } catch (err) {
      throw err;
    }
  };

  // Real-time listeners
  const subscribeToProjects = (callback) => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(data);
    }, (error) => {
      setError(error.message);
      callback([]);
    });
    return unsubscribe;
  };

  const subscribeToContacts = (callback) => {
    const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(data);
    }, (error) => {
      setError(error.message);
      callback([]);
    });
    return unsubscribe;
  };

  // Monitor auth state
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Firebase auth error:', error);
      setError('Authentication service is not properly configured. Please enable Authentication in Firebase Console.');
      setLoading(false);
    }
  }, []);

  const value = {
    // Auth
    user,
    loading,
    error,
    login,
    register,
    logout,
    
    // Firestore
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    getCollection,
    
    // Storage
    uploadFile,
    deleteFile,
    
    // Portfolio specific
    addProject,
    updateProject,
    getProjects,
    subscribeToProjects,
    
    // Contact specific
    submitContactForm,
    getContactSubmissions,
    subscribeToContacts,
    deleteContactSubmission,
    
    // Clear error
    clearError: () => setError(null)
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
