import React from 'react';
import '../css/Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let task = this.props.task;
        return(
            <div className='taskContent'>
                <span className='taskDesc' onClick={this.props.editTask}>{task.desc}</span>
                <span className='taskStatus' onClick={this.props.editTask}>{task.status}</span>
                <span className='taskPriority' onClick={this.props.editTask}>{task.priority}</span>
                <span className='taskEndDate' onClick={this.props.editTask}>{task.endDate}</span>
                <span className='taskFactEndDate' onClick={this.props.editTask}>{task.factEndDate}</span>
                <span className='taskDelete' onClick={this.props.deleteTask}>Удалить</span>
            </div>
        );
    }
};

export default Task;