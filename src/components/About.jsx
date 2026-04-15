import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import arunkumarImage from '../images/arunkumar.jpeg';

const About = () => {
  const { isDark } = useTheme();

  return (
    <section id="about" className="py-16 px-8" 
             style={{
               backgroundColor: isDark ? '#0F1110' : '#F8F6F2'
             }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4"
              style={{
                color: isDark ? '#F5F5F5' : '#1A1A1A'
              }}>
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" 
               style={{
                 background: 'linear-gradient(to right, #C6A969, #C6A969)'
               }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side - Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative group">
              {/* Image Container */}
              <div className="p-4 rounded-2xl" 
                   style={{
                     backgroundColor: isDark ? '#1A1D1B' : '#FFFFFF',
                     border: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`,
                     boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
                   }}>
                {/* Portrait Image */}
                <img
                  src={arunkumarImage}
                  alt="Arun Kumar - Interior Designer"
                  className="rounded-2xl transition-transform duration-500 hover:scale-105 max-h-[500px] w-auto object-cover"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-2 -right-2 rounded-2xl p-4 shadow-xl"
                style={{
                  backgroundColor: '#C6A969',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">2+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [-8, 8, -8], 
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 -left-2 w-6 h-6 bg-accent-400/20 rounded-full blur-lg"
              />
              <motion.div
                animate={{ 
                  y: [8, -8, 8], 
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 -right-2 w-4 h-4 bg-primary-400/20 rounded-full blur-lg"
              />
            </div>
          </motion.div>

          {/* Content Side - Right on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex items-center"
          >
            <div className="p-6 rounded-xl max-w-lg" 
                 style={{
                   backgroundColor: isDark ? '#1A1D1B' : '#FFFFFF',
                   border: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`,
                   boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
                 }}>
              <h3 className="text-2xl font-playfair font-semibold mb-4"
                  style={{
                    color: isDark ? '#F5F5F5' : '#1A1A1A'
                  }}>
                Arun Kumar
              </h3>
              
              <div className="max-w-lg space-y-4" style={{ maxWidth: '520px' }}>
                <p className="text-base" 
                   style={{ 
                     textAlign: 'justify',
                     textJustify: 'inter-word',
                     lineHeight: '1.8',
                     wordSpacing: 'normal',
                     letterSpacing: '0.3px',
                     color: isDark ? '#A0A0A0' : '#6B6B6B',
                     marginBottom: '16px'
                   }}>
                  My name is Arun Kumar, skilled and creative interior designer with a passion for transforming spaces into functional and aesthetically pleasing environments.
                </p>
                
                <p className="text-base" 
                   style={{ 
                     textAlign: 'justify',
                     textJustify: 'inter-word',
                     lineHeight: '1.8',
                     wordSpacing: 'normal',
                     letterSpacing: '0.3px',
                     color: isDark ? '#A0A0A0' : '#6B6B6B',
                     marginBottom: '16px'
                   }}>
                  I&apos;m passionate about finding the true potential of each and every space. My goal is to explore more and further experience in interior design.
                </p>
              </div>

              {/* Compact Attributes Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { title: 'Creative Vision', icon: '·' },
                  { title: 'Technical Expertise', icon: '·' },
                  { title: 'Client Focused', icon: '·' },
                  { title: 'Sustainable Design', icon: '·' }
                ].map((attribute, index) => (
                  <motion.div
                    key={attribute.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isDark ? 'rgba(198, 169, 105, 0.1)' : 'rgba(198, 169, 105, 0.05)'
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" 
                         style={{
                           backgroundColor: '#C6A969'
                         }} />
                    <span className="text-sm font-medium"
                          style={{
                            color: isDark ? '#F5F5F5' : '#1A1A1A'
                          }}>{attribute.title}</span>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 pt-4"
                style={{
                  borderTop: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-sm px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: '#2F3E34',
                    color: '#FFFFFF'
                  }}
                  onHoverStart={(e) => {
                    e.currentTarget.style.backgroundColor = '#C6A969';
                  }}
                  onHoverEnd={(e) => {
                    e.currentTarget.style.backgroundColor = '#2F3E34';
                  }}
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Portfolio
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
