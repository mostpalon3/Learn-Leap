const url = 'http://localhost:5001' ;
// const url = "https://learn-leap.onrender.com" ;
/**
 * Extract text from a PDF file using backend service
 * 
 * @param {File} pdfFile 
 * @returns {Promise<Object>}
 */
export const extractTextFromPDF = async (pdfFile) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    
    const response = await fetch(`${url}/api/parse-pdf`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to parse PDF');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in PDF extraction:', error);
    throw error;
  }
};

/**
 * Clean extracted text to make it more suitable for quiz generation
 * 
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned text
 */
export const cleanExtractedText = (text) => {
  return text
    // Remove non-printable characters
    .replace(/[^\x20-\x7E\n\r\t]/g, '')
    // Replace repeated whitespace with single space
    .replace(/\s+/g, ' ')
    // Replace repeated newlines with a single one
    .replace(/\n+/g, '\n')
    // Replace multiple spaces after periods
    .replace(/\.\s+/g, '. ')
    // Remove leading/trailing whitespace
    .trim();
};

/**
 * Extract key sections from PDF text based on headings
 * This is useful for identifying structure in educational content
 * 
 * @param {string} text - The extracted text from PDF
 * @returns {Object} - Object containing identified sections
 */
export const extractContentSections = (text) => {
  // Common heading patterns in educational materials
  const headingPatterns = [
    /\b(chapter|section|unit)\s+\d+[:\s]+([^\n]+)/gi,
    /\b(introduction|conclusion|summary|overview|key\s+concepts)\b/gi,
    /\b(figure|table)\s+\d+[:\s]+([^\n]+)/gi,
  ];
  
  const sections = {};
  
  // Extract potential headings and their content
  let currentHeading = 'Main Content';
  let currentContent = [];
  
  const lines = text.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    // Check if line is a heading
    let isHeading = false;
    
    for (const pattern of headingPatterns) {
      if (pattern.test(trimmedLine)) {
        // If we already have content for previous heading, add it
        if (currentContent.length > 0) {
          sections[currentHeading] = currentContent.join('\n');
          currentContent = [];
        }
        
        currentHeading = trimmedLine;
        isHeading = true;
        break;
      }
    }
    
    // If it's a heading pattern, process as new section
    if (!isHeading) {
      // It's content, add to current section
      currentContent.push(trimmedLine);
    }
  });
  
  // Add the last section
  if (currentContent.length > 0) {
    sections[currentHeading] = currentContent.join('\n');
  }
  
  return {
    sections,
    mainContent: text,
    // Extract first 10 sentences for a summary
    summary: text.split(/[.!?]+\s+/).slice(0, 10).join('. ') + '.'
  };
};