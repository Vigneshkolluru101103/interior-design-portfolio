import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Heart, Leaf, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Vision = () => {
  const { isDark } = useTheme();

  const visionPoints = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Spaces",
      description: "Creating unique environments that resonate with each client's lifestyle and preferences, ensuring every space tells their personal story.",
      color: "text-accent-400",
      bg: "bg-accent-50 dark:bg-accent-900/20"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Creativity",
      description: "Blending cutting-edge design trends with timeless elegance to create spaces that are both contemporary and enduring.",
      color: "text-primary-400",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Design",
      description: "Committed to eco-friendly materials and sustainable practices that minimize environmental impact while maximizing aesthetic appeal.",
      color: "text-accent-500",
      bg: "bg-accent-50 dark:bg-accent-900/20"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Functional Beauty",
      description: "Balancing stunning visuals with practical functionality to create spaces that work as beautifully as they look.",
      color: "text-primary-500",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    }
  ];

  return (
    <section id="vision" className="py-20 section-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heading mb-4">
            My Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-body max-w-3xl mx-auto leading-relaxed">
            Creating personalized, functional spaces that resonate with clients. 
            Blend innovation with sustainability using eco-friendly materials.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -8
              }}
              className="group"
            >
              <div className="glass-card h-full p-8 text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 ${point.bg} ${point.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-premium`}
                >
                  {point.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-playfair font-semibold text-heading mb-4">
                  {point.title}
                </h3>
                <p className="text-body leading-relaxed">
                  {point.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 flex justify-center">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-accent-400 to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-playfair font-semibold text-heading mb-4">
              Let's Create Something Beautiful Together
            </h3>
            <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
              Every project is an opportunity to transform a vision into reality. 
              Let's collaborate to create a space that truly reflects you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Project
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
