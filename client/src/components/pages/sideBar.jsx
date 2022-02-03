import React from 'react';
import {AddCategory, List} from "../index";
import {colors} from "../constants/colors";
import imgList from "../../assets/img/list.svg";
import imgChart from "../../assets/img/line-chart.svg";
import imgTask from "../../assets/img/task.svg";

const SideBar = ({activeList, onChangeList, mergedData}) => {
    return (
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
            <List items={[
                {
                    id: 'task',
                    name: 'Добавить задачу',
                    icon: <img src={imgTask} alt="Task icon"/>
                }]}
                  activeList={activeList}
                  onClickCategory={onChangeList}
            />
        </div>
    );
};

export default SideBar;