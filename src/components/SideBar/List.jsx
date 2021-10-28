import React from "react";
import './list.scss';
import classNames from "classnames";
import Badge from "../common/Badge";
import removeImg from '../../assets/img/remove.svg'
import axios from "axios";

const List = ({items, isRemovable, activeList, onClick, onRemove, onClickCategory}) => {

    const onClickItem = (item) => {
        onClickCategory(item)
    }

    const removeList = (item) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(()=>{
                onRemove(item.id)
            })
        }
    }
    return (
        <ul onClick={onClick} className="list">
            { items &&
                items.map(item => (
                    <li key={item.id}
                        onClick={onClickCategory ? ()=>onClickItem(item) : null}
                        className={classNames(item.className, {'active': activeList && item.id === activeList.id})}>
                        <i>
                            {
                                item.icon ? (item.icon) :
                                    (<Badge color={item.color.name}/>)
                            }
                        </i>
                        <span>{item.name}</span>
                        {item.tasks && item.tasks.length > 0 && <span>({item.tasks.length})</span>}
                        {isRemovable && <img onClick={()=>removeList(item)} className="list__remove-icon" src={removeImg} alt="Remove category"/>}
                    </li>
                ))
            }
        </ul>
    );
};

export default List;