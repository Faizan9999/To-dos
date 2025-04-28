import React, { useState } from 'react';
import './Todo.css';
import { toast } from 'react-toastify';
function Todo({ todo, index, toggleDone, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false); //This shows whether task is in editing mode or not | False: Normal Mode | True: Editing Mode 
  const [editedText, setEditedText] = useState(todo.text); //This stores text written in input feild | Initial value is the text of the todo task item
  const [disableAfterError, setDisableAfterError] = useState(false);
  const handleSave = () => {
    if (editedText.trim() === '') {
      toast.error("Task cannot be empty!");
      setDisableAfterError(true); 
      return;
    }
    updateTask(index, editedText); //function called clicks the "Save" button. It updates the task with the new text.
    setIsEditing(false); //Finishes the edit mode and sets isEditing to false.
    setDisableAfterError(false); 
  };
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(index)}
      />
      {/* Checkbox to mark task done */}
      {isEditing ? (
        <>
          {/* User types new text into Input box | When user types the text Onchange works and editedText is updated  */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => {
              setEditedText(e.target.value);
              if (e.target.value.trim() !== '') {
                setDisableAfterError(false); // Enable again when input becomes valid
              }
            }}
            onKeyDown={(e) => { //When user presses Enter key, handleSave function is called
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
          <button onClick={handleSave}
          disabled={disableAfterError}
          >Save</button>
        </>
      ) : (
        <>
          <span
            //onClick={() => toggleDone(index)}
            className={`todo-text ${todo.done ? 'done' : ''}`}
            title={todo.text}
            >
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {/* This makes isEditing as True and component is re-rendered and input box is visible in UI */}
        </>
      )}
      <button onClick={() => deleteTask(index)}>Delete</button>
    </div>
  );
};
export default Todo;
