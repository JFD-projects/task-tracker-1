import React from 'react';
import "./tasks.scss"
import editImg from "../../assets/img/edit.svg"
import axios from "axios";
import AddTaskForm from "./addTaskForm";
import Task from "./Task";
import {Link} from "react-router-dom";

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty,onEditTask, onCompleteTasks, onRemoveTask}) => {
    const editTitle = ()=> {
        const newTitle = window.prompt('Название списка', list.name)
        newTitle && onEditTitle(newTitle, list.id)
        axios.patch('http://localhost:3001/lists/' + list.id, {
            name: newTitle
        }).catch(()=>{
            alert('Не удалось обновить название списка')
        })
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list.color.hex}} className="tasks__title">{list.name}
                    <img onClick={editTitle} src={editImg} alt="edit"></img>
                </h2>
            </Link>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && list.tasks.length === 0
                    ? <h2>Задачи отсутствуют</h2>
                    : list.tasks.map(task => (
                        <Task key={`task-${task.id}`}
                              {...task}
                              listId={list.id}
                              onCompleteTasks={onCompleteTasks}
                              onEdit={onEditTask}
                              onRemove={onRemoveTask}/>
                        ))
                }
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
};

export default Tasks;