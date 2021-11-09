import React, {useState} from 'react';
import List from "../list/List";
import Badge from "../common/Badge";
import './addList.scss';
import imgAdd from "../../assets/img/add.svg";
import imgClose from "../../assets/img/close.svg";
import imgLoader from "../../assets/img/loader.svg";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {postNewList} from "../../redux/reducers/listsReducer";

const AddList = ({colors}) => {
    const dispatch = useDispatch()
    const [hiddenPopup, setHiddenPopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(1)
    const [nameCategory, setNameCategory] = useState('')
    const isLoading = useSelector(state => state.lists.isLoading.addList)
    const onClose =() => {
        setHiddenPopup(false)
        setNameCategory('')
        setSelectedColor(colors[0].id)
    }
    const addList = () => {
        if (!nameCategory){
            toast.info('Введите название категории!')
            return
        }
        const color = colors.find(c => c.id === selectedColor)
        const newList = {
            name: nameCategory,
            colorId: selectedColor,
            color:color
        }
        dispatch(postNewList(newList, onClose))
    }

    return (
        <div className="add__list">
            {isLoading ?
                <List items={[{
                    id: "load_category",
                    name: "Добавление...",
                    icon: <img src={imgLoader} alt="Loading"/>,
                    className: 'list__add-button'
                }]}/> :
                <List items={[
                    {
                        id: 'add_category',
                        name: 'Добавить категорию',
                        icon: <img src={imgAdd} alt="Add icon"/>,
                        className: 'list__add-button'
                    }
                ]}
                      onClick={() => setHiddenPopup(!hiddenPopup)}
                />
            }
            {hiddenPopup &&
            <div className="add__list-popup">
                <img src={imgClose}
                     onClick={onClose}
                     alt="Close" className="add__list-popup-close-btn"/>
                <input className="field"
                       type="text"
                       value={nameCategory.substring(0, 20)}
                       onChange={({target})=> setNameCategory(target.value)}
                       placeholder="Название категории"/>
                <div className="add__list-popup-colors">
                    {colors.map(color => (
                            <Badge selectedColor={selectedColor}
                                   id={color.id}
                                   onClick={()=>setSelectedColor(color.id)}
                                   key={color.hex}
                                   color={color.hex}/>))}
                </div>
                <button disabled={isLoading} onClick={addList} className="button">Добавить</button>
            </div>
            }
        </div>
    );
};

export default AddList;