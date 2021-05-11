
 /**
  * ? Shift + Option + Down 
  * ? Retrieve props destructured
  * * Use location for logic
  * * Conditional Rendering 
  */

import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import Button from './Button';

 const Header = ({title, onAdd, showAdd}) => {
 
 const location = useLocation()
    return (
        <div>
            <header className="header">
                <h1>{title}</h1>
                {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick = {onAdd}/>)}
                
            </header>
            
        </div>
    )
}



//Default values for props
Header.defaultProps = {
    title: 'Task Tracker',
}

//Type checking property inputs
Header.propTypes = {
    title: PropTypes.string
}

// headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header