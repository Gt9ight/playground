import React, { useEffect, useState } from 'react';
import { db } from './utilis/Firebase';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import './todolist.css'
const TodoList = () => {
  const [todosFromFirestore, setTodosFromFirestore] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showTodosForCategory, setShowTodosForCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'objectives'));
        const fetchedTodos = [];
        querySnapshot.forEach((doc) => {
          fetchedTodos.push({ id: doc.id, ...doc.data() });
        });
        setTodosFromFirestore(fetchedTodos);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchData();
  }, []);


  // Function to handle marking a todo as done
  const handleTodoDone = async (todoId, isDone) => {
    try {
      const todoRef = doc(db, 'objectives', todoId);
      await updateDoc(todoRef, {
        done: isDone,
      });
      // Refresh the todos list after update
      const updatedTodos = todosFromFirestore.map((todo) =>
        todo.id === todoId ? { ...todo, done: isDone } : todo
      );
      setTodosFromFirestore(updatedTodos);
    } catch (error) {
      console.error('Error marking todo as done: ', error);
    }
  };

  // Organize todos by category
  const todosByCategory = {};
  todosFromFirestore.forEach((todo) => {
    if (!todosByCategory[todo.category]) {
      todosByCategory[todo.category] = [];
    }
    todosByCategory[todo.category].push(todo);
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Calculate progress for each category
  const getCategoryProgress = (category) => {
    const totalTodos = todosByCategory[category]?.length || 0;
    const completedTodos = todosByCategory[category]?.filter((todo) => todo.done).length || 0;

    return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
  };

  const toggleTodosForCategory = (category) => {
    if (showTodosForCategory === category) {
      setShowTodosForCategory(null);
    } else {
      setShowTodosForCategory(category);
    }
  };

  return (
    <div>
      <h2>Todos from Firestore - Organized by Category</h2>
      <div className="category-cards">
        {Object.keys(todosByCategory).map((category) => (
          <div key={category} className="category-card">
            <div
              onClick={() => toggleTodosForCategory(category)}
              className={`category-header ${showTodosForCategory === category ? 'active' : ''}`}
            >
              <h3>{category}</h3>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${getCategoryProgress(category)}%` }}
                ></div>
              </div>
              <p>{getCategoryProgress(category).toFixed(2)}% Complete</p>
            </div>
            {showTodosForCategory === category && (
              <ul className="todo-list">
                {todosByCategory[category].map((todo) => (
                  <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.done || false}
                      onChange={(e) => handleTodoDone(todo.id, e.target.checked)}
                    />
                    <strong>Unit Number:</strong> {todo.text}
                    {/* Render other properties here */}
                    <ul>
                      {todo.subtasks &&
                        todo.subtasks.length > 0 &&
                        todo.subtasks.map((subtask, index) => (
                          <li key={index}>
                            <strong>Position:</strong> {subtask.position}, <strong>Specifics:</strong>{' '}
                            {subtask.specifics}, <strong>Tread Depth:</strong> {subtask.treadDepth}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
