import React, { useState } from 'react';
import './todo.css'
const SubtaskPopup = ({ onClose, onSave }) => {
  const [position, setPosition] = useState('');
  const [specifics, setSpecifics] = useState('');

  const handleSubtaskChange1 = (e) => {
    setPosition(e.target.value);
  };

  const handleSubtaskChange2 = (e) => {
    setSpecifics(e.target.value);
  };

  const handleSaveSubtasks = () => {
    if (position.trim() !== '') {
      onSave(position);
      setPosition('');
    }
    if (specifics.trim() !== '') {
      onSave(specifics);
      setSpecifics('');
    }
  };

  return (
    <div className="subtask-popup">
      <label>Position:</label>
      <input
        type="text"
        value={position}
        onChange={handleSubtaskChange1}
        placeholder="Enter subtask 1"
      />

      <label>Specifics</label>
      <input
        type="text"
        value={specifics}
        onChange={handleSubtaskChange2}
        placeholder="Enter subtask 2"
      />
      <button onClick={handleSaveSubtasks}>Add Subtasks</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};



  const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState(['All', 'Work', 'Personal']);
    const [showSubtaskPopup, setShowSubtaskPopup] = useState(false);
    const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, category: selectedCategory, subtasks: [] }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleAddSubtask = (text) => {
    if (text.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[currentTodoIndex].subtasks.push(text);
      setTodos(updatedTodos);
    }
    setShowSubtaskPopup(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCreateCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
        <input
          type="text"
          value={newCategory}
          onChange={handleNewCategoryChange}
          placeholder="Enter a new category"
        />
        <button onClick={handleCreateCategory}>Create</button>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {/* Todo items */}
        {todos.map((todo, index) => {
          if (selectedCategory === 'All' || todo.category === selectedCategory) {
            return (
              <li key={index}>
                {todo.text}
                <button
                  onClick={() => {
                    setCurrentTodoIndex(index);
                    setShowSubtaskPopup(true);
                  }}
                >
                  Add Subtask
                </button>
                <ul>
                  {/* Rendering subtasks and labeling them */}
                  {todo.subtasks.map((subtask, subIndex) => (
                    <li key={subIndex}>
                      {subIndex % 2 === 0 ? <strong>Position:</strong> : <strong>Specifics:</strong>} {subtask}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </li>
            );
          }
          return null;
        })}
      </ul>

      {/* Render SubtaskPopup when showSubtaskPopup state is true */}
      {showSubtaskPopup && (
        <SubtaskPopup onClose={() => setShowSubtaskPopup(false)} onSave={handleAddSubtask} />
      )}
    </div>
  );
};

export default TodoApp;
