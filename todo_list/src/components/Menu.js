import React from 'react';
import '../css/Menu.css';
import PopUp from './PopUp';
import Task from './Task';

const statuses = {
    new: 'Новый',
    inProgress: 'В работе',
    done: 'Завершено'
};

const priorities = {
    low: 'Низкий',
    avg: 'Средний',
    high: 'Высокий'
};

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: [
                {id: 0, desc: 'task1', status: statuses.new, priority: priorities.low, endDate: '1.1.2019', factEndDate: '-'},
                {id: 1, desc: 'task2', status: statuses.inProgress, priority: priorities.low, endDate: '1.1.2019', factEndDate: '-'},
                {id: 2, desc: 'task3', status: statuses.done, priority: priorities.low, endDate: '1.1.2019', factEndDate: '1.1.2019'}
            ],
            popupMenuSeen: false,
            editingTask: {}
        };
        this.togglePopupMenu = this.togglePopupMenu.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.getPopupMenu = this.getPopupMenu.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        // this.onLabelStatusClick = this.onLabelStatusClick.bind(this);
    }
    
    togglePopupMenu(editingTask) {
        this.setState({editingTask: editingTask});
        this.setState({popupMenuSeen: !this.state.popupMenuSeen});
    }

    addTask(task) {
        let { tasks } = this.state;
        task.id = tasks.length !== 0 ? tasks.length : 0;
        task.factEndDate = '-';
        tasks.push(task);
        this.setState({tasks: tasks});
    }

    editTask(task) {
        let {tasks} = this.state;
        tasks[task.id] = task;
        this.setState({tasks: tasks});
    }

    deleteTask(task) {
        let {tasks} = this.state;
        const index = tasks.indexOf(task);
        tasks.forEach(task => {
            if (task.id > index) {
                task.id = task.id - 1;
            }
        });
        tasks.splice(index, 1);
        this.setState(tasks);
    }

    getPopupMenu() {
        let {editingTask} = this.state;
        if (editingTask == null) {
            return <PopUp toggle={this.togglePopupMenu} task={null} addTask={this.addTask}></PopUp>;
        }
        else {
            return <PopUp toggle={this.togglePopupMenu} task={editingTask} editTask={this.editTask}></PopUp>;
        }
    }

    // onLabelStatusClick(event) {
    //     let {tasks} = this.state;
    //     let newTasks = tasks.filter(task => task.status == statuses.new);
    //     let inProgressTasks = tasks.filter(task => task.status == statuses.inProgress);
    //     let doneTasks = tasks.filter(task => task.status == statuses.done);
    //     switch(event.target.value) {
    //         case statuses.new:
                
    //             break;
    //     }
    // }

    render() {
        const { tasks } = this.state;
        return (
            <div>
                <div id='menu'>
                    <button id='buttonAddTask' onClick={() => this.togglePopupMenu(null)}>Добавить задачу</button>
                    {this.state.popupMenuSeen ? this.getPopupMenu() : null}
                    <input id='inputSerch' type='text' placeholder='Поиск'></input>
                    <label className='menuLabels'>Всего - {tasks.length}</label>
                    <label className='menuLabels'>Новых - {tasks.filter(task => task.status == statuses['new']).length}</label>
                    <label className='menuLabels'>В работе - {tasks.filter(task => task.status == statuses['inProgress']).length}</label>
                    <label className='menuLabels'>Завершено - {tasks.filter(task => task.status == statuses['done']).length}</label>
                </div>
                {tasks.map(task => 
                    <Task task={task} key={task.id} 
                        editTask={() => this.togglePopupMenu(task)} 
                        deleteTask={() => this.deleteTask(task)}></Task>)}
            </div>
        );

    }
}

export default Menu;