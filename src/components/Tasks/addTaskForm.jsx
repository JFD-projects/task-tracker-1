import React, {useState} from 'react';
import addImg from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [taskValue, setTaskValue] = useState('')
    const [formVisibility, setFormVisibility] = useState(false)
    const [isSending, setIsSending] =useState(false)

    const toggleVisibility = () => {
        setFormVisibility(!formVisibility)
        setTaskValue('')
    }
    const addTask = ()=>{
        const objTask = {
            listId: list.id,
            text: taskValue,
            completed: false
        }
        setIsSending(true)
        axios.post('http://localhost:3001/tasks', objTask).then(({data}) => {
            onAddTask(data)
            toggleVisibility()
        }).catch(() => alert('Ошибка при добавлении задачи'))
            .finally(() => setIsSending(false))
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
                        <button disabled={isSending} onClick={addTask} className="button">{isSending ? 'Добавление' : 'Добавить задачу'}</button>
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