import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import Question from './components/Question';
import Feedback from './components/Feedback';

const App = () => {
  // Previous state declarations remain the same...
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
  const [isListening, setIsListening] = useState(false);

  // Remove showQuestionLoading state as it's now handled in the Question component

  // Previous handlers remain the same...
  const handleRoleNext = async () => {
    if (selectedRole) {
      setCurrentStep('level');
    } else {
      alert('Please select a role');
    }
  };

  const handleLevelNext = async () => {
    if (selectedLevel) {
      setIsLoading(true);
      await handleSessionStart();
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

  const handleSessionStart = async () => {
    if (selectedRole && selectedLevel) {
      await startSession(selectedRole, selectedLevel);
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

    if (currentQuestionIndex + 1 >= maxQuestions) {
      setShowFeedback(true);
      endSession();
    } else {
      const nextQuestion = await fetchNextQuestion();
      setQuestion(nextQuestion);
    }
  };

  // Speech recognition handler remains the same...
  const startSpeechRecognition = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.start();

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserResponse(speechToText);
      };
    } else {
      alert('Speech recognition is not supported in your browser.');
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

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

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
              onSubmit={handleSubmitAnswer}
              onNext={handleNextQuestion}
              currentQuestionIndex={currentQuestionIndex}
              maxQuestions={maxQuestions}
              sessionEnded={sessionEnded}
              startSpeechRecognition={startSpeechRecognition}
              isListening={isListening}
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