import React from 'react';

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
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Question {currentQuestionIndex + 1}</h3>
      <p className="mb-4">{question.question}</p>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Write your answer here..."
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        rows={4}
      />

      {!feedback ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onSubmit}
        >
          Submit Answer
        </button>
      ) : (
        <div>
          <div className="mb-4">
            <h4 className="font-bold">Feedback</h4>
            <p>{feedback}</p>
            <p>Score: {score}</p>
          </div>
          
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={onNext}
          >
            {currentQuestionIndex < maxQuestions - 1 ? 'Next Question' : 'Submit and End'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;