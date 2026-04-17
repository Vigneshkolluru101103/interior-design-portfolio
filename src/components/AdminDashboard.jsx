import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { db } from '../firebase/firebaseConfig';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  FolderOpen, 
  Image as ImageIcon,
  Eye,
  Save,
  X,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const { user, logout, getContactSubmissions } = useFirebase();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    technologies: '',
    client: '',
    year: '',
    status: 'completed'
  });

  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    // Load data from localStorage for projects and Firebase for contacts
    loadProjects();
    loadFirebaseContacts();
    
    // Set loading to false after data is loaded
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [user, navigate]);

  const loadProjects = () => {
    try {
      const savedProjects = localStorage.getItem('portfolioProjects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        // Default sample projects
        const defaultProjects = [
          {
            id: 1,
            title: 'Luxury Villa Interior',
            category: 'Residential',
            description: 'Complete interior design for a modern luxury villa with contemporary aesthetics.',
            imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
            technologies: '3DS-MAX, V-Ray, Photoshop',
            client: 'Private Client',
            year: '2023',
            status: 'completed'
          },
          {
            id: 2,
            title: 'Corporate Office Design',
            category: 'Commercial',
            description: 'Modern office space design focusing on productivity and employee wellbeing.',
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            technologies: 'AutoCAD, SketchUp, Enscape',
            client: 'Tech Corp',
            year: '2023',
            status: 'completed'
          }
        ];
        setProjects(defaultProjects);
        localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadFirebaseContacts = async () => {
    try {
      console.log('Loading contacts from Firebase...');
      const contactsData = await getContactSubmissions();
      console.log('Contacts loaded from Firebase:', contactsData.length);
      console.log('Contacts data:', contactsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading contacts from Firebase:', error);
      console.error('Error details:', error.message);
      // Fallback to empty contacts array if Firebase fails
      setContacts([]);
    }
  };

  const markContactAsRead = async (contactId) => {
    try {
      const contactRef = db.collection('contactSubmissions').doc(contactId);
      await contactRef.update({ status: 'read' });
      
      const updatedContacts = contacts.map(contact =>
        contact.id === contactId ? { ...contact, status: 'read' } : contact
      );
      setContacts(updatedContacts);
      showToast('Contact marked as read!', 'success');
    } catch (error) {
      console.error('Error marking contact as read:', error);
      showToast('Error updating contact', 'error');
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        const contactRef = db.collection('contactSubmissions').doc(contactId);
        await contactRef.delete();
        
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        setContacts(updatedContacts);
        showToast('Contact deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting contact:', error);
        showToast('Error deleting contact', 'error');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    
    let date;
    // Handle Firebase timestamp object
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp && timestamp.seconds) {
      // Handle Firebase timestamp with seconds
      date = new Date(timestamp.seconds * 1000);
    } else {
      // Handle regular timestamp string or number
      date = new Date(timestamp);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Toast notification function
  const showToast = (message, type = 'success', duration = 3000) => {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add to container
    toastContainer.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Successfully logged out!', 'warning', 3000);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setImageFile(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      technologies: '',
      client: '',
      year: '',
      status: 'completed'
    });
    setShowProjectForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setImageFile(null);
    setFormData(project);
    setShowProjectForm(true);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploadingImage(true);
    try {
      // Convert file to base64 for localStorage storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData(prev => ({ 
          ...prev, 
          imageUrl: base64String
        }));
        setImageFile(file);
        showToast('Image uploaded successfully!', 'success');
      };
      reader.onerror = () => {
        showToast('Error uploading image', 'error');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Error uploading image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ 
      ...prev, 
      imageUrl: ''
    }));
    setImageFile(null);
    showToast('Image removed', 'warning');
  };

  const handleDeleteProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      const updatedProjects = projects.filter(p => p.id !== projectToDelete.id);
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      setShowDeleteModal(false);
      setProjectToDelete(null);
      showToast('Project deleted successfully!', 'success');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setSelectedContact(null);
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...formData, id: editingProject.id }
          : p
      );
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Date.now()
      };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    }
    
    setShowProjectForm(false);
    setEditingProject(null);
    setImageFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen section-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-primary">
      {/* Header */}
      <div className="glass-surface border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FolderOpen className="w-8 h-8 text-accent-400" />
              <div>
                <h1 className="text-2xl font-playfair font-bold text-heading">
                  Admin Dashboard
                </h1>
                <p className="text-body">Manage your portfolio and contacts</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-surface border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-accent-400 text-accent-400'
                  : 'border-transparent text-body hover:text-heading'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-4 h-4" />
                <span>Projects</span>
                <span className="bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 px-2 py-1 rounded-full text-xs">
                  {projects.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'contacts'
                  ? 'border-accent-400 text-accent-400'
                  : 'border-transparent text-body hover:text-heading'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Contacts</span>
                <span className="bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 px-2 py-1 rounded-full text-xs">
                  {contacts.filter(c => c.status === 'new').length > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      {contacts.filter(c => c.status === 'new').length}
                    </span>
                  )}
                  {contacts.length}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-heading">{projects.length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-accent-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">Completed</p>
                  <p className="text-2xl font-bold text-heading">
                    {projects.filter(p => p.status === 'completed').length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">Categories</p>
                  <p className="text-2xl font-bold text-heading">
                    {[...new Set(projects.map(p => p.category))].length}
                  </p>
                </div>
                <ImageIcon className="w-8 h-8 text-primary-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">This Year</p>
                  <p className="text-2xl font-bold text-heading">
                    {projects.filter(p => p.year === '2023').length}
                  </p>
                </div>
                <Save className="w-8 h-8 text-accent-400" />
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">Total Contacts</p>
                  <p className="text-2xl font-bold text-heading">{contacts.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-accent-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">New Messages</p>
                  <p className="text-2xl font-bold text-heading">
                    {contacts.filter(c => c.status === 'new').length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-red-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">Read Messages</p>
                  <p className="text-2xl font-bold text-heading">
                    {contacts.filter(c => c.status === 'read').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-sm">This Week</p>
                  <p className="text-2xl font-bold text-heading">
                    {contacts.filter(c => {
                      const contactDate = new Date(c.createdAt);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return contactDate >= weekAgo;
                    }).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-primary-400" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'projects' ? (
          <>
            {/* Add Project Button */}
            <div className="mb-6">
              <button
                onClick={handleAddProject}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-100 dark:bg-surface-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {projects.map((project, index) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="hover:bg-surface-50 dark:hover:bg-surface-800/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-heading">
                                {project.title}
                              </div>
                              <div className="text-sm text-body">
                                {project.technologies}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-body">
                          {project.client}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-body">
                          {project.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-blue-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Contacts Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-100 dark:bg-surface-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-heading uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {contacts.map((contact, index) => (
                      <motion.tr
                        key={contact.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        onClick={() => handleViewContact(contact)}
                        className={`hover:bg-surface-50 dark:hover:bg-surface-800/50 cursor-pointer ${
                          contact.status === 'new' ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mr-3">
                              <MessageSquare className="w-5 h-5 text-accent-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-heading">
                                {contact.name}
                              </div>
                              <div className="text-sm text-body line-clamp-2">
                                {contact.message}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-body">
                            <Mail className="w-4 h-4 mr-2" />
                            {contact.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-body">
                            <Phone className="w-4 h-4 mr-2" />
                            {contact.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                            {contact.project}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-body">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(contact.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            contact.status === 'new' 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          }`}>
                            {contact.status === 'new' ? (
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                New
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Read
                              </div>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            {contact.status === 'new' && (
                              <button
                                onClick={() => markContactAsRead(contact.id)}
                                className="text-green-400 hover:text-green-600 transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                              title="Delete contact"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold text-heading">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="text-body hover:text-heading transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    >
                      <option value="">Select Category</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Office">Office</option>
                      <option value="Retail">Retail</option>
                      <option value="Hospitality">Hospitality</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Project Image
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(file);
                            handleImageUpload(file);
                          }
                        }}
                        disabled={uploadingImage}
                        className="form-input flex-1"
                      />
                      {uploadingImage && (
                        <div className="animate-spin w-5 h-5 border-2 border-accent-400 border-t-transparent rounded-full"></div>
                      )}
                    </div>
                    {formData.imageUrl && (
                      <div className="mt-2 relative">
                        <img
                          src={formData.imageUrl}
                          alt="Project preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          title="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1">Image uploaded successfully</p>
                      </div>
                    )}
                    <input
                      type="hidden"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    >
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProject ? 'Update Project' : 'Add Project'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              
              {/* Modal Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Project
              </h3>
              
              {/* Modal Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
              </p>
              
              {/* Project Info */}
              {projectToDelete && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center space-x-3">
                    {projectToDelete.imageUrl && (
                      <img 
                        src={projectToDelete.imageUrl} 
                        alt={projectToDelete.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{projectToDelete.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{projectToDelete.category}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProject}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Project</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Details Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedContact.name}</h3>
                    <p className="text-accent-100">Contact Details</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseContactModal}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedContact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedContact.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Project Type</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedContact.project || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Submitted Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedContact.status === 'new' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {selectedContact.status === 'new' ? 'New' : 'Read'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Message</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {selectedContact.status === 'new' && (
                  <button
                    onClick={() => {
                      markContactAsRead(selectedContact.id);
                      handleCloseContactModal();
                    }}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Read</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteContact(selectedContact.id);
                    handleCloseContactModal();
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Contact</span>
                </button>
                <button
                  onClick={handleCloseContactModal}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
