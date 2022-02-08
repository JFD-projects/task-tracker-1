import React from "react";
import '../../css/list.scss';
import classNames from "classnames";
import Badge from "../common/Badge";
import removeImg from '../../assets/img/remove.svg'
import {useDispatch, useSelector} from "react-redux";
import {deleteList, listsActions} from "../../redux/reducers/listsReducer";
import {deleteTask} from "../../redux/reducers/tasksReducer";
import {submit} from "../utils/confirm";
import {NavLink, useNavigate} from "react-router-dom";
import {getLink} from "../utils/getLink";

const List = ({items, isRemovable, activeList}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(state => state.lists.isLoading.removeList)

  const removeList = (e, item) => {
    e.preventDefault()
    submit('Вы уверены?', confirmRemoveList.bind(this, item._id))
  }
  const confirmRemoveList = (id) => {
    navigate('/')
    dispatch(deleteList(id))
  }
  const handleActiveList = (item) => {
    dispatch(listsActions.setActiveList(item))
  }

  return (
    <ul className="list">
      {items &&
      items.map((item, index) => (
        <NavLink key={`list-${item._id}-${index}`}
                 onClick={() => handleActiveList(item)} className="list__link" to={getLink(item._id)}>
          <li
            className={classNames("list__item", {'active': activeList && item._id === activeList._id})}>
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
        </NavLink>
      ))
      }
    </ul>
  );
};

export default List;
