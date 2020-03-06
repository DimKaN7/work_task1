import React from "react";
import DatePicker from 'react-date-picker';
import '../css/PopUp.css';

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

class PopUp extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.task == null) {
            this.state = { task : {
                    id: '', 
                    desc: '', 
                    status: statuses['new'], 
                    priority: priorities['low'], 
                    endDate: '', 
                    factEndDate: ''
                },
                editingTask: false,
                date: new Date()
            };
        }
        else {
            this.state = {task: this.props.task, editingTask: true, date: ''};
        }

        this.closeClick = this.closeClick.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.onDescriptionInputChange = this.onDescriptionInputChange.bind(this);
        this.onSelectPriorityChange = this.onSelectPriorityChange.bind(this);
        this.onSelectStatusChange = this.onSelectStatusChange.bind(this);
        this.onDatePickerChange = this.onDatePickerChange.bind(this);
        this.dateToString = this.dateToString.bind(this);
        this.stringToDate = this.stringToDate.bind(this);
    }

    closeClick() {
        this.props.toggle();
    }

    onDescriptionInputChange(event) {
        let {task} = this.state;
        task['desc'] = event.target.value;
        this.setState(task);
    }

    onSelectPriorityChange(event) {
        let {task} = this.state;
        task.priority = event.target.value;
        this.setState(task);
    }

    onSelectStatusChange(event) {
        let {task} = this.state;
        task.status = event.target.value;
        this.setState(task);
    }

    onDatePickerChange(date) {
        this.state.date = date;
        this.setState({date: date});
    }

    saveTask() {
        const {task} = this.state; 
        const {editingTask} = this.state;
        if (task.status == statuses.done) {
            task.factEndDate = this.dateToString(new Date());
            this.setState({task: task});
        }
        else {
            task.factEndDate = '-';
        }
        if (editingTask) {
            this.props.editTask(task);
        } else {
            this.props.addTask(task);
        }
        this.props.toggle();
    }

    dateToString(date) {
        let dateToSave = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        return dateToSave;
    }

    stringToDate(event) {
        if (this.state.editingTask) {
            let {date} = this.state;
            let {endDate} = this.state.task;
            date = new Date(endDate.split('.')[2], endDate.split('.')[1] - 1, endDate.split('.')[0]);
            this.setState({date: date});
        }
    }

    render() {
        let {task} = this.state;
        return (
            <div id="modal" onMouseEnter={this.stringToDate}>
                <div id="modalContent">
                    <span id="close" onClick={this.closeClick}>&times;</span>
                    <h1>Создание/редактирование задачи</h1>
                    <div id='firstBlock'>
                        <label>Описание:</label>
                        <input type='text' id='descriptionInput' value={task.desc} onChange={this.onDescriptionInputChange} disabled={task.status == statuses.done ? true : false}/>
                    </div>
                    <div id='secondBlock'>
                        <label>Приоритет:</label>
                        <select id='selectPriority' value={task.priority} onChange={this.onSelectPriorityChange} disabled={task.status == statuses.done ? true : false}>
                            <option>{priorities.low}</option>
                            <option>{priorities.avg}</option>
                            <option>{priorities.high}</option>
                        </select>
                        <label>Статус:</label>
                        <select id='selectStatus' value={task.status} onChange={this.onSelectStatusChange} disabled={(this.state.editingTask ? false : true) || (task.status == statuses.done ? true : false)}>
                            <option>{statuses.new}</option>
                            <option>{statuses.inProgress}</option>
                            <option>{statuses.done}</option>
                        </select>
                    </div>
                    <div id='thirdBlock'>
                        <label>Крайний срок:</label>
                        {/* <input type='text' id='endDateInput' value={task.endDate} onChange={this.onEndDateInputChange} onClick={this.onEndDateInputClick}/> */}
                        <DatePicker id='datePicker' value={this.state.date} onChange={this.onDatePickerChange} disabled={task.status == statuses.done ? true : false}></DatePicker>
                    </div>
                    <button id='buttonSaveTask' onClick={this.saveTask}>Сохранить</button>
                </div>
            </div>
        );
    }
}

export default PopUp;