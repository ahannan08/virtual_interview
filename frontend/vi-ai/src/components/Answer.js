import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const startSession = async (role, difficulty) => {
  try {
    const response = await axios.post(`${API_URL}/start`, { role, difficulty });
    return response.data;
  } catch (error) {
    console.error('Error starting session:', error);
    return { error: 'Failed to start session' };
  }
};

export const getQuestion = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/question`, { session_id: sessionId });
    return response.data;
  } catch (error) {
    console.error('Error getting question:', error);
    return { error: 'Failed to get question' };
  }
};

export const submitAnswer = async (sessionId, questionNumber, userResponse) => {
  try {
    const response = await axios.post(`${API_URL}/answer`, {
      session_id: sessionId,
      question_number: questionNumber,
      user_response: userResponse
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    return { error: 'Failed to submit answer' };
  }
};

export const endSession = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/end`, { session_id: sessionId });
    return response.data;
  } catch (error) {
    console.error('Error ending session:', error);
    return { error: 'Failed to end session' };
  }
};
