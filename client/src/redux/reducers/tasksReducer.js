import {toast} from "react-toastify";
import {tasksService} from "../../services/task.service";

const InitialState = {
  tasks: [],
  isLoadingTasks: {fetchTasks: false, addTask: false, removeTask: false, editTask: false},
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
      const newTasks = state.tasks.filter(task => task._id !== action.payload)
      return {
        ...state,
        tasks: newTasks
      }
    }
    case "REMOVE_LIST_TASK": {
      const newTasks = state.tasks.filter(task => task.listId !== action.payload)
      return {
        ...state,
        tasks: newTasks
      }
    }
    case "EDIT_TASK": {
      const newObj = state.tasks.map(task => {
        if (task._id === action.payload.id) {
          return action.payload.data
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
        isLoadingTasks: {...state.isLoadingTasks, ...newValue}
      }
    }
    case 'RESET_TASK_DATA':
      return {
        ...InitialState
      }
    default:
      return state;
  }
}

export const tasksActions = {
  addTasks: (data) => ({type: "FETCH_TASKS", payload: data}),
  setLoading: (val, field) => ({type: "SET_LOADING", payload: {val, field}}),
  addNewTask: (task) => ({type: "ADD_NEW_TASK", payload: task}),
  removeTask: (id) => ({type: "REMOVE_TASK", payload: id}),
  removeListTasks: (id) => ({type: "REMOVE_LIST_TASK", payload: id}),
  editTask: (id, data) => ({type: "EDIT_TASK", payload: {id, data} }),
  resetData: () => ({type: "RESET_TASK_DATA"})
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
    toast.info('Задача добавлена')
  }).catch(() => {
    toast.error('Ошибка при добавлении задачи')
    callback()
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "addTask"))
      callback()
    })
}
export const editTask = (id, obj) => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "editTask"))
  tasksService.editTask(id, obj).then((data) => {
    if (data) {
      dispatch(tasksActions.editTask(id, data))
      toast.info('Задача обновлена')
    }
  }).catch((e) => {
    if (e.message) {
      toast.error('Ошибка при измении задачи')
    }
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "editTask"))
    })
}

export const deleteTask = (id) => (dispatch) => {
  dispatch(tasksActions.setLoading(true, "removeTask"))
  tasksService.removeTask(id).then(() => {
    dispatch(tasksActions.removeTask(id))
    toast.info('Задача удалена')
  }).catch(() => {
    toast.error('Ошибка при удалении задачи')
  })
    .finally(() => {
      dispatch(tasksActions.setLoading(false, "removeTask"))
    })
}
export const deleteListTasks = (id) => (dispatch) => {
  dispatch(tasksActions.removeListTasks(id))
}

export const removeTasksData = () => dispatch => {
  dispatch(tasksActions.resetData())
}

export const getMergedData = () => state => {
  return state.lists.lists.map((list) => ({
   ...list,
   tasks: state.tasks.tasks.filter(task => task.listId === list._id)
 }))
}

export default tasksReducer
