import React from 'react';

const Popup = ({ handleClose, handleReset, handleChange }) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <button onClick={handleChange}>Change</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;