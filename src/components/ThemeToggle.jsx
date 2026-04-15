import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface-200 dark:bg-surface-700 border border-border-200 dark:border-border-600 transition-all duration-300 hover:shadow-glass focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-surface-50 dark:focus:ring-offset-surface-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Track background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-600 dark:to-accent-700 opacity-50" />
      
      {/* Toggle button */}
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-surface-50 dark:bg-surface-900 shadow-md border border-border-100 dark:border-border-700 flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon */}
        <motion.div
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0.8 : 1
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-accent-600 dark:text-accent-400" />
          ) : (
            <Sun className="w-3 h-3 text-accent-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? '0 0 20px rgba(198, 169, 105, 0.3)' 
            : '0 0 20px rgba(47, 62, 52, 0.2)'
        }}
        transition={{
          duration: 0.3
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
