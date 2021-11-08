import React, {useEffect} from "react";
import imgList from "./assets/img/list.svg";
import {AddCategory, List, Tasks} from "./components";
import {Route, Switch, useHistory, useLocation} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Zoom} from "react-toastify";
import {fetchLists, listsActions} from "./redux/reducers/listsReducer";
import {useDispatch, useSelector} from "react-redux";
import {colors} from "./components/constants/colors"
import {fetchTasks} from "./redux/reducers/tasksReducer";
import {useMerger} from "./components/hooks/useMerger";

function App() {
    const dispatch = useDispatch()
    const activeList = useSelector(state => state.lists.activeList)
    const isLoading = useSelector(state => state.lists.isLoading.fetchLists)
    const lists = useSelector(state => state.lists.lists)
    const tasks = useSelector(state => state.tasks.tasks)

    const location = useLocation()
    const history = useHistory()

    const mergedData = useMerger(lists, tasks, "tasks", "listId", "id")

    useEffect(() => {
        dispatch(fetchLists())
        dispatch(fetchTasks())
        dispatch(listsActions.setActiveList({id: 'all_tasks'}))
    }, [])

    useEffect(() => {
        const listId = location.pathname.split('lists/')[1];
        if (listId) {
            const list = lists.find(list => list.id === Number(listId));
            list ? dispatch(listsActions.setActiveList(list))
                : history.push(`/`)
        } else {
            dispatch(listsActions.setActiveList({id: 'all_tasks'}))
        }
    }, [lists,location.pathname])

    const onChangeList = (item) => {
        if (item.id === 'all_tasks'){
            history.push(`/`)
        } else {
            history.push(`/lists/${item.id}`)
        }
    }
    return (
        <div className="todo">
            {isLoading
                ? <h1>Loading</h1>
                :
                <>
                    <div className="todo__sidebar">
                        <List items={[
                            {
                                id: 'all_tasks',
                                name: 'Все задачи',
                                icon: <img src={imgList} alt="List icon"/>
                            }]}
                              activeList={activeList}
                              onClickCategory={onChangeList}
                        />
                        <List items={mergedData}
                              onClickCategory={onChangeList}
                              activeList={activeList}
                              isRemovable/>
                        <AddCategory colors={colors}/>
                    </div>
                    <div className="todo__tasks">
                        <Switch>
                            <Route path="/lists/:id">
                                {
                                    !isLoading && activeList &&
                                    <Tasks tasks={tasks.filter(task => task.listId === activeList.id)}
                                           list={activeList}/>
                                }
                            </Route>
                            <Route path="/">
                                {
                                    mergedData && mergedData.map(list => (
                                        <Tasks key={list.id}
                                               withoutEmpty
                                               list={list}/>
                                    ))
                                }
                            </Route>
                            <Route path="*"><h2>Not Found</h2></Route>
                        </Switch>
                    </div>
                </>
            }
            <ToastContainer transition={Zoom} autoClose={1500}/>
        </div>
    );
}

export default App;
