import React, {useEffect} from "react";
import './list.scss';
import classNames from "classnames";
import Badge from "../common/Badge";
import removeImg from '../../assets/img/remove.svg'
import {useDispatch, useSelector} from "react-redux";
import {deleteList} from "../../redux/reducers/listsReducer";
import {deleteTask} from "../../redux/reducers/tasksReducer";

const List = ({items, isRemovable, activeList, onClick, onClickCategory}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.lists.isLoading.removeList)

    const onClickItem = (item) => {
        onClickCategory(item)
    }

    const removeList = (e,item) => {
        e.stopPropagation()
        if (window.confirm('Вы уверены?')) {
            onClickCategory({id: 'all_tasks'})
            dispatch(deleteTask(null, item.id))
            dispatch(deleteList(item.id))
        }
    }
    return (
        <ul onClick={onClick} className="list">
            { items &&
                items.map((item, index) => (
                    <li key={`list-${item.id}-${index}`}
                        onClick={onClickCategory ? () => onClickItem(item) : null}
                        className={classNames(item.className, {'active': activeList && item.id === activeList.id})}>
                        <i>
                            {
                                item.icon ? (item.icon) :
                                    (<Badge color={item.color.hex}/>)
                            }
                        </i>
                        <span>{item.name}</span>
                        {item.tasks && item.tasks.length > 0 && <p>({item.tasks.length})</p>}
                        {
                            !isLoading && isRemovable && <img onClick={(e)=>removeList(e,item)} className="list__remove-icon" src={removeImg} alt="Remove category"/>
                        }
                    </li>
                ))
            }
        </ul>
    );
};

export default List;