import {FaTimes} from 'react-icons/fa';


//state gets passed down, actions are passed up
//passing up the onclick event, 
const Task = ({task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red', cursor:'pointer'}} onClick={()=>onDelete(task.id)}/> </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;
