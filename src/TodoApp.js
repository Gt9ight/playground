import React, { useState } from 'react';
import './todo.css'
import SubtaskForm from './SubtaskForm';
import { createFleetDatabase } from './utilis/Firebase';





  const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
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

  const handleAddSubtask = ({ position, specifics, treadDepth }) => {
    if (position.trim() !== '' || specifics.trim() !== '' || treadDepth.trim() !== '') {
      const updatedTodos = [...todos];
      const subtask = {
        position: position.trim(),
        specifics: specifics.trim(),
        treadDepth: treadDepth.trim(),
      };
      updatedTodos[currentTodoIndex].subtasks.push(subtask);
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

  const submitList = () => {
    if (todos.length > 0) {
      createFleetDatabase('objectives', todos);
       setTodos([]);
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
      <h2>Customer: {selectedCategory}</h2>
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
              <li key={index} className='todo-card'>
                <strong>Unit Number:</strong>{todo.text}
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
                      <strong>Position:</strong> {subtask.position}, <strong>Specifics:</strong> {subtask.specifics}, <strong>Tread Depth:</strong> {subtask.treadDepth}
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
        <>
          <div className="overlay" onClick={() => setShowSubtaskPopup(false)} />
          <div className="subtask-popup">
            <SubtaskForm onClose={() => setShowSubtaskPopup(false)} onSave={handleAddSubtask} />
          </div>
        </>
      )}
      <button onClick={submitList}>submit</button>


    </div>
  );
};

export default TodoApp;