import React from 'react';
import './Popup.css'; // Import a CSS file for styling the Popup component

const Popup = ({ categoryData, closePopup }) => {
  // Access category information and render it in the popup
  const { category, todos } = categoryData;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-inner">
          <h2>Selected Category: {category}</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <strong>Unit Number:</strong> {todo.text}
                {/* Render other properties here */}
                <ul>
                  {todo.subtasks &&
                    todo.subtasks.length > 0 &&
                    todo.subtasks.map((subtask, index) => (
                      <li key={index}>
                        <strong>Position:</strong> {subtask.position},{' '}
                        <strong>Specifics:</strong> {subtask.specifics},{' '}
                        <strong>Tread Depth:</strong> {subtask.treadDepth}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
