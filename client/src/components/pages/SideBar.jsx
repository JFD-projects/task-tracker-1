import React from 'react';
import {AddCategory, List} from "../index";
import imgList from "../../assets/img/list.svg";
import imgChart from "../../assets/img/line-chart.svg";
import imgTask from "../../assets/img/task.svg";
import {useSelector} from "react-redux";
import {useMerger} from "../hooks/useMerger";
import {getUser} from "../../redux/reducers/authReducer";
import {SidebarProfile} from "../common/SidebarProfile";

const SideBar = () => {
  const activeList = useSelector(state => state.lists.activeList)
  const lists = useSelector(state => state.lists.lists)
  const tasks = useSelector(state => state.tasks.tasks)
  const mergedData = useMerger(lists, tasks, "tasks", "listId", "_id")
  const user = useSelector(getUser())

  return (
    <div className="todo__sidebar">
      <SidebarProfile user={user}/>

      <List items={[
        {
          _id: 'all_tasks',
          name: 'Все списки',
          icon: <img src={imgList} alt="List icon"/>
        }]}
            activeList={activeList}
      />
      <List items={mergedData}
            activeList={activeList}
            isRemovable/>
      <AddCategory/>
      <List items={[
        {
          _id: 'statistics',
          name: 'Статистика задач',
          icon: <img src={imgChart} alt="Chart icon"/>
        }]}
            activeList={activeList}
      />
      <List items={[
        {
          _id: 'task',
          name: 'Добавить задачу',
          icon: <img src={imgTask} alt="Task icon"/>
        }]}
            activeList={activeList}
      />
    </div>
  );
};

export default SideBar;