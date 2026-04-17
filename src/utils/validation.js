// Input validation and sanitization utilities

// Sanitize HTML input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate URL format
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate project data
export const validateProjectData = (data) => {
  const errors = {};

  // Title validation
  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Project title must be at least 3 characters long';
  }

  // Category validation
  if (!data.category || data.category.trim().length < 2) {
    errors.category = 'Category must be at least 2 characters long';
  }

  // Description validation
  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  // Image URL validation
  if (!data.imageUrl || data.imageUrl.trim().length < 5) {
    errors.imageUrl = 'Image URL is required';
  } else {
    // Comprehensive URL validation
    const urlValidation = validateImageUrl(data.imageUrl);
    if (!urlValidation.isValid) {
      errors.imageUrl = urlValidation.error;
    }
  }

  // Client validation
  if (data.client && data.client.trim().length < 2) {
    errors.client = 'Client name must be at least 2 characters long';
  }

  // Year validation
  if (data.year && (isNaN(data.year) || data.year < 1900 || data.year > new Date().getFullYear() + 10)) {
    errors.year = 'Please enter a valid year';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate contact form data
export const validateContactData = (contactData) => {
  const errors = [];
  
  if (!contactData.name || contactData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!contactData.email || !isValidEmail(contactData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!contactData.message || contactData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (contactData.phone && (isNaN(contactData.phone.replace(/[\s-]/g, '')) || contactData.phone.replace(/[\s-]/g, '').length < 10)) {
    errors.push('Please enter a valid phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateImageUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'Image URL is required' };
  }

  const trimmedUrl = url.trim();
  
  // Check URL format
  try {
    const urlObj = new URL(trimmedUrl);
    
    // Check protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must start with http:// or https://' };
    }
    
    // Check domain
    if (!urlObj.hostname) {
      return { isValid: false, error: 'Invalid URL format' };
    }
    
    // Block problematic domains
    const blockedDomains = ['unsplash.com', 'via.placeholder.com'];
    if (blockedDomains.some(domain => urlObj.hostname.includes(domain))) {
      return { isValid: false, error: 'Please use a different image hosting service' };
    }
    
    return { isValid: true, cleanUrl: trimmedUrl };
  } catch (e) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

// Sanitize project data before saving
export const sanitizeProjectData = (projectData) => {
  return {
    title: sanitizeInput(projectData.title || ''),
    category: sanitizeInput(projectData.category || ''),
    description: sanitizeInput(projectData.description || ''),
    imageUrl: sanitizeInput(projectData.imageUrl || ''),
    technologies: sanitizeInput(projectData.technologies || ''),
    client: sanitizeInput(projectData.client || ''),
    year: sanitizeInput(projectData.year || ''),
    status: sanitizeInput(projectData.status || '')
  };
};

// Sanitize contact data before saving
export const sanitizeContactData = (contactData) => {
  return {
    name: sanitizeInput(contactData.name || ''),
    email: sanitizeInput(contactData.email || ''),
    phone: sanitizeInput(contactData.phone || ''),
    message: sanitizeInput(contactData.message || ''),
    service: sanitizeInput(contactData.service || '')
  };
};
