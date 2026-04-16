// Utility function to load resume PDF into localStorage
export const loadResumeToLocalStorage = async () => {
  try {
    // Read the resume PDF file
    const response = await fetch('/src/resume/Arun_Resume.pdf');
    const blob = await response.blob();
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result;
      localStorage.setItem('resumePDF', base64data);
      localStorage.setItem('resumePDFName', 'Arun_Resume.pdf');
      console.log('Resume PDF loaded to localStorage');
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Error loading resume PDF:', error);
  }
};

// Function to check if resume is already loaded
export const isResumeLoaded = () => {
  return localStorage.getItem('resumePDF') !== null;
};

// Auto-load resume if not already present
if (!isResumeLoaded()) {
  loadResumeToLocalStorage();
}
