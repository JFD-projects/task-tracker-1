import React, {useState} from 'react';
import addImg from "../../assets/img/add.svg";
import {useDispatch, useSelector} from "react-redux";
import {postNewTask} from "../../redux/reducers/tasksReducer";

const AddTaskForm = ({activeLink, list}) => {
    const [taskValue, setTaskValue] = useState('')
    const [formVisibility, setFormVisibility] = useState(false)
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.tasks.isLoading.addTask)
    const toggleVisibility = () => {
        setFormVisibility(!formVisibility)
        setTaskValue('')
    }
    const addTask = () => {
        if(taskValue){
            const objTask = {
                listId: list.id,
                text: taskValue,
                attitude: activeLink
            }
            dispatch(postNewTask(objTask, toggleVisibility))
        }
    }
    return (
        <div className="tasks__form">
            {
                formVisibility

                    ? <div className="tasks__form-block">
                        <input className="field"
                               type="text"
                               value={taskValue}
                               onChange={(e)=>setTaskValue(e.target.value)}
                               placeholder="Текст задачи"/>
                        <button disabled={isLoading} onClick={addTask} className="button">{isLoading ? 'Добавление' : 'Добавить задачу'}</button>
                        <button onClick={toggleVisibility} className="button button__gray">Отмена</button>
                    </div>
                    : <div onClick={toggleVisibility} className="tasks__form-new">

                        <img src={addImg} alt="add"/>
                        <span>Новая задача</span>
                    </div>
            }
        </div>
    );
};

export default AddTaskForm;