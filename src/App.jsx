import { useState, useEffect } from 'react'; //A React hook used to handle state in a functional component.
import Todo from './components/Todo'; //Imported from the Todo.jsx file. It is used to display each to-do item.
import './App.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [task, setTask] = useState(''); //A state variable to hold the current task input by the user.
  const [todos, setTodos] = useState([]); //A state variable to hold the list of to-do items.
  // The initial value is an empty array.
  //An array that stores each to-do item as an object. Each to-do has properties such as text (the task description) and done (a boolean indicating if the task is completed).
  const [error, setError] = useState(''); //A state variable to hold any error messages related to task input.
  // When component loads first time, it checks if there are any todos in local storage, if there it shows them using setTodos.
  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      console.log("Loaded from localStorage:", storedTodos);
      setTodos(storedTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
      setTodos([]);
    }
  }, []);

  // When todos state changes
  // This effect runs whenever the todos state changes (i.e updated add/edit/delete/done). It updates the local storage with the current todos array.
  useEffect(() => {
    if (todos.length > 0) {
      console.log("Saving to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTask = () => {
    //Validation: Check if the task is not empty before adding it to the list.
    if (task.trim() === '') {
      setError('Task cannot be empty!');
      return;
    }
    //setTodos is a function that updates the state of todos. Adds a new to-do object (with text from the input and done set to false) to the existing todos array using the spread operator
    setTodos([...todos, { text: task, done: false }]);
    setTask(''); //Resets the task input field after adding the to-do task.
    setError(''); //Resets the error message after a successful addition.
  };

  const toggleDone = (index) => { //toggle done function taking index as a input 
    const newTodos = [...todos]; //Creates a shallow copy of the current todos array.
    newTodos[index].done = !newTodos[index].done; //Toggles the done property of the to-do item at the specified index. newTodos[1] = { text: "Music", done: false } | If done is true, it will be set to false and vice versa.
    setTodos(newTodos);
  };
  const updateTask = (index, newText) => { //update task function taking index and newText as a input
    const updatedTodos = [...todos];  //Creates a shallow copy of the current todos array.
    updatedTodos[index].text = newText; //Updates the text of the to-do item at the specified index with the new text.
    // updatedTodos[1].text = "New Music" | This will update the text of the todo task at index 1 to "New Music"
    setTodos(updatedTodos); // Updates the state with the modified array.
    // setTodos([{ text: "New Music", done: false }, { text: "New Music", done: false }])
  };

  const deleteTask = (index) => {
    const newTodosAfterDelete = todos.filter((_, i) => i !== index);
    setTodos(newTodosAfterDelete);
    if (newTodosAfterDelete.length === 0) {
      localStorage.removeItem("todos");
      console.log("All todos deleted. LocalStorage cleared.");
    }
  };

  return (
    <div className="app-container">
      <h1>Tasks</h1>
      <div className="input-section">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className={error ? 'input-error' : ''} // Apply error class if there's an error
        />
        <button onClick={addTask}>Add</button>
      </div>
        {/* Check if error is not empty if not empty then add p */}
        {error && <p className='error-msg'>{error}</p>}
        <div className="todo-container">
      {Array.isArray(todos) && todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
      <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
    
  );

}

export default App;

//End of React application code