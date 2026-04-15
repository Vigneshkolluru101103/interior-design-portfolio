import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Filter, X } from 'lucide-react';
import Modal from './Modal';
import { useTheme } from '../contexts/ThemeContext';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isDark } = useTheme();

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: '3d', name: '3D Designs' },
    { id: 'autocad', name: 'AutoCAD Works' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Living Space',
      category: 'living',
      image: 'https://images.unsplash.com/photo-1540518614846-7edd4a6667d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Contemporary living room with minimalist aesthetics and warm lighting',
      materials: 'Teak wood flooring, gypsum ceiling, marble finish, LED lighting',
      details: 'This modern living space features clean lines and a neutral color palette with teak wood flooring and a sophisticated gypsum ceiling design. The marble finish adds luxury while strategic LED lighting creates ambiance.'
    },
    {
      id: 2,
      title: 'Luxury Master Bedroom',
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Elegant master bedroom with premium materials and soft lighting',
      materials: 'Oak wood paneling, velvet upholstery, brass fixtures, silk curtains',
      details: 'A luxurious retreat featuring oak wood paneling and premium velvet upholstery. The brass fixtures and silk curtains create an atmosphere of sophistication and comfort.'
    },
    {
      id: 3,
      title: 'Gourmet Kitchen Design',
      category: 'kitchen',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Modern kitchen with smart storage and high-end appliances',
      materials: 'Granite countertops, custom cabinetry, stainless steel appliances',
      details: 'A chef\'s dream kitchen featuring granite countertops and custom cabinetry with smart storage solutions. High-end stainless steel appliances complete this functional yet elegant space.'
    },
    {
      id: 4,
      title: '3D Living Room Visualization',
      category: '3d',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Photorealistic 3D rendering of contemporary living space',
      materials: '3D modeling in SketchUp, rendering in V-Ray, post-production in Photoshop',
      details: 'High-quality 3D visualization created using SketchUp for modeling and V-Ray for photorealistic rendering. Post-production in Photoshop enhances the final presentation.'
    },
    {
      id: 5,
      title: 'Technical Floor Plans',
      category: 'autocad',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Detailed architectural drawings and technical specifications',
      materials: 'AutoCAD 2D drawings, technical specifications, material schedules',
      details: 'Comprehensive technical documentation including detailed floor plans, elevations, and material schedules created with precision in AutoCAD.'
    },
    {
      id: 6,
      title: 'Cozy Bedroom Retreat',
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Intimate bedroom design with warm colors and soft textures',
      materials: 'Pine wood furniture, cotton linen, warm LED lighting, wool rugs',
      details: 'An intimate and cozy bedroom featuring pine wood furniture and natural cotton linen. Warm LED lighting and wool rugs create a comfortable retreat.'
    },
    {
      id: 7,
      title: 'Open Concept Living',
      category: 'living',
      image: 'https://images.unsplash.com/photo-1600607687942-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Spacious open-concept living and dining area',
      materials: 'Hardwood floors, floor-to-ceiling windows, minimalist furniture',
      details: 'An expansive open-concept space with hardwood floors and floor-to-ceiling windows that flood the area with natural light. Minimalist furniture maintains the clean aesthetic.'
    },
    {
      id: 8,
      title: '3D Kitchen Render',
      category: '3d',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Realistic 3D kitchen visualization with lighting effects',
      materials: '3ds Max modeling, V-Ray rendering, realistic lighting simulation',
      details: 'Advanced 3D visualization using 3ds Max for modeling and V-Ray for realistic lighting and material rendering. Perfect for client presentations.'
    },
    {
      id: 9,
      title: 'AutoCAD Interior Details',
      category: 'autocad',
      image: 'https://images.unsplash.com/photo-1554118808-8bf76c1f7574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Detailed interior construction drawings',
      materials: 'Technical drawings, dimensioning, material specifications',
      details: 'Precise technical drawings with detailed construction information, proper dimensioning, and comprehensive material specifications for contractors.'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 section-surface">
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
            Portfolio Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full" />
          <p className="text-xl text-body mt-6 max-w-3xl mx-auto">
            Explore my collection of interior design projects and technical work
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'btn-primary'
                  : 'glass-surface text-body hover:text-accent-400'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="break-inside-avoid group"
              >
                <div className="portfolio-item glass-card overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Premium Overlay */}
                    <div className="portfolio-overlay">
                      <div className="text-white">
                        <h3 className="text-xl font-playfair font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quick View Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(project)}
                      className="absolute top-4 right-4 w-12 h-12 glass-surface rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-premium"
                    >
                      <Eye className="w-5 h-5 text-accent-400" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-playfair font-semibold text-heading mb-2">
                      {project.title}
                    </h3>
                    <p className="text-body text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-accent-400 uppercase tracking-wider">
                        {categories.find(cat => cat.id === project.category)?.name}
                      </span>
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedProject(project)}
                        className="text-accent-400 hover:text-accent-500 font-medium text-sm flex items-center gap-1"
                      >
                        View Details
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Modal onClose={() => setSelectedProject(null)}>
              <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 w-12 h-12 glass-surface rounded-full flex items-center justify-center shadow-premium"
                  >
                    <X className="w-6 h-6 text-accent-400" />
                  </motion.button>

                  {/* Image */}
                  <div className="relative h-96 overflow-hidden rounded-t-2xl">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-playfair font-bold text-heading mb-6">
                      {selectedProject.title}
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-heading mb-3">Description</h4>
                        <p className="text-body leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-heading mb-3">Materials & Techniques</h4>
                        <p className="text-body leading-relaxed">
                          {selectedProject.materials}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-heading mb-3">Project Details</h4>
                        <p className="text-body leading-relaxed">
                          {selectedProject.details}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Request Similar Design
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary"
                      >
                        Download Portfolio
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
