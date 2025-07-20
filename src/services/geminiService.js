const url ='http://localhost:5001';

// const url ="https://learn-leap.onrender.com";

/**
 * Generates a quiz from text content using Gemini AI via backend service
 * @param {string} content - The text content to generate a quiz from
 * @param {number} questionCount - Number of questions to generate
 * @returns {Promise<Array>} - Array of quiz questions
 */
export const generateQuizFromContent = async (content, questionCount = 5) => {

  console.log(url);
  try {
    const response = await fetch(`${url}/api/generate-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, questionCount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

/**
 * Analyzes text content and extracts key concepts via backend service
 * @param {string} content - The text content to analyze
 * @returns {Promise<Object>} - Analysis results with key concepts
 */
export const analyzeContentForQuiz = async (content) => {
  try {
    const response = await fetch(`${url}/api/analyze-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
};