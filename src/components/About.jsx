import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  return (
    <section id="about" className="py-16 px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heading mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full" />
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
              {/* Glass Effect Container */}
              <div className="glass-surface p-4 rounded-2xl">
                {/* Portrait Image */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Arun Kumar - Interior Designer"
                  className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-transform duration-500 hover:scale-105 max-h-[500px] w-auto object-cover"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-2 -right-2 bg-accent-400 text-white rounded-2xl p-4 shadow-xl"
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
            <div className="glass-card p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg">
              <h3 className="text-2xl font-playfair font-semibold text-heading mb-4">
                Arun Kumar
              </h3>
              
              <div className="space-y-4 text-body leading-relaxed">
                <p className="text-base">
                  My name is Arun Kumar, skilled and creative interior designer with a passion for transforming spaces into functional and aesthetically pleasing environments.
                </p>
                
                <p className="text-base">
                  I'm passionate about finding the true potential of each and every space. My goal is to explore more and further experience in interior design.
                </p>
                
                <p className="text-base">
                  With a keen eye for detail and a deep understanding of design principles, I bring visions to life through thoughtful space planning and innovative solutions.
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
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{attribute.title}</span>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 pt-4 border-t border-border-200 dark:border-border-600"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full text-sm"
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
