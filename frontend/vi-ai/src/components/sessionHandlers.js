// sessionHandlers.js
export const handleSessionStart = async (startSession, selectedRole, selectedLevel) => {
    if (selectedRole && selectedLevel) {
      await startSession(selectedRole, selectedLevel);
    }
  };
  
  export const handleSubmitAnswer = async (userResponse, submitAnswer, currentQuestionIndex, setFeedback, setScore) => {
    if (!userResponse.trim()) {
      alert('Please provide an answer before submitting.');
      return false;
    }
  
    const response = await submitAnswer(currentQuestionIndex + 1, userResponse);
    setFeedback(response.feedback);
    setScore(response.score);
    return true;
  };
  
  export const handleNextQuestion = async (
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserResponse,
    setFeedback,
    fetchNextQuestion,
    maxQuestions,
    setShowFeedback,
    endSession,
    setQuestion
  ) => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserResponse('');
    setFeedback(null);
  
    if (currentQuestionIndex + 1 >= maxQuestions) {
      setShowFeedback(true);
      endSession();
    } else {
      const nextQuestion = await fetchNextQuestion();
      setQuestion(nextQuestion);
    }
  };
  