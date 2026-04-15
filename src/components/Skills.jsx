import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Camera, FileText, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Skills = () => {
  const { isDark } = useTheme();

  const skillsData = [
    {
      name: 'AutoCAD',
      level: 95,
      icon: <Palette className="w-6 h-6" />,
      color: 'bg-accent-400'
    },
    {
      name: 'SketchUp',
      level: 90,
      icon: <Camera className="w-6 h-6" />,
      color: 'bg-primary-400'
    },
    {
      name: '3ds Max',
      level: 85,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-accent-500'
    },
    {
      name: 'V-Ray',
      level: 88,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-primary-500'
    },
    {
      name: 'Photoshop',
      level: 92,
      icon: <Palette className="w-6 h-6" />,
      color: 'bg-accent-600'
    },
    {
      name: 'Enscape',
      level: 87,
      icon: <Camera className="w-6 h-6" />,
      color: 'bg-primary-600'
    },
    {
      name: 'Space Planning',
      level: 96,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-accent-300'
    },
    {
      name: 'Material Selection',
      level: 94,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-primary-300'
    }
  ];

  return (
    <section id="skills" className="py-20 section-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heading mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full" />
          <p className="text-xl text-body mt-6 max-w-3xl mx-auto">
            Mastering the tools and technologies that bring creative visions to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -8
              }}
              className="glass-card p-6 text-center"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-400 group-hover:scale-110 transition-transform duration-300 shadow-premium"
              >
                {skill.icon}
              </motion.div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-heading mb-3 font-inter">
                {skill.name}
              </h3>

              {/* Skill Level */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-body">
                  <span>Proficiency</span>
                  <span className="text-accent-400 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className={`h-full ${skill.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-accent-50 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-accent-400" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-heading mb-3">
              Design Software
            </h3>
            <p className="text-body">
              AutoCAD, SketchUp, 3ds Max, V-Ray
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-heading mb-3">
              Visualization
            </h3>
            <p className="text-body">
              Enscape, V-Ray, Photoshop
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-accent-50 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-heading mb-3">
              Productivity
            </h3>
            <p className="text-body">
              MS Office, Canva, Project Management
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
