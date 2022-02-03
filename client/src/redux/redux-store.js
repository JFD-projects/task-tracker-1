import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import listsReducer from "./reducers/listsReducer"
import tasksReducer from './reducers/tasksReducer'
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    lists: listsReducer,
    tasks: tasksReducer
})
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)))

window.store = store

export default store
