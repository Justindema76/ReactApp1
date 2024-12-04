import React from 'react';

function VisibilityControl({ isChecked, callback, description })  
{
  return (
    <div className="form-check">
      <input 
        className="form-check-input" 
        type="checkbox"
        checked={isChecked}
        onChange={(e) => callback(e.target.checked)} 
      />
      <h4 className="form-check-label">
        Show {description}
      </h4>
    </div>
  );
};
export default VisibilityControl;

