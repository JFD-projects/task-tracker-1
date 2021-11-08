import React, {useState} from 'react';
import "./tasks.scss"
import editImg from "../../assets/img/edit.svg"
import AddTaskForm from "./addTaskForm";
import Task from "./Task";
import {Link} from "react-router-dom";
import {linksTasks} from "../constants/constants";
import {useDispatch} from "react-redux";
import {editListName} from "../../redux/reducers/listsReducer";

const Tasks = ({list, tasks, withoutEmpty}) => {
    const dispatch = useDispatch()
    const [activeLink, setActiveLink] = useState('plan_tasks')
    const listView = (tasks ? tasks : list.tasks).filter(task => task.attitude === activeLink)

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
           dispatch(editListName(list.id, newTitle))
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list?.color?.hex}} className="tasks__title">{list.name}
                    <img onClick={editTitle} src={editImg} alt="edit"/>
                </h2>
            </Link>
            <div className="tasks__nav">
                <ul className="tasks__nav-tabs">
                    {linksTasks.map(link => (
                        <li className={activeLink === link.id ? "active" : null}
                            onClick={()=>setActiveLink(link.id)}
                            key={link.id}>{link.name}</li>
                    ))}

                </ul>
            </div>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && list.tasks.length === 0
                    ? <h2>Задачи отсутствуют</h2>
                    : listView.map(task => (
                        <Task key={`task-${task.id}`}
                              {...task}
                              listId={list.id}/>
                        ))
                }
                <AddTaskForm key={list.id} activeLink={activeLink} list={list}/>
            </div>
        </div>
    );
};

export default Tasks;