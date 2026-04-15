import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Experience = () => {
  const { isDark } = useTheme();
  const experienceData = [
    {
      company: "Earthen Bund",
      position: "Interior Design Worked",
      duration: "DECEMBER 2020 - APRIL 2021",
      location: "Various Locations",
      description: "Conducted site survey and assisted in design of planning and design of earthen bund. Documented project progress and assisted in preparing reports for senior engineer.",
      company: "Livspace",
      position: "Interior Design Worked",
      duration: "MARCH 2025 - FEBRUARY 2026",
      location: "Hyderabad, India",
      description: "Interior Design Worked Livspace and acquired knowledge about residential modulars of interiors.",
      responsibilities: [
        "Space planning and 3D visualization",
        "Material selection and procurement",
        "Client consultation and project management",
        "Design documentation and technical drawings"
      ],
      type: "current"
    },
    {
      company: "Lavish Homes",
      position: "Interior Design Worked",
      duration: "NOVEMBER 2024 - JANUARY 2025",
      location: "Bangalore, India",
      description: "Interior Design Worked in Lavish Homes for 3 months and acquired knowledge about Interiors.",
      responsibilities: [
        "AutoCAD drafting and technical drawings",
        "3D modeling and rendering",
        "Material research and sample preparation",
        "Site supervision and quality control"
      ],
      type: "past"
    },
    {
      company: "Surveying and Layout",
      position: "Interior Design Worked",
      duration: "MAY 2023 - JULY 2023",
      location: "Various Locations",
      description: "Assisted in surveying and layout of canal and pipe line route. Documented project progress and assisted in preparing reports for senior engineer.",
      responsibilities: [
        "Surveying and mapping",
        "Route planning",
        "Project documentation",
        "Progress reporting"
      ],
      type: "past"
    },
    {
      company: "Irrigation Department",
      position: "Interior Design Worked",
      duration: "AUGUST 2022 - SEPTEMBER 2022",
      location: "Various Locations",
      description: "Studied structural designs and layouts for check dams, ensuring their structural integrity and functionality.",
      responsibilities: [
        "Structural analysis",
        "Design documentation",
        "Site inspection",
        "Technical reporting"
      ],
      type: "past"
    },
    {
      company: "Earthen Bund",
      position: "Interior Design Worked",
      duration: "DECEMBER 2020 - APRIL 2021",
      location: "Various Locations",
      description: "Conducted site survey and assisted in design of planning and design of earthen bund. Documented project progress and assisted in preparing reports for senior engineer.",
      responsibilities: [
        "Client requirement analysis",
        "Design concept development",
        "Budget management and procurement",
        "Site survey and measurement"
      ],
      type: "past"
    }
  ];

  return (
    <section id="experience" className="py-20 section-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heading mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto rounded-full" />
          <p className="text-xl text-body mt-6 max-w-3xl mx-auto">
            Professional journey through the world of interior design
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-400 to-accent-500 transform -translate-x-1/2" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-400 rounded-full border-4 border-surface-50 dark:border-surface-900 z-10" />

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div className="glass-card p-8">
                    {/* Header */}
                    <div className={`p-6 bg-gradient-to-r rounded-xl border border-border-200 dark:border-border-600 mb-6 ${
                      exp.type === 'current' ? 'from-surface-50 to-surface-100 dark:from-surface-900/20 dark:to-surface-800/20' :
                      exp.type === 'freelance' ? 'from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20' :
                      'from-surface-50 to-surface-100 dark:from-surface-900/20 dark:to-surface-800/20'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            exp.type === 'current' ? 'bg-accent-400 text-white' :
                            exp.type === 'freelance' ? 'bg-primary-400 text-white' :
                            'bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200'
                          }`}>
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-playfair font-semibold text-heading">
                              {exp.company}
                            </h3>
                            <p className="text-lg text-body font-medium">
                              {exp.position}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm text-body">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent-400" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent-400" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-body leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-lg font-semibold text-heading mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5 text-accent-400" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                            <span className="text-body leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Applied Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-playfair font-semibold text-heading mb-6">
              Expertise Applied
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Site Survey', 'Engineering Work', 'Space Planning', '3D Visualization', 'Project Management', 'Material Procurement'].map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 glass-surface text-body hover:text-accent-400 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
