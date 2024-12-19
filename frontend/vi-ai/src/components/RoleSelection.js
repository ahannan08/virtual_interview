import React from 'react';

const RoleSelection = ({ selectedRole, setSelectedRole, onNext }) => {
  const roles = ["frontend", "backend", "AI engineer", "Full stack"];

  const handleNext = () => {
    if (selectedRole) {
      onNext();
    } else {
      alert("Please select a role");
    }
  };

  return (
    <div className='selection'>
      <h3>Select Your Role</h3>
      <div className='role'>
        {roles.map((role, index) => (
          <label key={index}>
            <input
              type='radio'
              value={role}
              checked={selectedRole === role}
              onChange={() => setSelectedRole(role)}
            />
            {role}
          </label>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default RoleSelection;
