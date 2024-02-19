import React from 'react';

const Popup = ({ handleClose, handleReset, handleChange }) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <button onClick={handleChange} className="button">Change</button>
        <button onClick={handleReset} className="button">Reset</button>
        <button onClick={handleClose} className="button">Close</button>
      </div>
    </div>
  );
};

export default Popup;