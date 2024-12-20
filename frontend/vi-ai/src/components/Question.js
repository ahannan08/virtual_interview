import React, { useEffect, useState } from 'react';
import '../styles/question.css';
import Speech from './Speech';

const Question = ({
  question,
  userResponse,
  setUserResponse,
  feedback,
  score,
  onSubmit,
  onNext,
  currentQuestionIndex,
  maxQuestions,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(question.question);
        speechSynthesis.speak(utterance);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [question]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold">Preparing your question...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Question {currentQuestionIndex + 1} of {maxQuestions}</h3>
      <p className="mb-6 text-lg">{question.question}</p>

      <div className="mb-6">
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your answer here..."
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          rows={6}
        />
      </div>

      <div className="flex gap-4">
        {!feedback ? (
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={onSubmit}
          >
            Submit Answer
          </button>
        ) : (
          <div className="w-full">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">Feedback</h4>
              <p className="mb-2">{feedback}</p>
              <p className="font-semibold">Score: {score}</p>
            </div>
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={onNext}
            >
              Next Question
            </button>
          </div>
        )}

        <Speech setUserResponse={setUserResponse} />
      </div>
    </div>
  );
};

export default Question;
