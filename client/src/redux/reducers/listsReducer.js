import {toast} from "react-toastify";
import {listsService} from "../../services/list.service";
import {deleteListTasks} from "./tasksReducer";

const InitialState = {
  lists: [],
  isLoading: {
    fetchLists: false,
    addList: false,
    removeList: false,
    editNameList: false
  },
  activeList: {}
}

const listsReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "FETCH_LISTS": {
      return {
        ...state,
        lists: [...action.payload]
      }
    }
    case "ADD_NEW_LISTS": {
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    }
    case "REMOVE_LIST": {
      const newList = state.lists.filter(list => list._id !== action.payload)
      return {
        ...state,
        lists: newList
      }
    }
    case "EDIT_LIST": {
      const newObj = state.lists.map(list => {
        if (list._id === action.payload.id) {
          list.name = action.payload.name
        }
        return list
      })
      return {
        ...state,
        lists: newObj
      }
    }
    case 'SET_LOADING': {
      const newValue = {[action.payload.field]: action.payload.val}
      return {
        ...state,
        isLoading: {...state.isLoading, ...newValue}
      }
    }
    case 'SET_ACTIVE_LIST':
      return {
        ...state,
        activeList: action.payload
      }
    case 'RESET_LIST_DATA':
      return {
        ...InitialState
      }
    default:
      return state;
  }
}

export const listsActions = {
  addLists: (data) => ({type: "FETCH_LISTS", payload: data}),
  addNewList: (val) => ({type: "ADD_NEW_LISTS", payload: val}),
  editNameList: (id, name) => ({type: "EDIT_LIST", payload: {id, name}}),
  removeList: (val) => ({type: "REMOVE_LIST", payload: val}),
  setLoading: (val, field) => ({type: "SET_LOADING", payload: {val, field}}),
  setActiveList: (obj) => ({type: "SET_ACTIVE_LIST", payload: obj}),
  resetData: () => ({type: "RESET_LIST_DATA"})
}

export const fetchLists = () => (dispatch) => {
  dispatch(listsActions.setLoading(true, "fetchLists"))
  listsService.getLists().then(data => {
    dispatch(listsActions.addLists(data))
  }).catch(() => toast.error('Ошибка при загрузке списков'))
    .finally(() => dispatch(listsActions.setLoading(false, "fetchLists")))
}

export const postNewList = (newList, callback) => (dispatch) => {
  dispatch(listsActions.setLoading(true, "addList"))
  listsService.addList(newList).then(data => {
    dispatch(listsActions.addNewList(data))
    toast.info('Список добавлен')
  }).catch(() => {
    toast.error('Ошибка при добавлении списка')
    callback()
  })
    .finally(() => {
      dispatch(listsActions.setLoading(false, "addList"))
      callback()
    })
}
export const editListName = (id, name, callback) => (dispatch) => {
  dispatch(listsActions.setLoading(true, "editNameList"))
  listsService.editTitle(id, name).then((data) => {
    if (data) {
      dispatch(listsActions.editNameList(id, name))
      dispatch(listsActions.setActiveList(data))
      toast.info('Название списка обновлено')
      callback()
    }
  }).catch(() => {
    toast.error('Ошибка при измении имени списка')
  })
    .finally(() => {
      dispatch(listsActions.setLoading(false, "editNameList"))
    })
}

export const deleteList = (id) => (dispatch) => {
  dispatch(listsActions.setLoading(true, "removeList"))
  listsService.removeList(id).then((res) => {
    if (res.status === 200) {
      dispatch(listsActions.removeList(id))
      deleteListTasks(id)
      toast.info('Список удален')
    }
  }).catch(() => {
    toast.error('Ошибка при удалении списка')
  })
    .finally(() => {
      dispatch(listsActions.setLoading(false, "removeList"))
    })
}

export const removeListsData = () => dispatch => {
  dispatch(listsActions.resetData())
}

export default listsReducer
