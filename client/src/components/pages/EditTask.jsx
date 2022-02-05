import React, {useEffect} from 'react';
import {useForm} from "../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../common/textField";
import Button from "../common/Button";
import SelectField from "../common/SelectField";
import {editTask, postNewTask} from "../../redux/reducers/tasksReducer";
import {useParams} from 'react-router-dom'
import {toast} from "react-toastify";

const EditTask = () => {
  const {id} = useParams()
  const isAdding = useSelector(state => state.tasks.isLoading.addTask)
  const isEditing = useSelector(state => state.tasks.isLoading.editTask)
  const lists = useSelector(state => state.lists.lists)
  const tasks = useSelector(state => state.tasks.tasks)

  const options = lists.map(list => ({label: list.name, value: list.id}))
  const status = [
    {label: 'План', value: "plan_tasks"},
    {label: 'В работе', value: "process_tasks"},
    {label: 'Готовые', value: "ready_tasks"}
  ]
  const {form, handleChange, changeAllForm} = useForm({
    listId: '',
    text: "",
    status: "",
  })

  useEffect(() => {
    if (id && tasks.length > 0) {
      const task = tasks.find(task => task.id === +id)
      changeAllForm([
        {name: 'listId', value: task.listId},
        {name: 'text', value: task.text},
        {name: 'status', value: task.status}])
    }
  }, [id, tasks])

  const handleResetForm = () => {
    changeAllForm([{name: 'listId', value: ''}, {name: 'text', value: ''}, {name: 'status', value: ''}])
  }
  const dispatch = useDispatch()

  const handleAddTask = () => {
    if (!form.text) {
      toast('Введите текст задачи')
    }
    if (form.text && form.listId) {
      const objTask = {
        listId: +form.listId,
        text: form.text,
        status: form.status
      }
      dispatch(postNewTask(objTask, handleResetForm))
    }
  }

  const handleEditTask = () => {
    if (form.text) {
      dispatch(editTask(+id, form))
    }
  }

  return (
    <div className="tasks__form">
      <h2 className="tasks__title">{id ? "Отредактируйте задачу" : 'Создайте новую задачу'}</h2>
      <div className="tasks__form-block">
        <TextField value={form.text} name="text" onChange={handleChange} placeholder="Текст задачи"/>
        <SelectField
          onChange={handleChange}
          name="listId"
          value={form.listId}
          options={options}
          defaultOption={"Категория"}
        />
        <SelectField
          onChange={handleChange}
          name="status"
          value={form.status}
          options={status}
          defaultOption={"Статус задачи"}
        />

        <Button onClick={handleResetForm} className="button button__gray" name="Очистить"/>
        {
          id ?
            <Button disabled={isEditing} onClick={handleEditTask} name={isEditing ? 'Изменение' : 'Изменить задачу'}/>
            : <Button disabled={isAdding} onClick={handleAddTask} name={isAdding ? 'Добавление' : 'Добавить задачу'}/>

        }
      </div>
    </div>
  );
};

export default EditTask;
