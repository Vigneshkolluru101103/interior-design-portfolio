import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  delay = 0,
  ...props 
}) => {
  const MotionComponent = motion.div;
  
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { 
        y: -8, 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        scale: 1.02 
      } : {}}
      className={`bg-white rounded-xl shadow-lg border border-beige-200 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-beige-100 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-beige-100 ${className}`}>
    {children}
  </div>
);

export default Card;
