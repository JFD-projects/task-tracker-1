import React, {useEffect} from 'react';
import {useForm} from "../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../common/TextField";
import Button from "../common/Button";
import SelectField from "../common/SelectField";
import {editTask, getMergedData, postNewTask} from "../../redux/reducers/tasksReducer";
import {useParams} from 'react-router-dom'
import {toast} from "react-toastify";
import {linksTasks} from "../constants/constants";
import localStorageService from "../../services/local.storage.service";

const EditTask = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const isAdding = useSelector(state => state.tasks.isLoadingTasks.addTask)
  const isEditing = useSelector(state => state.tasks.isLoadingTasks.editTask)
  const tasks = useSelector(state => state.tasks.tasks)
  const mergedData = useSelector(getMergedData())
  const userId = localStorageService.getLocalId()

  const categoryOptions = mergedData.map(data => ({label: data.name, value: data._id}))
  const statusOptions = linksTasks.map(link => ({label: link.name, value: link.id}))
  const initialForm = {
    listId: "",
    text: "",
    status: "",
  }
  const {form, handleChange, changeAllField} = useForm(initialForm)

  const fillFields = React.useCallback(() => {
    if (id && tasks) {
      const task = tasks.find(task => task._id === id)
      changeAllField({
        listId: task.listId,
        text: task.text,
        status: task.status,
      })
    }
  }, [id])

  useEffect(() => {
    fillFields()
    if (!id) {
      changeAllField(initialForm)
    }
  }, [id])

  const handleResetForm = () => {
    changeAllField(initialForm)
  }

  const handleAddTask = () => {
    if (!form.text) {
      return toast('Введите текст задачи')
    }
    if (!form.listId) {
      return toast('Добавьте категорию для задач')
    }
    if (!form.status) {
      return toast('Установите статус задачи')
    }

    const objTask = {
      listId: form.listId,
      text: form.text,
      status: form.status,
      userId
    }
    dispatch(postNewTask(objTask, handleResetForm))
  }

  const handleEditTask = () => {
    if (form.text) {
      dispatch(editTask(id, form))
    }
  }

  return (
    <div className="tasks__form">
      {!mergedData ?
        <h3>Отсутствуют категории для задачи</h3>
        : <>
          <h2 className="tasks__title">{id ? "Отредактируйте задачу" : 'Создайте новую задачу'}</h2>
          <div className="tasks__form-block">
            <TextField value={form.text} name="text" onChange={handleChange} placeholder="Текст задачи"/>
            <div className="tasks__form-row">
              <SelectField
                onChange={handleChange}
                name="listId"
                value={form.listId}
                options={categoryOptions}
                defaultOption={"Категория"}
              />
              <SelectField
                onChange={handleChange}
                name="status"
                value={form.status}
                options={statusOptions}
                defaultOption={"Статус задачи"}
              />
            </div>
            <div className="tasks__form-row">
              {
                id ?
                  <Button disabled={isEditing} onClick={handleEditTask}
                          name={isEditing ? 'Изменение' : 'Изменить задачу'}/>
                  : <Button disabled={isAdding} onClick={handleAddTask}
                            name={isAdding ? 'Добавление' : 'Добавить задачу'}/>
              }
              <Button onClick={handleResetForm} className="button button__gray" name="Очистить"/>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default EditTask;
