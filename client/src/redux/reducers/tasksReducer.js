import {toast} from "react-toastify";
import {tasksService} from "../../services/task.service";

const InitialState = {
  tasks: [],
  isLoading: {fetchTasks: false, addTask: false, removeTask: false, editTask: false},
}

const tasksReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "FETCH_TASKS": {
      return {
        ...state,
        tasks: [...action.payload]
      }
    }
    case "ADD_NEW_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    }
    case "REMOVE_TASK": {
      let newTasks
      if (action.payload.newTasks) {
        newTasks = action.payload.newTasks
      } else {
        newTasks = state.tasks.filter(task => task.id !== action.payload.id)
      }
      return {
        ...state,
        tasks: newTasks
      }
    }
    case "EDIT_TASK": {
      const newObj = state.tasks.map(task => {
        if (task.id === action.payload.id) {
          task.text = action.payload.obj.text
          task.listId = action.payload.obj.listId
          task.status = action.payload.obj.status
        }
        return task
      })
      return {
        ...state,
        tasks: newObj
      }
    }
    case 'SET_LOADING': {
      const newValue = {[action.payload.field]: action.payload.val}
      return {
        ...state,
        isLoading: {...state.isLoading, ...newValue}
      }
    }
    default:
      return state;
  }
}

export const tasksActions = {
  addTasks: (data) => ({type: "FETCH_TASKS", payload: data}),
  setLoading: (val, field) => ({type: "SET_LOADING", payload: {val, field}}),
  addNewTask: (task) => ({type: "ADD_NEW_TASK", payload: task}),
  removeTask: (id, newTasks) => ({type: "REMOVE_TASK", payload: {id, newTasks}}),
  editTask: (id, obj) => ({type: "EDIT_TASK", payload: {id, obj} }),
}

export const fetchTasks = () => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "fetchTasks"))
  tasksService.getTasks().then(data => {
    dispatch(tasksActions.addTasks(data))
  }).catch(() => toast.error('Ошибка при загрузке задач'))
    .finally(() => dispatch(tasksActions.setLoading(false, "fetchTasks")))
}

export const postNewTask = (obj, callback) => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "addTask"))
  tasksService.addTask(obj).then(data => {
    dispatch(tasksActions.addNewTask(data))
  }).catch(() => {
    toast.error('Ошибка при добавлении задачи')
    callback()
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "addTask"))
      toast.info('Задача добавлена')
      callback()
    })
}
export const editTask = (id, obj) => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "editTask"))
  tasksService.editTask(id, obj).then((data) => {
    if (data === 200) {
      dispatch(tasksActions.editTask(id, obj))
    }
  }).catch(() => {
    toast.error('Ошибка при измении задачи')
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "editTask"))
      toast.info('Задача обновлена')
    })
}

export const deleteTask = (id, newTasks) => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "removeTask"))
  newTasks && dispatch(tasksActions.removeTask(id, newTasks))
  tasksService.removeTask(id, newTasks).then(() => {
    dispatch(tasksActions.removeTask(id, newTasks))
  }).catch(() => {
    id && toast.error('Ошибка при удалении задачи')
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "removeTask"))
      id && toast.info('Задача удалена')
    })
}
export default tasksReducer
