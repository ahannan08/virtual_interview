import React from 'react';

const LevelSelection = ({ selectedLevel, setSelectedLevel, onNext }) => {
  const levels = ["beginner", "intermediate", "advanced"];

  const handleNext = () => {
    if (selectedLevel) {
      onNext();
    } else {
      alert("Please select a difficulty level");
    }
  };

  return (
    <div className='selection'>
      <h3>Select Difficulty Level</h3>
      <div className='level'>
        {levels.map((level, index) => (
          <label key={index}>
            <input
              type='radio'
              value={level}
              checked={selectedLevel === level}
              onChange={() => setSelectedLevel(level)}
            />
            {level}
          </label>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default LevelSelection;
