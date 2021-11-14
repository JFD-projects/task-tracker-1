import React, {useState} from 'react';
import addImg from "../../assets/img/add.svg";
import {useDispatch, useSelector} from "react-redux";
import {postNewTask} from "../../redux/reducers/tasksReducer";
import Button from "../common/Button";
import {useForm} from "../hooks/useForm";
import TextField from "../common/textField";

const AddTaskForm = ({activeLink, list}) => {
    const [formVisibility, setFormVisibility] = useState(false)
    const {form, handleChange} = useForm()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.tasks.isLoading.addTask)
    const toggleVisibility = () => {
        setFormVisibility(!formVisibility)
        handleChange({name: "taskName", value: ''})
    }

    const addTask = () => {
        if(form.taskName){
            const objTask = {
                listId: list.id,
                text: form.taskName,
                attitude: activeLink
            }
            dispatch(postNewTask(objTask, toggleVisibility))
        }
    }
    return (
        <div className="tasks__form">
            {formVisibility
                ? <div className="tasks__form-block">
                    <TextField value={form.taskName} name="taskName" onChange={handleChange} placeholder="Текст задачи"/>
                    <Button disabled={isLoading} onClick={addTask} name={isLoading ? 'Добавление' : 'Добавить задачу'}/>
                    <Button onClick={toggleVisibility} className="button button__gray" name="Отмена"/>
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