// SubtaskForm.js

import React, { useState } from 'react';

const SubtaskForm = ({ onClose, onSave }) => {
  const [position, setPosition] = useState('');
  const [specifics, setSpecifics] = useState('');
  const [treadDepth, setTreadDepth] = useState('');

  const handleSubtaskPosition = (e) => {
    setPosition(e.target.value);
  };

  const handleSubtaskSpecifics = (e) => {
    setSpecifics(e.target.value);
  };

  const handleSubtaskTreadDepth = (e) => {
    setTreadDepth(e.target.value);
  };

  const handleSaveSubtasks = () => {
    onSave({ position, specifics, treadDepth }); // Save all subtasks at once as an object
    setPosition('');
    setSpecifics('');
    setTreadDepth('');
  };

  return (
    <div className="subtask-popup">
      <label>Position:</label>
      <input
        type="text"
        value={position}
        onChange={handleSubtaskPosition}
        placeholder="Enter subtask 1"
      />

      <label>Specifics</label>
      <input
        type="text"
        value={specifics}
        onChange={handleSubtaskSpecifics}
        placeholder="Enter subtask 2"
      />

      <label>Tread Depth:</label>
      <input
        type="number"
        value={treadDepth}
        onChange={handleSubtaskTreadDepth}
        placeholder="Enter subtask 2"
      />

      <button onClick={handleSaveSubtasks}>Add Subtasks</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SubtaskForm;
