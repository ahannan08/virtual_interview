import React from 'react';
import "../styles/level.css"
const LevelSelection = ({ selectedLevel, setSelectedLevel, onNext }) => {
  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <div className="selection mb-6">
      <h3 className="text-2xl font-bold mb-4">Select Difficulty Level</h3>
      <div className="level space-y-3">
        {levels.map((level, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={level}
              checked={selectedLevel === level}
              onChange={() => setSelectedLevel(level)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-lg">{level}</span>
          </label>
        ))}
      </div>
      <button 
        onClick={onNext}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start Interview
      </button>
    </div>
  );
};

export default LevelSelection;