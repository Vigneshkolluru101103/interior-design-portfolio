import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { validateContactData, sanitizeContactData } from '../utils/validation';

const Contact = () => {
  const { isDark } = useTheme();
  const { submitContactForm } = useFirebase();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // PDFs will be downloaded directly from server, no localStorage needed
    console.log('Contact component mounted - PDFs will be downloaded directly');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    // Validate form data
    const validation = validateContactData(formData);
    if (!validation.isValid) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the following errors:\n' + validation.errors.join('\n'));
      setIsSubmitting(false);
      return;
    }
    
    // Sanitize form data
    const sanitizedData = sanitizeContactData(formData);
    
    try {
      // Submit contact form to Firebase
      await submitContactForm(sanitizedData);
      
      // Show success message
      setSubmitStatus('success');
      setSubmitMessage('Contact details sent successfully! Thank you for your message. I will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage(`Sorry, there was an error submitting your message. Please try again or contact directly at arunkumarkolluru0@gmail.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'arunkumarkolluru0@gmail.com',
      href: 'mailto:arunkumarkolluru0@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 6305002566',
      href: 'tel:+916305002566'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Banglore,Karnataka,India',
      href: '#'
    }
  ];

  return (
    <>
      <section id="contact" className="py-20 section-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heading mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full" />
            <p className="text-xl text-body mt-6 max-w-3xl mx-auto">
              Let's collaborate to create your dream space. I'm here to bring your vision to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-playfair font-semibold text-heading mb-6">
                  Let's Design Your Space
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-body mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-body mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-body mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="project" className="block text-sm font-medium text-body mb-2">
                        Project Type
                      </label>
                      <select
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Select Project Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="office">Office Space</option>
                        <option value="renovation">Renovation</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-body mb-2">
                      Tell me about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Describe your vision, requirements, timeline, and any specific preferences..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                  
                  {/* Success/Error Message */}
                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg text-sm ${
                        submitStatus === 'success' 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="block glass-card p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-accent-50 dark:bg-accent-900/20 rounded-full flex items-center justify-center text-accent-400 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-heading">{info.label}</h4>
                        <p className="text-body">{info.value}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              
                          </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Downloads Box */}
      <div className="py-8 bg-surface-50 dark:bg-surface-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-playfair font-semibold text-heading mb-4">
              Quick Downloads
            </h3>
            <p className="text-body mb-6">
              Get my professional documents to learn more about my work and experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Direct download for resume PDF
                  const link = document.createElement('a');
                  link.href = '/resume/Arun_Resume.pdf';
                  link.download = 'Arun_Kumar_Resume.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  setTimeout(() => {
                    document.body.removeChild(link);
                  }, 100);
                }}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white rounded-xl transition-all duration-300 font-medium shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Direct download for portfolio PDF (bypass localStorage due to size)
                  const link = document.createElement('a');
                  link.href = '/resume/Arun_Kumar_Portfolio.pdf';
                  link.download = 'Arun_Kumar_Portfolio.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-xl transition-all duration-300 font-medium shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download Portfolio</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
