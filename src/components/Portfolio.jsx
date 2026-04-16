import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Modal from './Modal';
import { useTheme } from '../contexts/ThemeContext';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const { isDark } = useTheme();

  // Load projects directly from uploaded images
  useEffect(() => {
    // All uploaded projects from src/projects
    setProjects([
            // Bedroom Projects (B1-B6)
            {
              id: 1,
              title: 'Master Bedroom Design B1',
              category: 'bedroom',
              image: '/projects/B1.jpg',
              description: 'Elegant master bedroom featuring custom furniture and sophisticated lighting design',
              materials: 'Custom furniture, LED lighting, premium materials, silk curtains',
              details: 'A sophisticated master bedroom designed for comfort and style, featuring custom furniture pieces and carefully selected lighting to create a serene atmosphere.'
            },
                                    {
              id: 4,
              title: 'Modern Home Office with Integrated Vanity Space',
              category: 'workspace',
              image: '/projects/B4.jpg',
              description: 'A compact and elegant workspace combined with a dressing area, designed for functionality and modern aesthetics',
              materials: 'Wood finish panels, matte laminate cabinets, fluted wall panels, ambient LED lighting, decorative glass and metal accents',
              details: 'This design combines a functional home office setup with a stylish vanity area. The floating wooden desk is complemented by overhead storage cabinets and open shelves with warm lighting, creating an organized workspace. Adjacent to it, the vanity section features a mirror, soft lighting, and a compact seating arrangement. The blend of textures, including fluted wall panels and smooth finishes, enhances the modern and sophisticated look.'
            },
            {
              id: 5,
              title: 'Spacious Bedroom B5',
              category: 'bedroom',
              image: '/projects/B5.jpg',
              description: 'Large bedroom with ample storage and natural lighting',
              materials: 'Ample storage, natural lighting, modern design, hardwood floors',
              details: 'An expansive bedroom design maximizing natural light with ample storage solutions and modern hardwood flooring for comfortable living.'
            },
            {
              id: 6,
              title: 'Contemporary Bedroom B6',
              category: 'bedroom',
              image: '/projects/B6.jpg',
              description: 'Modern bedroom with contemporary design elements',
              materials: 'Contemporary design, modern materials, smart features, neutral palette',
              details: 'A modern bedroom showcasing contemporary design elements with smart features and a neutral color palette for sophisticated aesthetics.'
            },
            // Kitchen Projects (K1-K8)
            {
              id: 7,
              title: 'Modern Kitchen K1',
              category: 'kitchen',
              image: '/projects/K1.jpg',
              description: 'Functional kitchen with custom cabinetry and premium appliances',
              materials: 'Custom cabinetry, quartz countertops, stainless steel appliances, tile backsplash',
              details: 'A professionally designed kitchen featuring custom cabinetry with quartz countertops and high-end stainless steel appliances for modern cooking.'
            },
                        {
              id: 9,
              title: 'Compact Kitchen K3',
              category: 'kitchen',
              image: '/projects/K3.jpg',
              description: 'Efficient kitchen design for smaller spaces with maximum functionality',
              materials: 'Space optimization, efficient design, modern appliances, compact storage',
              details: 'An efficiently designed compact kitchen maximizing functionality in smaller spaces with modern appliances and clever storage solutions.'
            },
            {
              id: 10,
              title: 'Family Kitchen K4',
              category: 'kitchen',
              image: '/projects/K4.jpg',
              description: 'Family-friendly kitchen with durable materials and practical layout',
              materials: 'Durable materials, practical layout, family-friendly design, easy maintenance',
              details: 'A family-friendly kitchen designed with durable materials and practical layout for easy maintenance and everyday family use.'
            },
            {
              id: 11,
              title: 'Luxury Kitchen K5',
              category: 'kitchen',
              image: '/projects/K5.jpg',
              description: 'High-end kitchen with premium materials and sophisticated design',
              materials: 'Premium materials, sophisticated design, luxury appliances, custom finishes',
              details: 'A luxury kitchen featuring premium materials and sophisticated design with high-end appliances and custom finishes for elegant living.'
            },
            {
              id: 12,
              title: 'Smart Kitchen K6',
              category: 'kitchen',
              image: '/projects/K6.jpg',
              description: 'Modern kitchen with smart home integration and advanced features',
              materials: 'Smart home integration, advanced features, modern appliances, touch controls',
              details: 'A cutting-edge smart kitchen with home automation integration and advanced features including touch controls and modern appliances.'
            },
            {
              id: 13,
              title: 'Traditional Kitchen K7',
              category: 'kitchen',
              image: '/projects/K7.jpg',
              description: 'Classic kitchen design with traditional elements and modern functionality',
              materials: 'Traditional design, modern functionality, quality materials, classic finishes',
              details: 'A classic kitchen design combining traditional elements with modern functionality, featuring quality materials and timeless finishes.'
            },
            {
              id: 14,
              title: 'Industrial Kitchen K8',
              category: 'kitchen',
              image: '/projects/K8.jpg',
              description: 'Industrial-style kitchen perfect for commercial spaces',
              materials: 'Industrial design, commercial-grade equipment, durable materials, metal finishes',
              details: 'An industrial-style kitchen with commercial-grade equipment and durable materials, perfect for professional cooking spaces.'
            },
            // Living Room Projects (L1-L5)
            {
              id: 15,
              title: 'Contemporary Living Room L1',
              category: 'living',
              image: '/projects/L1.jpg',
              description: 'Modern living space with elegant furniture and sophisticated lighting',
              materials: 'Modern furniture, sophisticated lighting, premium materials, glass accents',
              details: 'A contemporary living space featuring elegant furniture and sophisticated lighting design with premium materials and glass accents.'
            },
                        {
              id: 18,
              title: 'Luxury Living Room L4',
              category: 'living',
              image: '/projects/L4.jpg',
              description: 'High-end living room with premium materials and elegant design',
              materials: 'Premium materials, elegant design, luxury furniture, marble details',
              details: 'A luxury living room showcasing premium materials and elegant design with luxury furniture and marble details for sophisticated entertaining.'
            },
                                                // Office Projects
            {
              id: 22,
              title: 'Modern Living Room TV Unit with Fluted Panel Design',
              category: 'living room',
              image: '/projects/B3.jpg',
              description: 'A contemporary living room setup featuring a sleek TV unit, fluted wall panels, and integrated display shelving',
              materials: 'Wood finish panels, fluted wall texture, laminate TV console, open display shelving, decorative accessories',
              details: 'This modern living room design highlights a stylish TV unit with a wood-finish console and vertically fluted wall panels that add texture and depth. The integrated open shelving unit showcases decorative pieces, books, and sculptures, enhancing the visual appeal. The neutral color palette and clean lines create a balanced, elegant, and clutter-free environment.'
            },
            {
              id: 23,
              title: 'Executive Office Suite',
              category: 'living',
              image: '/projects/L2.jpg',
              description: 'Professional executive office with premium materials and sophisticated design',
              materials: 'Mahogany desk, leather chair, custom cabinetry, soundproofing',
              details: 'An executive office suite featuring mahogany desk, leather seating, custom cabinetry, and soundproofing for professional environment.'
            },
                                    // Entry/Foyer Projects
            {
              id: 26,
              title: 'Grand Entry Foyer',
              category: 'living',
              image: '/projects/L5.jpg',
              description: 'Impressive entryway with stunning first impression and elegant design',
              materials: 'Marble flooring, grand staircase, custom lighting, mirror accents',
              details: 'A grand entry foyer with marble flooring, impressive staircase, custom lighting design, and elegant mirror accents.'
            },
                                    // Walk-in Closet Projects
            {
              id: 29,
              title: 'Luxury Walk-in Closet',
              category: 'bedroom',
              image: '/projects/B4.jpg',
              description: 'High-end walk-in closet with custom organization and premium finishes',
              materials: 'Custom shelving, shoe storage, vanity area, LED lighting',
              details: 'A luxury walk-in closet featuring custom shelving systems, specialized shoe storage, vanity area, and integrated LED lighting.'
            }
          ]);
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'autocad', name: 'AutoCAD Works' }
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    />
                    
                    {/* Premium Overlay */}
                    <div 
                      className="portfolio-overlay cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedProject(project)}
                        className="text-accent-400 hover:text-accent-500 font-medium text-sm"
                      >
                        View Details
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
