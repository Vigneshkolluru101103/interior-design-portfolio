import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
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
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
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
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }
    
    // Load data from localStorage
    loadProjects();
    loadContacts();
  }, [navigate]);

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

  const loadContacts = () => {
    try {
      const savedContacts = localStorage.getItem('contactSubmissions');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      } else {
        // Default sample contacts
        const defaultContacts = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+91 98765 43210',
            project: 'Luxury Villa Design',
            message: 'I would like to discuss a luxury villa project. Please contact me for more details.',
            timestamp: '2024-01-15T10:30:00.000Z',
            status: 'new'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+91 87654 32109',
            project: 'Office Interior',
            message: 'We need interior design for our new office space. Looking for modern design solutions.',
            timestamp: '2024-01-14T14:45:00.000Z',
            status: 'read'
          }
        ];
        setContacts(defaultContacts);
        localStorage.setItem('contactSubmissions', JSON.stringify(defaultContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markContactAsRead = (contactId) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, status: 'read' } : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedContacts));
  };

  const deleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      const updatedContacts = contacts.filter(c => c.id !== contactId);
      setContacts(updatedContacts);
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedContacts));
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  const handleAddProject = () => {
    setEditingProject(null);
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
    setFormData(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    }
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
                      const contactDate = new Date(c.timestamp);
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
                        className={`hover:bg-surface-50 dark:hover:bg-surface-800/50 ${
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
                            {formatDate(contact.timestamp)}
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
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full"
                  />
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
    </div>
  );
};

export default AdminDashboard;
