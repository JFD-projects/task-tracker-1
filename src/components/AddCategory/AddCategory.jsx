import React, {useState} from 'react';
import List from "../SideBar/List";
import Badge from "../common/Badge";
import './addCategory.scss';
import imgAdd from "../../assets/img/add.svg";
import imgClose from "../../assets/img/close.svg";
import axios from "axios";

const AddCategory = ({colors, onAddList}) => {
    const [hiddenPopup, setHiddenPopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(1)
    const [nameCategory, setNameCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onCLose =() => {
        setNameCategory('')
        setSelectedColor(colors[0].id)
        setHiddenPopup(false)
    }
    const addList = () => {
        if (!nameCategory){
            alert('Введите название категории!')
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {
            name: nameCategory,
            colorId: selectedColor,
            tasks: []
        }).then(({data}) => {
            const color = colors.find(c => c.id === selectedColor)
            const listObj = {...data, color: {name: color.name, hex: color.hex}}
            onAddList(listObj)
            onCLose()
        }).catch(() => alert('Ошибка при добавлении списка'))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="add__list">
        <List items={[
            {
                id: 'add_task',

                name: 'Добавить категорию',
                icon: <img src={imgAdd} alt="Add icon"/>,
                className: 'list__add-button'
            }
        ]}
              onClick={() => setHiddenPopup(!hiddenPopup)}
        />
            {hiddenPopup &&
            <div className="add__list-popup">
                <img src={imgClose}
                     onClick={onCLose}
                     alt="Close" className="add__list-popup-close-btn"/>
                <input className="field"
                       type="text"
                       value={nameCategory}
                       onChange={({target})=> setNameCategory(target.value)}
                       placeholder="Название категории"/>
                <div className="add__list-popup-colors">
                    {colors.map(color => (
                            <Badge selectedColor={selectedColor}
                                   id={color.id}
                                   onClick={()=>setSelectedColor(color.id)}
                                   key={color.hex}
                                   color={color.name}/>))}
                </div>
                {
                    isLoading
                        ? <button disabled className="button">Добавление...</button>
                        : <button onClick={addList} className="button">Добавить</button>

                }
            </div>
            }
        </div>
    );
};

export default AddCategory;