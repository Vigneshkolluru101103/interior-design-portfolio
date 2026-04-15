import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Education = () => {
  const { isDark } = useTheme();
  const educationData = [
    {
      year: "2024",
      title: "BTech in Computer Science",
      institution: "JNTU University",
      description: "Bachelor of Technology with specialization in Computer Science and Engineering",
      icon: <GraduationCap className="w-6 h-6" />,
      type: "degree"
    },
    {
      year: "2024",
      title: "Interior Design Certification",
      institution: "Design Institute",
      description: "Professional certification in Interior Design and Space Planning",
      icon: <Award className="w-6 h-6" />,
      type: "certification"
    },
    {
      year: "2021",
      title: "Diploma in Interior Design",
      institution: "Technical College",
      description: "Comprehensive diploma covering design principles, materials, and project management",
      icon: <Award className="w-6 h-6" />,
      type: "diploma"
    },
    {
      year: "2018",
      title: "SSC (10th Grade)",
      institution: "High School",
      description: "Secondary School Certificate with distinction in Arts and Mathematics",
      icon: <GraduationCap className="w-6 h-6" />,
      type: "school"
    }
  ];

  return (
    <section id="education" className="py-20" 
             style={{
               backgroundColor: isDark ? '#0F1110' : '#F8F6F2'
             }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Education Journey
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" 
               style={{
                 background: 'linear-gradient(to right, #C6A969, #C6A969)'
               }} />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full" 
                 style={{
                   background: isDark ? 'linear-gradient(to bottom, #C6A969, #C6A969)' : 'linear-gradient(to bottom, #C6A969, #C6A969)'
                 }} />

            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: isDark ? '#1A1D1B' : '#FFFFFF',
                      border: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`,
                      boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Year Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${index % 2 === 0 ? 'ml-auto' : ''}`}
                         style={{
                           backgroundColor: isDark ? 'rgba(198, 169, 105, 0.2)' : 'rgba(198, 169, 105, 0.1)',
                           color: '#C6A969'
                         }}>
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.year}
                    </div>

                    {/* Icon */}
                    <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                           style={{
                             backgroundColor: isDark ? 'rgba(198, 169, 105, 0.1)' : 'rgba(198, 169, 105, 0.05)'
                           }}>
                        <div style={{ color: '#C6A969' }}>
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-playfair font-semibold mb-2"
                        style={{
                          color: isDark ? '#F5F5F5' : '#1A1A1A'
                        }}>
                      {item.title}
                    </h3>
                    <p className="font-medium mb-2"
                       style={{
                         color: isDark ? '#A0A0A0' : '#6B6B6B'
                       }}>
                      {item.institution}
                    </p>
                    <p className="text-sm leading-relaxed"
                       style={{
                         color: isDark ? '#A0A0A0' : '#6B6B6B',
                         opacity: 0.8
                       }}>
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10"
                  style={{
                    backgroundColor: isDark ? '#1A1D1B' : '#FFFFFF',
                    border: '4px solid #C6A969'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block p-8 rounded-2xl shadow-lg"
                 style={{
                   backgroundColor: isDark ? '#1A1D1B' : '#FFFFFF',
                   border: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`,
                   boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
                 }}>
              <h3 className="text-2xl font-playfair font-semibold mb-4"
                  style={{
                    color: isDark ? '#F5F5F5' : '#1A1A1A'
                  }}>
                Continuous Learning
              </h3>
              <p className="max-w-2xl mx-auto leading-relaxed"
                 style={{
                   color: isDark ? '#A0A0A0' : '#6B6B6B'
                 }}>
                My educational journey combines technical expertise with creative design skills, 
                enabling me to deliver innovative interior solutions that blend functionality with aesthetics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
