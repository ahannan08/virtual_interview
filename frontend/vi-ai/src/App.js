import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import Question from './components/Question';
import Feedback from './components/Feedback';
import LoadingSpinner from './components/LoadingSpinner';
import { 
  handleSessionStart, 
  handleSubmitAnswer, 
  handleNextQuestion 
} from './components/sessionHandlers';

const App = () => {
  const [currentStep, setCurrentStep] = useState('role');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRoleNext = () => {
    if (selectedRole) {
      setCurrentStep('level');
    } else {
      alert('Please select a role');
    }
  };

  const handleLevelNext = async () => {
    if (selectedLevel) {
      setIsLoading(true);
      await handleSessionStart(startSession, selectedRole, selectedLevel);
      setCurrentStep('quiz');
      setIsLoading(false);
    } else {
      alert('Please select a difficulty level');
    }
  };

  const handleBack = () => {
    if (currentStep === 'level') {
      setCurrentStep('role');
      setSelectedLevel('');
    }
  };

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
    <div className="p-4 max-w-2xl mx-auto">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentStep === 'role' && (
            <RoleSelection 
              selectedRole={selectedRole} 
              setSelectedRole={setSelectedRole}
              onNext={handleRoleNext}
            />
          )}

          {currentStep === 'level' && (
            <div>
              <LevelSelection 
                selectedLevel={selectedLevel} 
                setSelectedLevel={setSelectedLevel}
                onNext={handleLevelNext}
              />
              <button 
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          )}

          {currentStep === 'quiz' && !showFeedback && question && (
            <Question 
              question={question}
              userResponse={userResponse}
              setUserResponse={setUserResponse}
              feedback={feedback}
              score={score}
              onSubmit={() => handleSubmitAnswer(userResponse, submitAnswer, currentQuestionIndex, setFeedback, setScore)}
              onNext={() => handleNextQuestion(
                currentQuestionIndex,
                setCurrentQuestionIndex,
                setUserResponse,
                setFeedback,
                fetchNextQuestion,
                maxQuestions,
                setShowFeedback,
                endSession,
                setQuestion
              )}
              currentQuestionIndex={currentQuestionIndex}
              maxQuestions={maxQuestions}
              sessionEnded={sessionEnded}
            />
          )}

          {showFeedback && (
            <Feedback sessionId={sessionId} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
