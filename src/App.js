import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  /**
 * 
 * * Obtain tasks from endpoint, parse as JSON.
 * ! Effect reloads again when dependency is changed.
 * 
 */
useEffect(() => {

  const getTasks = async () => {
    const taskFromServer = await fetchTasks();
    setTasks(taskFromServer)
  }

  getTasks();
},[])

/**
 * ! Helper Function to Obtain [] of tasks
 * @returns Promise Array
 */
const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json() 
    return data;
  }

  /**
   * 
   * @param {id}  
   * @returns Promise 
   */
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json() 
    console.log(data);
    return data;
  }

/**
 * * Handles Adding a Task
 * ? Sets task with hooks
 * ! Stringify(JSON) sending & parse JSON recieving
 * @param {task} 
 * 
 */
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();
  setTasks([...tasks, data])


  // const id = Math.floor(Math.random() * 10000) + 1;
  // console.log(id);
  // const newTask = {id,...task}
  // setTasks([...tasks, newTask]);

}

/**
 * * Deletes specific Task
 * @param {id} 
 * ? fetch with DELETE method
 * ! Filter [] method
 */
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    //only show tasks that don't have this id..
      setTasks(tasks.filter((task)=>task.id !== id))
  }

  /**
   * * Toggles reminder 
   * @param {id}
   * ? Modify & Set task reminder to opposite value
   * ! 
   */
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return ( 
    <Router>
    <div className="container">
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/> 
     
     <Route path='/' exact render={(props) => <>
     
     {showAddTask && <AddTask onAdd={addTask}/>}
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to Show'}
     
      </>}/>
     <Route path='/about' component = {About}/>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
