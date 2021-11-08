import {toast} from "react-toastify";
import {tasksAPI} from "../../api/reduxAPI";

const InitialState = {
    tasks: [],
    isLoading: {fetchTasks: false, addTask: false, removeTask: false, editTask: false, editAttitude: false },

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
            if (action.payload.listId){
                newTasks = state.tasks.filter(task => task.listId !== action.payload.listId)
            } else{
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
                    task.text = action.payload.text
                }
                return task
            })
            return {
                ...state,
                tasks: newObj
            }
        }
        case "EDIT_ATTITUDE_TASK": {
            const newObj = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    task.attitude = action.payload.attitude
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
    removeTask: (id, listId) => ({type: "REMOVE_TASK", payload: {id,listId}}),
    editNameTask: (id, text) => ({type: "EDIT_TASK", payload: {id, text}}),
    editAttitudeTask: (id, attitude) => ({type: "EDIT_ATTITUDE_TASK", payload: {id, attitude}}),
}

export const fetchTasks = () => (dispatch) => {
    dispatch(tasksActions.setLoading(true, "fetchTasks"))
    tasksAPI.getTasks().then(data => {
        dispatch(tasksActions.addTasks(data))
    }).catch(() => toast.error('Ошибка при загрузке задач'))
        .finally(() => dispatch(tasksActions.setLoading(false, "fetchTasks")))
}

export const postNewTask = (obj, callback) => (dispatch) => {
    dispatch(tasksActions.setLoading(true, "addTask"))
    tasksAPI.addTask(obj).then(data => {
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
export const editTaskName = (id, text) => (dispatch) => {
    dispatch(tasksActions.setLoading(true, "editTask"))
    tasksAPI.editTask(id, text).then((data) => {
        if(data === 200){
            dispatch(tasksActions.editNameTask(id, text))
        }
    }).catch(() => {
        toast.error('Ошибка при измении имени задачи')
    })
        .finally(() => {
            dispatch(tasksActions.setLoading(false, "editTask"))
            toast.info('Название задачи обновлено')
        })
}
export const editTaskAttitude = (id, attitude) => (dispatch) => {
    dispatch(tasksActions.setLoading(true, "editAttitude"))
    tasksAPI.editAttitudeTask(id, attitude).then((data) => {
        if(data === 200){
            dispatch(tasksActions.editAttitudeTask(id, attitude))
        }
    }).catch(() => {
        toast.error('Ошибка при измении статуса задачи')
    })
        .finally(() => {
            dispatch(tasksActions.setLoading(false, "editAttitude"))
            toast.info('Статус задачи обновлен')
        })
}
export const deleteTask = (id, listId) => (dispatch) => {
    dispatch(tasksActions.setLoading(true, "removeTask"))
    tasksAPI.removeTask(id, listId).then(() => {
        dispatch(tasksActions.removeTask(id, listId))
    }).catch(() => {
        id && toast.error('Ошибка при удалении задачи')
    })
        .finally(() => {
            dispatch(tasksActions.setLoading(false, "removeTask"))
            id && toast.info('Задача удалена')
        })
}
export default tasksReducer