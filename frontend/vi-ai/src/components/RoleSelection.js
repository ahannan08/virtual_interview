import React from 'react';
import '../styles/role.css'; // Import CSS file

const RoleSelection = ({ selectedRole, setSelectedRole, onNext }) => {
  const roles = ["frontend", "backend", "ai", "fullstack"];

  return (
    <div className="selection mb-6">
      <h3 className="text-2xl font-bold mb-4">Select Your Role</h3>
      <div className="role space-y-3">
        {roles.map((role, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={role}
              checked={selectedRole === role}
              onChange={() => setSelectedRole(role)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-lg">{role}</span>
          </label>
        ))}
      </div>
      <button 
        onClick={onNext}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default RoleSelection;
