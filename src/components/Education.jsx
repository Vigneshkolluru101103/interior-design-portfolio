import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const Education = () => {
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
    <section id="education" className="py-20 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Education Journey
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold-400 via-gold-500 to-olive-400" />

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
                    className="bg-white p-6 rounded-xl shadow-lg border border-beige-200 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Year Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === 'degree' ? 'bg-gold-100 text-gold-700' :
                      item.type === 'certification' ? 'bg-olive-100 text-olive-700' :
                      item.type === 'diploma' ? 'bg-beige-200 text-beige-800' :
                      'bg-gray-100 text-gray-700'
                    } mb-3 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.year}
                    </div>

                    {/* Icon */}
                    <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                      <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600">
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      {item.institution}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
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
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-gold-500 rounded-full z-10"
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
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border border-beige-200">
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Continuous Learning
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
