 import Task from './Task';


/**
 * ! Creating task lists with destructured task object 
 * * Each list item needs a unique ID
 * ? Example: {Pokemons.map((pokemon) => ())}
 */

 const Tasks = ({tasks, onDelete, onToggle}) => {
     
    return (
        
        <>
            {tasks.map((task) => 
            (<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>)
            )}

        </>
    )
}


export default Tasks

