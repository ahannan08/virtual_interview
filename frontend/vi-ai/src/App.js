// App.js
import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import Question from './components/Question';
import Feedback from './components/Feedback';

const App = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const { 
    startSession, 
    sessionId, 
    fetchNextQuestion, 
    currentQuestionIndex,
    setCurrentQuestionIndex, 
    sessionEnded, 
    endSession,
    submitAnswer 
  } = SessionManager();
  const [question, setQuestion] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(0);

  // Set max questions based on difficulty level
  useEffect(() => {
    if (selectedLevel) {
      const questionCounts = {
        'beginner': 5,
        'intermediate': 3,
        'advanced': 1
      };
      setMaxQuestions(questionCounts[selectedLevel] || 0);
    }
  }, [selectedLevel]);

  const handleSessionStart = () => {
    if (selectedRole && selectedLevel) {
      startSession(selectedRole, selectedLevel);
    } else {
      alert('Please select both role and difficulty level.');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userResponse.trim()) {
      alert('Please provide an answer before submitting.');
      return;
    }
    
    const response = await submitAnswer(currentQuestionIndex + 1, userResponse);
    setFeedback(response.feedback);
    setScore(response.score);
  };

  const handleNextQuestion = async () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserResponse('');
    setFeedback(null);

    // Check if we've reached the last question based on difficulty level
    if (currentQuestionIndex + 1 >= maxQuestions) {
      setShowFeedback(true);
      endSession();
    } else {
      const nextQuestion = await fetchNextQuestion();
      setQuestion(nextQuestion);
    }
  };

  useEffect(() => {
    if (sessionId && !sessionEnded) {
      const fetchFirstQuestion = async () => {
        const firstQuestion = await fetchNextQuestion();
        setQuestion(firstQuestion);
      };
      fetchFirstQuestion();
    }
  }, [sessionId, sessionEnded]);

  return (
    <div className="p-4">
      {!sessionId ? (
        <>
          <RoleSelection selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          <LevelSelection selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSessionStart}
          >
            Start Session
          </button>
        </>
      ) : question && !showFeedback ? (
        <Question 
          question={question}
          userResponse={userResponse}
          setUserResponse={setUserResponse}
          feedback={feedback}
          score={score}
          onSubmit={handleSubmitAnswer}
          onNext={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          maxQuestions={maxQuestions}
          sessionEnded={sessionEnded}
        />
      ) : showFeedback ? (
        <Feedback sessionId={sessionId} />
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default App;