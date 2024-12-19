
// SessionManager.js
import axios from 'axios';
import { useState } from 'react';

const SessionManager = () => {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);

  const startSession = async (role, difficulty) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/session/start', {
        role: role,
        difficulty: difficulty
      });
      setSessionId(response.data.session_id);
      setSessionEnded(false);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const fetchNextQuestion = async () => {
    if (sessionId && !sessionEnded) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/session/question', {
          session_id: sessionId,
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching next question:', error);
        return null;
      }
    }
    return null;
  };

  const submitAnswer = async (questionNumber, userResponse) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/session/answer', {
        session_id: sessionId,
        question_number: questionNumber,
        user_response: userResponse
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting answer:', error);
      return null;
    }
  };

  const endSession = async () => {
    try {
      setSessionEnded(true);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  return {
    startSession,
    fetchNextQuestion,
    submitAnswer,
    sessionId,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    sessionEnded,
    endSession,
  };
};

export default SessionManager;