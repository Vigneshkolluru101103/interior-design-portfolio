import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  href, 
  onClick, 
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gold-500 text-white hover:bg-gold-600 hover:shadow-lg focus:ring-gold-500',
    secondary: 'bg-transparent border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white hover:shadow-lg focus:ring-gold-500',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gold-500 hover:text-gold-600 focus:ring-gold-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-beige-100 hover:text-gold-600 focus:ring-gold-500'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    xlarge: 'px-10 py-5 text-xl'
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;
  const motionProps = href ? { href } : { onClick };

  return (
    <MotionComponent
      className={buttonClasses}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...motionProps}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
      {!icon && variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4" />}
    </MotionComponent>
  );
};

export default Button;
