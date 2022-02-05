import React from "react";
import '../../css/list.scss';
import classNames from "classnames";
import Badge from "../common/Badge";
import removeImg from '../../assets/img/remove.svg'
import {useDispatch, useSelector} from "react-redux";
import {deleteList} from "../../redux/reducers/listsReducer";
import {deleteTask} from "../../redux/reducers/tasksReducer";
import {submit} from "../utils/confirm";
import {Link} from "react-router-dom";
import {getLink} from "../utils/getLink";

const List = ({items, isRemovable, activeList, onClick, onClickCategory}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.lists.isLoading.removeList)
  const tasks = useSelector(state => state.tasks.tasks)

  const onClickItem = (item) => {
    onClickCategory(item)
  }

  const removeList = (e, item) => {
    e.stopPropagation()
    submit('Вы уверены?', confirmRemoveList.bind(this, item.id))
  }
  const confirmRemoveList = (id) => {
    const newTasks = tasks.filter(task => task.listId !== id)
    onClickCategory({id: 'all_tasks'})
    newTasks && dispatch(deleteTask(null, newTasks))
    dispatch(deleteList(id))
  }

  return (
    <ul onClick={onClick} className="list">
      {items &&
      items.map((item, index) => (
        <Link className="list__link" key={`list-${item.id}-${index}`} to={getLink(item.id)}>
          <li
            onClick={onClickCategory ? () => onClickItem(item) : null}
            className={classNames(item.className, {'active': activeList && item.id === activeList.id})}>
            <i>
              {
                item.icon ? (item.icon) :
                  (<Badge color={item.color}/>)
              }
            </i>
            <span>{item.name}</span>
            {item.tasks && item.tasks.length > 0 && <p>({item.tasks.length})</p>}
            {isRemovable &&
            <img onClick={isLoading ? null : (e) => removeList(e, item)} className="list__remove-icon"
                 src={removeImg}
                 alt="Remove category"/>
            }
          </li>
        </Link>

      ))
      }
    </ul>
  );
};

export default List;
