import React, {useEffect} from "react";
import imgList from "./assets/img/list.svg";
import imgChart from "./assets/img/line-chart.svg";
import {AddCategory, List, Tasks} from "./components";
import {Route, Switch, useHistory, useLocation} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Zoom} from "react-toastify";
import {fetchLists, listsActions} from "./redux/reducers/listsReducer";
import {useDispatch, useSelector} from "react-redux";
import {colors} from "./components/constants/colors"
import {fetchTasks} from "./redux/reducers/tasksReducer";
import {useMerger} from "./components/hooks/useMerger";
import Loader from "react-loader-spinner";
import Statistics from "./components/statistics/statistics";

function App() {
  const dispatch = useDispatch()
  const activeList = useSelector(state => state.lists.activeList)
  const isLoadingLists = useSelector(state => state.lists.isLoading.fetchLists)
  const isLoadingTasks = useSelector(state => state.lists.isLoading.fetchTasks)
  const lists = useSelector(state => state.lists.lists)
  const tasks = useSelector(state => state.tasks.tasks)

  const location = useLocation()
  const history = useHistory()

  const mergedData = useMerger(lists, tasks, "tasks", "listId", "id")
  useEffect(() => {
    dispatch(fetchLists())
    dispatch(fetchTasks())
    dispatch(listsActions.setActiveList({id: 'all_tasks'}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const page = location.pathname.split("/")
    if (page[1] === 'statistics') {
      dispatch(listsActions.setActiveList({id: 'statistics'}))
      return
    }
    if (page[1] === 'lists') {
      const list = lists.find(list => list.id === +page[2]);
      list ? dispatch(listsActions.setActiveList(list)) : history.push(`/`)
    } else {
      dispatch(listsActions.setActiveList({id: 'all_tasks'}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists, location.pathname])

  const onChangeList = (item) => {
    if (item.id === 'all_tasks') history.push(`/`)
    if (item.id === 'statistics') history.push(`/statistics`)
    else history.push(`/lists/${item.id}`)
  }
  return (
    <div className="todo">
      {isLoadingLists ? <Loader className="todo__loader" type="Bars" color="#00BFFF" height={80} width={80}/> :
        <>
          <div className="todo__sidebar">
            <List items={[
              {
                id: 'all_tasks',
                name: 'Все списки',
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
            <List items={[
              {
                id: 'statistics',
                name: 'Статистика задач',
                icon: <img src={imgChart} alt="Chart icon"/>
              }]}
                  activeList={activeList}
                  onClickCategory={onChangeList}
            />
          </div>
          <div className="todo__tasks">
            <Switch>
              <Route path="/lists/:id">
                {isLoadingTasks ?
                  <Loader className="todo__loader" type="ThreeDots" color="#00BFFF" height={80} width={80}/>
                  : activeList &&
                  <Tasks tasks={tasks.filter(task => task.listId === activeList.id)}
                         withNavigate
                         list={activeList}/>
                }
              </Route>
              <Route path="/statistics">
                <Statistics info={mergedData}/>
              </Route>
              <Route path="/">
                {isLoadingTasks ?
                  <Loader className="todo__loader" type="ThreeDots" color="#00BFFF" height={80} width={80}/>
                  :
                  mergedData && mergedData.map(list => (
                    <Tasks key={list.id}
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
