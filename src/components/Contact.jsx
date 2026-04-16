import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  useEffect(() => {
    // Load PDFs into localStorage if not already present
    const loadPDFs = async () => {
      try {
        // Load Resume PDF
        if (!localStorage.getItem('resumePDF')) {
          const resumeResponse = await fetch('/resume/Arun_Resume.pdf');
          if (resumeResponse.ok) {
            const resumeBlob = await resumeResponse.blob();
            const resumeReader = new FileReader();
            resumeReader.onload = () => {
              const base64data = resumeReader.result;
              localStorage.setItem('resumePDF', base64data);
              localStorage.setItem('resumePDFName', 'Arun_Resume.pdf');
              console.log('Resume PDF loaded to localStorage');
            };
            resumeReader.readAsDataURL(resumeBlob);
          }
        }

        // Load Portfolio PDF
        if (!localStorage.getItem('portfolioPDF')) {
          console.log('Loading portfolio PDF...');
          const portfolioResponse = await fetch('/resume/Arun_Kumar_Portfolio.pdf');
          console.log('Portfolio response:', portfolioResponse.status, portfolioResponse.ok);
          
          if (portfolioResponse.ok) {
            console.log('Portfolio response OK, reading blob...');
            const portfolioBlob = await portfolioResponse.blob();
            console.log('Portfolio blob size:', portfolioBlob.size);
            
            const portfolioReader = new FileReader();
            portfolioReader.onload = () => {
              const base64data = portfolioReader.result;
              console.log('Portfolio base64 length:', base64data.length);
              localStorage.setItem('portfolioPDF', base64data);
              localStorage.setItem('portfolioPDFName', 'Arun_Kumar_Portfolio.pdf');
              console.log('Portfolio PDF loaded to localStorage');
            };
            portfolioReader.onerror = (error) => {
              console.error('Portfolio FileReader error:', error);
            };
            portfolioReader.readAsDataURL(portfolioBlob);
          } else {
            console.error('Portfolio fetch failed:', portfolioResponse.status, portfolioResponse.statusText);
          }
        } else {
          console.log('Portfolio PDF already in localStorage');
        }
      } catch (error) {
        console.error('Error loading PDFs:', error);
      }
    };

    loadPDFs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save contact submission to localStorage
    const submission = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Get existing submissions
    const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    
    // Add new submission
    existingSubmissions.unshift(submission);
    
    // Save to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      project: '',
      message: ''
    });
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
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
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
                        placeholder="+91 98765 43210"
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

              {/* Consultation Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-8 h-8 text-accent-400" />
                  <h3 className="text-2xl font-playfair font-semibold text-heading">
                    Free Consultation
                  </h3>
                </div>
                <p className="text-body leading-relaxed mb-6">
                  Schedule a complimentary 30-minute consultation to discuss your project requirements and explore how we can work together to create your perfect space.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary w-full"
                >
                  Book Consultation
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h4 className="text-lg font-semibold text-heading mb-4">Connect With Me</h4>
                <div className="flex justify-center gap-4">
                  {['Instagram', 'LinkedIn', 'Pinterest', 'WhatsApp'].map((social, index) => (
                    <motion.button
                      key={social}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 glass-surface rounded-full shadow-md flex items-center justify-center hover:shadow-premium transition-all duration-300"
                    >
                      <span className="text-xs font-medium text-accent-400">{social.charAt(0)}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
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
                  const resumePDF = localStorage.getItem('resumePDF');
                  if (resumePDF) {
                    const link = document.createElement('a');
                    link.href = resumePDF;
                    link.download = 'Arun_Kumar_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    alert('Resume PDF not available. Please upload it in the admin dashboard.');
                  }
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
