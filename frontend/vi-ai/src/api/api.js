import axios from 'axios';

const API_URL = 'http://localhost:5000/api/session'; // Backend API URL

// Start session
export const startSession = async (role, level) => {
  try {
    const response = await axios.post(`${API_URL}/start`, {
      role,
      difficulty: level,
    });
    return response.data;
  } catch (error) {
    console.error('Error starting session:', error);
    throw error;
  }
};

// Get next question
export const getNextQuestion = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/question`, {
      session_id: sessionId,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

// Submit answer
export const submitAnswer = async (sessionId, questionNumber, userResponse) => {
  try {
    const response = await axios.post(`${API_URL}/answer`, {
      session_id: sessionId,
      question_number: questionNumber,
      user_response: userResponse,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
};

// End session
export const endSession = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/end`, {
      session_id: sessionId,
    });
    return response.data;
  } catch (error) {
    console.error('Error ending session:', error);
    throw error;
  }
};
