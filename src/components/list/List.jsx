import React, {useState} from "react";
import './list.scss';
import classNames from "classnames";
import Badge from "../common/Badge";
import removeImg from '../../assets/img/remove.svg'
import {useDispatch, useSelector} from "react-redux";
import {deleteList} from "../../redux/reducers/listsReducer";
import {deleteTask} from "../../redux/reducers/tasksReducer";
import {submit} from "../utils/confirm";

const List = ({items, isRemovable, activeList, onClick, onClickCategory}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.lists.isLoading.removeList)

    const onClickItem = (item) => {
        onClickCategory(item)
    }

    const removeList = (e, item) => {
        e.stopPropagation()
        submit('Вы уверены?', confirmRemoveList.bind(this, item.id))
    }
    const confirmRemoveList = (id)=>{
        onClickCategory({id: 'all_tasks'})
        dispatch(deleteTask(null, id))
        dispatch(deleteList(id))
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
                        {isRemovable &&
                        <img onClick={isLoading ? null : (e) => removeList(e, item)} className="list__remove-icon"
                             src={removeImg}
                             alt="Remove category"/>
                        }
                    </li>
                ))
            }
        </ul>
    );
};

export default List;